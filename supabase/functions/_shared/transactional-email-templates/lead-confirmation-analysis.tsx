import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE = 'https://winerim.wine'

interface Props { name?: string }

const AnalysisConfirmationEmail = ({ name }: Props) => {
  const firstName = name?.split(' ')[0] || 'Hola'
  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Tu análisis de carta está en camino — Winerim</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Heading style={brand}>Winerim</Heading>
            <Text style={tagline}>La carta inteligente de vinos</Text>
          </Section>
          <Heading style={h1}>¡Gracias, {firstName}!</Heading>
          <Text style={text}>
            Hemos recibido tu carta de vinos y nuestro equipo ya está trabajando en tu{' '}
            <strong>análisis personalizado</strong>.
          </Text>
          <Text style={text}>Recibirás tu informe completo en menos de <strong>48 horas</strong> con:</Text>
          <Text style={listItem}>• Análisis de estructura y organización</Text>
          <Text style={listItem}>• Evaluación de rangos de precio</Text>
          <Text style={listItem}>• Recomendaciones de optimización</Text>
          <Text style={listItem}>• Estimación de potencial de ventas</Text>
          <Section style={ctaSection}>
            <Button href={SITE} style={ctaButton}>Visitar Winerim</Button>
          </Section>
          <Text style={footer}>
            Si no has solicitado esto, puedes ignorar este mensaje.<br />
            © Winerim — info@winerim.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: AnalysisConfirmationEmail,
  subject: 'Tu análisis de carta está en camino — Winerim',
  displayName: 'Analysis confirmation',
  previewData: { name: 'Ana Ruiz' },
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
