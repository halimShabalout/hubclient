'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { getContactInfo } from '@/lib/services'
import type { ContactInfo } from '@/lib/types'

export function useContactInfo() {
  const { language } = useLanguage()
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getContactInfo(language)
        setContactInfo(response.data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contact info')
        setContactInfo(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [language])

  return { contactInfo, loading, error }
}
