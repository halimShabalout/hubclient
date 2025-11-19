'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Language } from '@/lib/types'
import translationsData from '@/lib/mock/translations.json'

const translations = translationsData.data

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  direction: 'ltr' | 'rtl'
  message: (key: string, defaultValue?: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('language') as Language | null
    const initial = stored || 'en'
    setLanguageState(initial)
    updateLanguage(initial)
  }, [])

  const updateLanguage = (lang: Language) => {
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    updateLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const message = (key: string, defaultValue?: string): string => {
    const keys = key.split('.')

    let value: any = translations[language]
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        value = null
        break
      }
    }

    if (typeof value === 'string') {
      return value
    }

    if (defaultValue) return defaultValue

    let fallback: any = translations["en"]
    for (const k of keys) {
      if (fallback && typeof fallback === 'object' && k in fallback) {
        fallback = fallback[k]
      } else {
        fallback = null
        break
      }
    }

    if (typeof fallback === 'string') return fallback

    return key
  }

  if (!mounted) return null

  const direction = language === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction, message }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
