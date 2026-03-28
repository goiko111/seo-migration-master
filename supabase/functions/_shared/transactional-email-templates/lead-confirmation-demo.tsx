import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE = 'https://winerim.wine'

interface Props { name?: string; restaurant?: string }

const DemoConfirmationEmail = ({ name, restaurant }: Props) => {
  const firstName = name?.split(' ')[0] || 'Hola'
  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Hemos recibido tu solicitud de demo — Winerim</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Heading style={brand}>Winerim</Heading>
            <Text style={tagline}>La carta inteligente de vinos</Text>
          </Section>
          <Heading style={h1}>¡Gracias, {firstName}!</Heading>
          <Text style={text}>
            Hemos recibido tu solicitud de <strong>demo gratuita</strong> para{' '}
            <strong>{restaurant || 'tu restaurante'}</strong>.
          </Text>
          <Text style={text}>
            Un miembro de nuestro equipo se pondrá en contacto contigo en las próximas{' '}
            <strong>24 horas</strong> para agendar la demostración personalizada.
          </Text>
          <Text style={text}>Durante la demo te mostraremos:</Text>
          <Text style={listItem}>• Cómo funciona la carta inteligente de Winerim</Text>
          <Text style={listItem}>• Un análisis inicial de tu carta de vinos</Text>
          <Text style={listItem}>• Las funcionalidades que mejor se adaptan a tu restaurante</Text>
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
  component: DemoConfirmationEmail,
  subject: 'Hemos recibido tu solicitud de demo — Winerim',
  displayName: 'Demo confirmation',
  previewData: { name: 'María López', restaurant: 'La Vinoteca' },
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
