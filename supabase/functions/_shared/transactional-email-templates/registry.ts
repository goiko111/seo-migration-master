/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as leadNotification } from './lead-notification.tsx'
import { template as leadConfirmationDemo } from './lead-confirmation-demo.tsx'
import { template as leadConfirmationContact } from './lead-confirmation-contact.tsx'
import { template as leadConfirmationAnalysis } from './lead-confirmation-analysis.tsx'
import { template as leadConfirmationResource } from './lead-confirmation-resource.tsx'
import { template as leadConfirmationGeneric } from './lead-confirmation-generic.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'lead-notification': leadNotification,
  'lead-confirmation-demo': leadConfirmationDemo,
  'lead-confirmation-contact': leadConfirmationContact,
  'lead-confirmation-analysis': leadConfirmationAnalysis,
  'lead-confirmation-resource': leadConfirmationResource,
  'lead-confirmation-generic': leadConfirmationGeneric,
}
