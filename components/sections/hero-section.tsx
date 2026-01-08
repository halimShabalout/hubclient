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
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
          >
            <Image
              src={
                slide.imageUrl
                  ? `${baseUrl}${slide.imageUrl}`
                  : '/images/no_image.png'
              }
              alt={slide.translated.title || 'Hero Slide'}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-20" />

      {/* Content */}
      <div
        className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4"
        style={{ direction }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {message('hero.topText', 'Premium Natural Marble Collections')}
        </h1>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          {slides[currentSlide].translated.title}
        </h2>

        <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-3xl">
          {slides[currentSlide].translated.subTitle}
        </p>

        {slides[currentSlide].translated.ctaText && (
          <Link
            href={slides[currentSlide].ctaLink || `/${lang}/products`}
            className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition"
          >
            {slides[currentSlide].translated.ctaText}
          </Link>
        )}
      </div>

      {/* Navigation */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + slides.length) % slides.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white hidden md:block"
            aria-label="Previous Slide"
          >
            ‹
          </button>

          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % slides.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white hidden md:block"
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
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
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
