import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const NOTIFY_TO = 'info@winerim.com'

interface LeadNotificationProps {
  formLabel?: string
  restaurant?: string
  name?: string
  position?: string
  email?: string
  phone?: string
  city?: string
  business_type?: string
  num_locations?: string
  references_count?: string
  has_sommelier?: string
  main_challenge?: string
  message?: string
  menu_link?: string
}

const LeadNotificationEmail = (props: LeadNotificationProps) => {
  const rows: [string, string | undefined][] = [
    ['Formulario', props.formLabel],
    ['Restaurante', props.restaurant],
    ['Nombre', props.name],
    ['Cargo', props.position],
    ['Email', props.email],
    ['Teléfono', props.phone],
    ['Ciudad', props.city],
    ['Tipo de negocio', props.business_type],
    ['Nº locales', props.num_locations],
    ['Nº referencias', props.references_count],
    ['¿Tiene sumiller?', props.has_sommelier],
    ['Desafío principal', props.main_challenge],
    ['Mensaje', props.message],
    ['Link carta', props.menu_link],
  ]

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Nuevo lead — Winerim</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nuevo lead — Winerim</Heading>
          <Text style={subtitle}>Origen: <strong>{props.formLabel || 'Desconocido'}</strong></Text>
          <Hr style={hr} />
          {rows
            .filter(([, v]) => v)
            .map(([label, value]) => (
              <Text key={label} style={row}>
                <strong style={rowLabel}>{label}:</strong> {value}
              </Text>
            ))}
          <Hr style={hr} />
          <Text style={footer}>Este email se ha generado automáticamente desde winerim.wine</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: LeadNotificationEmail,
  subject: (data: Record<string, any>) =>
    `[${data.formLabel || 'Lead'}] ${data.restaurant || data.name || 'Nuevo lead'}`,
  to: NOTIFY_TO,
  displayName: 'Lead notification (internal)',
  previewData: {
    formLabel: 'Solicitud de demo gratuita',
    restaurant: 'La Vinoteca',
    name: 'María López',
    position: 'Directora',
    email: 'maria@lavinoteca.com',
    phone: '+34 612 345 678',
    city: 'Madrid',
    business_type: 'restaurante-gastronomico',
    references_count: '40-80',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 25px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0 0 4px' }
const subtitle = { fontSize: '13px', color: '#888', margin: '0 0 20px' }
const hr = { borderColor: '#e5e5e5', margin: '16px 0' }
const row = { fontSize: '14px', color: '#555', margin: '4px 0', lineHeight: '1.6' }
const rowLabel = { color: '#333' }
const footer = { fontSize: '12px', color: '#aaa', marginTop: '24px' }
