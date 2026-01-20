'use client'

import { useLanguage } from '@/components/language-provider'
import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/lib/types/Product'
import Image from 'next/image'
import {
  SiWhatsapp,
} from 'react-icons/si'
import { useContactInfo } from "@/lib/hooks/useContactInfo";

interface ProductDetailsProps {
  product: Product
  lang: 'en' | 'ar'
}

const ProductDetails = ({ product, lang }: ProductDetailsProps) => {
  const { message } = useLanguage()
  const direction: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr'
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = product.images || []
  const translated = product.translated || {}
  const name = translated.name
  const description = translated.description
  const { data: contactInformation } = useContactInfo(lang);

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <section className="py-12" dir={direction}>
      <div className="container mx-auto px-4">
        <Link
          href={`/${lang}/products`}
          className="
    mb-8 inline-flex items-center gap-2
    text-foreground/80
    hover:text-accent
    transition-colors
  "
        >
          <span className="text-lg">←</span>
          <span>{message('product.back', 'Back to Products')}</span>
        </Link>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Main Image */}
          <div className="space-y-4">
            <div className="relative w-full aspect-[10/7] rounded-lg overflow-hidden bg-secondary group">
              <Image
                src={
                  images[currentImageIndex]
                    ? `${baseUrl}${images[currentImageIndex]}`
                    : '/images/no_image.png'
                }
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Prev / Next Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 focus:outline-none transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 focus:outline-none transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 flex-shrink-0 rounded border-2 overflow-hidden transition-transform duration-300 ${idx === currentImageIndex
                      ? 'border-accent scale-105'
                      : 'border-border'
                      }`}
                  >
                    <img
                      src={img ? `${baseUrl}${img}` : '/images/no_image.png'}
                      alt={`${name} ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{name}</h1>
            </div>

            <div className="bg-secondary/50 rounded-lg p-6 max-h-[400px] overflow-y-auto space-y-3">
              <h3 className="font-bold text-lg mb-2">
                {message('product.specs', 'Specifications')}
              </h3>

              <p className="text-lg text-muted-foreground whitespace-pre-line">
                {description}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`https://wa.me/${contactInformation?.whatsapp ?? ""}?text=${encodeURIComponent(
                  message('whatsapp.wantProduct', 'مرحبا، أريد هذا المنتج:') + " " + window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
      inline-flex items-center gap-2
      px-6 py-2 
      bg-green-600 text-white 
      font-semibold rounded-md shadow-lg 
      hover:bg-green-700 hover:scale-105 transition-all duration-300
      text-sm md:text-base text-center
    "
              >
                <SiWhatsapp className="w-5 h-5" />
                {message('want.product', 'I want this product')}
              </Link>

              <Link
                href={`https://wa.me/${contactInformation?.whatsapp ?? ""}?text=${encodeURIComponent(
                  message('whatsapp.requestQuote', 'مرحبا، أريد طلب عرض سعر لهذا المنتج:') + " " + window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
      inline-flex items-center gap-2
      px-6 py-2 
      bg-primary text-primary-foreground 
      font-semibold rounded-md shadow-lg 
      hover:bg-primary/90 hover:scale-105 transition-all duration-300
      text-sm md:text-base text-center
    "
              >
                <SiWhatsapp className="w-5 h-5" />
                {message('request.quote', 'Request a Quote')}
              </Link>
            </div>



          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
