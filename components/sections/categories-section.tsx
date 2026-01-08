'use client'

import { useLanguage } from '@/components/language-provider'
import Link from 'next/link'
import Image from 'next/image'
import { Category } from '@/lib/types/Category'

interface CategoriesSectionProps {
  categories: Category[]
  lang: 'en' | 'ar'
}

const CategoriesSection = ({ categories, lang }: CategoriesSectionProps) => {
  const { direction, message } = useLanguage()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section
      className="py-20 bg-secondary/50"
      dir={direction}
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2
          className={`text-4xl md:text-5xl font-bold mb-4 ${
            direction === 'rtl' ? 'text-right' : 'text-center'
          }`}
        >
          {message('categories.title', 'Explore Our Marble Categories')}
        </h2>

        {/* Subtitle */}
        <p
          className={`text-muted-foreground mb-12 max-w-2xl mx-auto ${
            direction === 'rtl' ? 'text-right' : 'text-center'
          }`}
        >
          {message(
            'categories.subtitle',
            'Explore our diverse range of marble and stone categories'
          )}
        </p>

        {/* Categories Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10 ${
            direction === 'rtl' ? 'text-right' : 'text-left'
          }`}
        >
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/${lang}/products?category=${category.id}`}
              className="group block"
            >
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 hover-lift">
                <Image
                  src={
                    category.imageUrl
                      ? `${baseUrl}${category.imageUrl}`
                      : '/images/no_image.png'
                  }
                  alt={category.translated.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              </div>

              <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                {category.translated.name}
              </h3>

              {category.translated.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {category.translated.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        <div
          className={`${
            direction === 'rtl' ? 'text-right' : 'text-center'
          }`}
        >
          <Link
            href={`/${lang}/categories`}
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover-lift"
          >
            {message('showmore', 'Show More')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection
