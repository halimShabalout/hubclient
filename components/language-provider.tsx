'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import translationsData from '../lib/mock/translations.json'
import { usePathname, useRouter } from 'next/navigation'

type Language = 'en' | 'ar'
type Messages = Record<string, string>

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  direction: 'ltr' | 'rtl'
  message: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const RTL_LANGS: Language[] = ['ar']

export function LanguageProvider({
  children,
  userLang = 'ar',
}: {
  children: React.ReactNode
  userLang: Language
}) {
  const [language] = useState<Language>(userLang)
  const router = useRouter()
  const pathname = usePathname()

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en'
    const segments = pathname.split('/')
    segments[1] = newLang
    router.push(segments.join('/'))
  }

  const messages: Messages = useMemo(
    () => translationsData.data[language] ?? {},
    [language]
  )

  const message = (key: string) => messages[key] ?? key

  const direction: 'ltr' | 'rtl' =
    RTL_LANGS.includes(language) ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, direction, message }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
