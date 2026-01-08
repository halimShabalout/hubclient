'use client'

import { useLanguage } from '@/components/language-provider'
import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/lib/types/Product'

interface ProductDetailsProps {
  product: Product
  lang: 'en' | 'ar'
}

const ProductDetails = ({ product, lang }: ProductDetailsProps) => {
  const { message } = useLanguage()
  const direction: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr'
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = product.images || []
  const translated = product.translated || {}
  const name = translated.name
  const description = translated.description

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <section className="py-12" dir={direction}>
      <div className="container mx-auto px-4">
        <Link href={`/${lang}/products`} className="text-primary hover:text-accent mb-8 inline-flex items-center gap-2">
          <span>←</span>
          <span>{message('product.back', 'Back to Products')}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden bg-secondary group">
              <img
                src={images[currentImageIndex] ? `${baseUrl}${images[currentImageIndex]}` : '/images/no_image.png'}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
              />

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-foreground smooth-transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-foreground smooth-transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            <div className="flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-20 rounded border-2 overflow-hidden smooth-transition ${idx === currentImageIndex ? 'border-accent' : 'border-border'
                    }`}
                >
                  <img
                    src={img ? `${baseUrl}${img}` : '/images/no_image.png'}
                    alt={`${name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{name}</h1>
            </div>

            <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
              <h3 className="font-bold text-lg mb-4">
                {message('product.specs', 'Specifications')}
              </h3>

              <p className="text-lg text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ProductDetails
