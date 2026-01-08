'use client'

import { useLanguage } from '@/components/language-provider'
import Link from 'next/link'
import Image from 'next/image'
import { AboutUs } from '@/lib/types/AboutUs'

interface AboutUsSectionProps {
  aboutUs: AboutUs
  lang: 'en' | 'ar'
}

const AboutUsSection = ({ aboutUs, lang }: AboutUsSectionProps) => {
  const { direction, message } = useLanguage()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const translated = aboutUs.translated
  if (!translated) return null

  return (
    <section
      className="py-20 bg-secondary/50"
      dir={direction}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div
            className={`relative h-96 rounded-xl overflow-hidden hover-lift ${direction === 'rtl'
              ? 'md:order-2'
              : 'md:order-2'
              }`}
          >
            <Image
              src={
                aboutUs.imageUrl
                  ? `${baseUrl}${aboutUs.imageUrl}`
                  : '/images/no_image.png'
              }
              alt={message('aboutus.image.alt', 'About Alshoaala Marble')}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-transform duration-500 hover:scale-102"
              priority
            />
          </div>

          {/* Content */}
          <div
            className={`${direction === 'rtl'
              ? 'md:order-1 text-right'
              : 'md:order-1 text-left'
              }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground slide-in-up">
              {message('aboutus.title', 'About Us')}
            </h2>

            <p className="text-lg text-foreground/90 mb-4 slide-in-up line-clamp-4">
              {translated.story}
            </p>

            <p className="text-lg text-foreground/80 mb-8 slide-in-up line-clamp-3">
              {translated.mission}
            </p>

            <Link
              href={`/${lang}/aboutus`}
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover-lift"
            >
              {message('aboutus.readmore', 'Read More')}
            </Link>
          </div>

        </div>
      </div>
    </section>

  )
}

export default AboutUsSection
