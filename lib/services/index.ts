import type {
  Language,
  ContactInfoResponse,
  TranslationsResponse,
} from '@/lib/types'

// Import mock data

import contactInfoData from '@/lib/mock/contact-info.json'
import translationsData from '@/lib/mock/translations.json'

// Simulated API delay for realistic behavior
const API_DELAY = 300

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))


/**
 * Contact Info Service
 */
export async function getContactInfo(lang: Language): Promise<ContactInfoResponse> {
  await delay(API_DELAY)
  
  return contactInfoData as ContactInfoResponse
}

/**
 * Translations Service
 */
export async function getTranslations(lang: Language): Promise<TranslationsResponse> {
  await delay(API_DELAY)
  
  return translationsData as TranslationsResponse
}
