'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { getAboutUs } from '@/lib/services'
import type { AboutUs } from '@/lib/types'

export function useAboutUs() {
  const { language } = useLanguage()
  const [aboutUs, setAboutUs] = useState<AboutUs | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getAboutUs(language)
        setAboutUs(response.data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch about us data')
        setAboutUs(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [language])

  return { aboutUs, loading, error }
}
