import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Link, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE = 'https://winerim.wine'

interface Props {
  name?: string
  resourceName?: string
  downloadUrl?: string
}

const ResourceConfirmationEmail = ({ name, resourceName, downloadUrl }: Props) => {
  const firstName = name?.split(' ')[0] || 'Hola'
  const ctaUrl = downloadUrl || `${SITE}/herramientas`
  const ctaLabel = downloadUrl ? 'Acceder al recurso' : 'Ver herramientas'

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Tu recurso: {resourceName || 'descarga'} — Winerim</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Heading style={brand}>Winerim</Heading>
            <Text style={tagline}>La carta inteligente de vinos</Text>
          </Section>
          <Heading style={h1}>¡Gracias, {firstName}!</Heading>
          <Text style={text}>
            Ya tienes disponible tu recurso: <strong>{resourceName || 'descarga'}</strong>.
          </Text>
          <Text style={text}>
            La descarga se ha iniciado automáticamente desde la web. Este email sirve como{' '}
            <strong>confirmación y respaldo</strong> para que puedas acceder de nuevo en cualquier momento.
          </Text>
          <Text style={text}>
            Mientras tanto, explora más herramientas gratuitas en{' '}
            <Link href={`${SITE}/herramientas`} style={link}>winerim.wine/herramientas</Link>.
          </Text>
          <Section style={ctaSection}>
            <Button href={ctaUrl} style={ctaButton}>{ctaLabel}</Button>
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
  component: ResourceConfirmationEmail,
  subject: (data: Record<string, any>) =>
    `Tu recurso: ${data.resourceName || 'descarga'} — Winerim`,
  displayName: 'Resource download confirmation',
  previewData: {
    name: 'Laura Martín',
    resourceName: 'Plantilla de Estrategia de Vinos por Copa',
    downloadUrl: 'https://winerim.wine/recursos/plantilla-estrategia-vinos-por-copa',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 25px', maxWidth: '560px', margin: '0 auto' }
const logoSection = { textAlign: 'center' as const, marginBottom: '24px' }
const brand = { fontSize: '24px', color: '#722F37', margin: '0' }
const tagline = { color: '#888', fontSize: '12px', margin: '4px 0 0' }
const h1 = { fontSize: '18px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.7', margin: '0 0 12px' }
const link = { color: '#722F37', fontWeight: '600' as const }
const ctaSection = { marginTop: '28px', textAlign: 'center' as const }
const ctaButton = {
  display: 'inline-block', backgroundColor: '#722F37', color: '#fff',
  padding: '12px 28px', borderRadius: '8px', textDecoration: 'none',
  fontSize: '14px', fontWeight: '600' as const,
}
const footer = { marginTop: '24px', fontSize: '11px', color: '#aaa', textAlign: 'center' as const }
