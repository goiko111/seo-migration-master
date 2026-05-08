import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE = 'https://winerim.wine'

type Lang = 'es' | 'en' | 'it' | 'fr' | 'de' | 'pt'
interface Props { name?: string; lang?: Lang }

const COPY: Record<Lang, {
  preview: string; greetingFallback: string; greetingPrefix: string;
  intro1: string; intro1Bold: string; intro2: string; hours: string; intro2Suffix: string;
  bullets: string[]; cta: string; footerNote: string; subject: string;
}> = {
  es: { preview: 'Tu análisis de carta está en camino — Winerim', greetingFallback: 'Hola', greetingPrefix: '¡Gracias',
    intro1: 'Hemos recibido tu carta de vinos y nuestro equipo ya está trabajando en tu ', intro1Bold: 'análisis personalizado',
    intro2: 'Recibirás tu informe completo en menos de ', hours: '48 horas', intro2Suffix: ' con:',
    bullets: ['Análisis de estructura y organización','Evaluación de rangos de precio','Recomendaciones de optimización','Estimación de potencial de ventas'],
    cta: 'Visitar Winerim', footerNote: 'Si no has solicitado esto, puedes ignorar este mensaje.',
    subject: 'Tu análisis de carta está en camino — Winerim' },
  en: { preview: 'Your wine list analysis is on its way — Winerim', greetingFallback: 'Hello', greetingPrefix: 'Thank you',
    intro1: "We've received your wine list and our team is already working on your ", intro1Bold: 'personalised analysis',
    intro2: "You'll receive your full report within ", hours: '48 hours', intro2Suffix: ', including:',
    bullets: ['Structure and organisation analysis','Price range evaluation','Optimisation recommendations','Sales potential estimation'],
    cta: 'Visit Winerim', footerNote: "If you didn't request this, you can safely ignore this message.",
    subject: 'Your wine list analysis is on its way — Winerim' },
  it: { preview: 'La tua analisi della carta è in arrivo — Winerim', greetingFallback: 'Ciao', greetingPrefix: 'Grazie',
    intro1: 'Abbiamo ricevuto la tua carta dei vini e il nostro team sta già lavorando alla tua ', intro1Bold: 'analisi personalizzata',
    intro2: 'Riceverai il report completo entro ', hours: '48 ore', intro2Suffix: ' con:',
    bullets: ['Analisi di struttura e organizzazione','Valutazione delle fasce di prezzo','Raccomandazioni di ottimizzazione','Stima del potenziale di vendita'],
    cta: 'Visita Winerim', footerNote: 'Se non hai richiesto questo, puoi ignorare il messaggio.',
    subject: 'La tua analisi della carta è in arrivo — Winerim' },
  fr: { preview: "Votre analyse de carte arrive — Winerim", greetingFallback: 'Bonjour', greetingPrefix: 'Merci',
    intro1: 'Nous avons reçu votre carte des vins et notre équipe travaille déjà sur votre ', intro1Bold: 'analyse personnalisée',
    intro2: 'Vous recevrez votre rapport complet dans moins de ', hours: '48 heures', intro2Suffix: ' avec :',
    bullets: ['Analyse de structure et organisation','Évaluation des gammes de prix',"Recommandations d'optimisation",'Estimation du potentiel de ventes'],
    cta: 'Visiter Winerim', footerNote: "Si vous n'avez pas demandé ceci, vous pouvez ignorer ce message.",
    subject: 'Votre analyse de carte arrive — Winerim' },
  de: { preview: 'Ihre Weinkarten-Analyse ist unterwegs — Winerim', greetingFallback: 'Hallo', greetingPrefix: 'Vielen Dank',
    intro1: 'Wir haben Ihre Weinkarte erhalten und unser Team arbeitet bereits an Ihrer ', intro1Bold: 'persönlichen Analyse',
    intro2: 'Sie erhalten Ihren vollständigen Bericht innerhalb von ', hours: '48 Stunden', intro2Suffix: ' mit:',
    bullets: ['Struktur- und Organisationsanalyse','Bewertung der Preisbereiche','Optimierungsempfehlungen','Schätzung des Verkaufspotenzials'],
    cta: 'Winerim besuchen', footerNote: 'Wenn Sie dies nicht angefordert haben, können Sie diese Nachricht ignorieren.',
    subject: 'Ihre Weinkarten-Analyse ist unterwegs — Winerim' },
  pt: { preview: 'A sua análise de carta está a caminho — Winerim', greetingFallback: 'Olá', greetingPrefix: 'Obrigado',
    intro1: 'Recebemos a sua carta de vinhos e a nossa equipa já está a trabalhar na sua ', intro1Bold: 'análise personalizada',
    intro2: 'Receberá o seu relatório completo em menos de ', hours: '48 horas', intro2Suffix: ' com:',
    bullets: ['Análise de estrutura e organização','Avaliação de gamas de preço','Recomendações de otimização','Estimativa de potencial de vendas'],
    cta: 'Visitar Winerim', footerNote: 'Se não solicitou isto, pode ignorar esta mensagem.',
    subject: 'A sua análise de carta está a caminho — Winerim' },
}

const AnalysisConfirmationEmail = ({ name, lang }: Props) => {
  const c = COPY[(lang || 'es') as Lang] || COPY.es
  const firstName = name?.split(' ')[0] || c.greetingFallback
  return (
    <Html lang={lang || 'es'} dir="ltr">
      <Head />
      <Preview>{c.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Heading style={brand}>Winerim</Heading>
            <Text style={tagline}>La carta inteligente de vinos</Text>
          </Section>
          <Heading style={h1}>{c.greetingPrefix}, {firstName}!</Heading>
          <Text style={text}>
            {c.intro1}<strong>{c.intro1Bold}</strong>.
          </Text>
          <Text style={text}>{c.intro2}<strong>{c.hours}</strong>{c.intro2Suffix}</Text>
          {c.bullets.map((b, i) => (
            <Text key={i} style={listItem}>• {b}</Text>
          ))}
          <Section style={ctaSection}>
            <Button href={SITE} style={ctaButton}>{c.cta}</Button>
          </Section>
          <Text style={footer}>
            {c.footerNote}<br />
            © Winerim — info@winerim.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: AnalysisConfirmationEmail,
  subject: (data: Record<string, any>) => (COPY[(data?.lang || 'es') as Lang] || COPY.es).subject,
  displayName: 'Analysis confirmation',
  previewData: { name: 'Ana Ruiz', lang: 'es' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 25px', maxWidth: '560px', margin: '0 auto' }
const logoSection = { textAlign: 'center' as const, marginBottom: '24px' }
const brand = { fontSize: '24px', color: '#722F37', margin: '0' }
const tagline = { color: '#888', fontSize: '12px', margin: '4px 0 0' }
const h1 = { fontSize: '18px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.7', margin: '0 0 12px' }
const listItem = { fontSize: '14px', color: '#444', lineHeight: '1.7', margin: '0 0 4px', paddingLeft: '8px' }
const ctaSection = { marginTop: '28px', textAlign: 'center' as const }
const ctaButton = {
  display: 'inline-block', backgroundColor: '#722F37', color: '#fff',
  padding: '12px 28px', borderRadius: '8px', textDecoration: 'none',
  fontSize: '14px', fontWeight: '600' as const,
}
const footer = { marginTop: '24px', fontSize: '11px', color: '#aaa', textAlign: 'center' as const }
