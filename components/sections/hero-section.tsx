'use client'

import { useLanguage } from '@/components/language-provider'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HomeSlider } from '@/lib/types/HomeSlider'

interface HeroSectionProps {
  slides: HomeSlider[]
  lang: 'en' | 'ar'
}

const HeroSection = ({ slides, lang }: HeroSectionProps) => {
  const { direction, message } = useLanguage()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  if (!slides || slides.length === 0) {
    return (
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-muted">
        <p className="text-foreground">
          {message('loading', 'Loading...')}
        </p>
      </section>
    )
  }

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'
              }`}
          >
            <img
              src={
                slide.imageUrl
                  ? `${baseUrl}${slide.imageUrl}`
                  : '/images/no_image.png'
              }
              alt={slide.translated.title || 'Hero Slide'}
              sizes="100vw"
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-20" />

      {/* Content */}
      <div
        className="relative z-30 flex flex-col items-center justify-center h-full text-center px-2 sm:px-4"
        style={{ direction }}
      >
        <div className="bg-black/40 p-4 sm:p-6 rounded-xl max-w-2xl">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 leading-tight max-w-md mx-auto line-clamp-2">
            {message('hero.topText', 'Elevate Your Space with Premium Marble')}
          </h1>


          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-6xl font-bold text-white mb-4 leading-tight break-words">
            {slides[currentSlide].translated.title}
          </h2>

          <p className="text-sm sm:text-base md:text-xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            {slides[currentSlide].translated.subTitle}
          </p>

          {slides[currentSlide].translated.ctaText && (
            <Link
              href={slides[currentSlide].ctaLink || `/${lang}/products`}
              className="px-6 py-2.5 sm:px-8 sm:py-3 bg-accent text-accent-foreground text-sm sm:text-base font-semibold rounded-lg hover:opacity-90 transition"
            >
              {slides[currentSlide].translated.ctaText}
            </Link>
          )}
        </div>
      </div>


      {/* Navigation */}
      {slides.length > 1 && (
        <>
          {/* Previous */}
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % slides.length)
            }
            className="absolute right-1 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/70 text-white shadow-lg"
            aria-label="Previous Slide"
          >
            ‹
          </button>

          {/* Next */}
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
            }
            className="absolute left-1 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/70 text-white shadow-lg"
            aria-label="Next Slide"
          >
            ›
          </button>
        </>
      )}


      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide
              ? 'bg-accent w-8'
              : 'bg-white/50 w-3 hover:bg-white/70'
              }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
