'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { getProductById } from '@/lib/services'
import type { ProductDetail } from '@/lib/types'

export function useProductDetails(id: number) {
  const { language } = useLanguage()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getProductById(id, language)
        setProduct(response.data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product details')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, language])

  return { product, loading, error }
}
