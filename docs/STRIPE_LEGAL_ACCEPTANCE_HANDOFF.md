# Winerim · Stripe legal acceptance handoff

## Objetivo

Registrar evidencia jurídica cuando un cliente acepta términos y política de privacidad durante un Checkout de Stripe:

- Stripe confirma el checkout por webhook.
- Supabase guarda el evento en `public.legal_acceptance_events`.
- Winerim envía un email transaccional al cliente con los documentos aceptados.
- Winerim Connect / CRM recibe un evento `legal_acceptance`.

## Edge Function

Función: `stripe-legal-webhook`

Metodo: `POST`

Autenticación:

- Webhook real de Stripe: header `Stripe-Signature` validado con `STRIPE_WEBHOOK_SECRET`.
- Llamada interna/test: `Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>`.

Eventos soportados:

- `checkout.session.created`
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `manual_acceptance` para pruebas internas server-to-server.

## Secrets necesarios

- `STRIPE_WEBHOOK_SECRET`: secreto del endpoint webhook creado en Stripe.
- `SUPABASE_URL`: ya lo proporciona Lovable Cloud.
- `SUPABASE_SERVICE_ROLE_KEY`: ya lo proporciona Lovable Cloud.
- `WINERIM_CONNECT_WEBHOOK_URL`: ya usado por leads; si está presente, recibe el evento legal.
- `LEGAL_EVIDENCE_HASH_SALT`: opcional, recomendado para hashear IP/user-agent con sal.

## Metadata esperada en Checkout

Enviar estos campos en `metadata` al crear la Checkout Session:

```json
{
  "legal_acceptance_id": "uuid-opcional-generado-por-servidor",
  "accepted_locale": "es",
  "terms_version": "Versión final operativa - 7 de julio de 2026",
  "privacy_version": "España - 7 de julio de 2026",
  "terms_url": "https://winerim.wine/terminos-y-condiciones-del-contrato",
  "privacy_url": "https://winerim.wine/politica-privacidad",
  "legal_entity": "Basque Highlands S.L.",
  "terms_document_hash": "sha256-opcional-del-documento-publicado",
  "privacy_document_hash": "sha256-opcional-del-documento-publicado",
  "company_name": "Restaurante Ejemplo",
  "customer_email": "cliente@restaurante.com"
}
```

Para clientes fuera de España, usar las URLs publicadas del idioma correspondiente:

| Idioma | Términos | Privacidad | Entidad |
|---|---|---|---|
| ES | `/terminos-y-condiciones-del-contrato` | `/politica-privacidad` | Basque Highlands S.L. |
| EN | `/en/terms` | `/en/privacy` | Winerim LLC |
| IT | `/it/termini` | `/it/privacy` | Winerim LLC |
| FR | `/fr/conditions` | `/fr/confidentialite` | Winerim LLC |
| DE | `/de/agb` | `/de/datenschutz` | Winerim LLC |
| PT | `/pt/termos` | `/pt/privacidade` | Winerim LLC |

Si falta metadata, la Edge Function usa estos defaults por idioma.

## Checkout recomendado

Al crear la Checkout Session, activar aceptación explícita:

```ts
const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  customer_email: customerEmail,
  line_items,
  success_url: "https://winerim.wine/checkout/success?session_id={CHECKOUT_SESSION_ID}",
  cancel_url: "https://winerim.wine/checkout/cancel",
  consent_collection: {
    terms_of_service: "required",
  },
  custom_text: {
    terms_of_service_acceptance: {
      message:
        "Acepto los Términos y Condiciones y la Política de Privacidad de Winerim.",
    },
  },
  metadata: {
    accepted_locale: locale,
    terms_version,
    privacy_version,
    terms_url,
    privacy_url,
    legal_entity,
    company_name: companyName,
    customer_email: customerEmail,
  },
});
```

## Datos guardados

La tabla `public.legal_acceptance_events` guarda:

- Cliente: email, nombre, empresa, locale.
- Documentos: URLs, versiones, entidad legal y hashes opcionales.
- Stripe: event id, checkout session id, customer, subscription, payment intent, invoice.
- Evidencia: fecha de aceptación, fecha de checkout, metadata, IP/user-agent hasheados, fingerprint.
- Entregas: email enviado/encolado y sincronización CRM.

RLS: solo `service_role` gestiona todos los registros. Usuarios autenticados solo pueden leer sus propios registros si hay `user_id`.

## Validación manual interna

Con service role se puede probar sin Stripe:

```bash
curl -X POST "$SUPABASE_FUNCTION_URL/stripe-legal-webhook" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "manual_acceptance",
    "livemode": false,
    "id": "cs_test_manual_legal",
    "created": 1783500000,
    "customer_email": "cliente@example.com",
    "customer_details": { "email": "cliente@example.com", "name": "Cliente Test" },
    "metadata": {
      "accepted_locale": "es",
      "company_name": "Restaurante Test",
      "terms_url": "https://winerim.wine/terminos-y-condiciones-del-contrato",
      "privacy_url": "https://winerim.wine/politica-privacidad"
    }
  }'
```
