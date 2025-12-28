'use client'

import { useLanguage } from '@/components/language-provider'
import Link from 'next/link'
import { useLandingCategories } from '@/lib/hooks/useCategories'
import Image from 'next/image'

const CategoriesSection = () => {
  const { language, direction, message } = useLanguage()
  const { data, isLoading, error } = useLandingCategories(language)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const categories = data?.data || []

  // Structured Data JSON-LD for categories
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: categories.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: category.translated.name,
      url: `/products?category=${category.id}`,
    })),
  }

  return (
    <section className={`py-20 bg-secondary/50 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          {message('categories.title', 'Explore Our Marble Categories – Alshoaala Marble')}
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {message(
            'categories.subtitle',
            'Explore our diverse range of marble and stone categories'
          )}
        </p>

        {isLoading && (
          <div className="text-center py-12">
            <p>{message('loading', 'Loading...')}</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500">
            <p>{message('loading.error', 'Failed to load data')}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  title={`عرض منتجات ${category.translated.name}`}
                  aria-label={`عرض منتجات ${category.translated.name}`}
                  className="group cursor-pointer"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4 hover-lift">
                    <Image
                      src={category.imageUrl ? `${baseUrl}${category.imageUrl}` : '/images/no_image.png'}
                      alt={`رخام طبيعي ${category.translated.name} – Alshoaala Marble`}
                      fill
                      objectFit="cover"
                      className="group-hover:scale-110 smooth-transition"
                      priority={false}
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 smooth-transition" />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent smooth-transition">
                    {category.translated.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2">
                    {category.translated.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/categories"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover-lift"
              >
                {message('showmore', 'Show More')}
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default CategoriesSection
