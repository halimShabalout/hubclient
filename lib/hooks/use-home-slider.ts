'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { getHomeSlider } from '@/lib/services'
import type { SliderImage } from '@/lib/types'

export function useHomeSlider() {
  const { language } = useLanguage()
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getHomeSlider(language)
        setSliderImages(response.data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch slider images')
        setSliderImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [language])

  return { sliderImages, loading, error }
}
