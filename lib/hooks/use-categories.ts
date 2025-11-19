'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { getCategories } from '@/lib/services'
import type { Category } from '@/lib/types'

export function useCategories() {
  const { language } = useLanguage()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getCategories(language)
        setCategories(response.data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories')
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [language])

  return { categories, loading, error }
}
