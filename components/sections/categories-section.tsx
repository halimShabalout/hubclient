'use client'

import { useLanguage } from '@/components/language-provider'
import { useCategories } from '@/lib/hooks'
import Link from 'next/link'
import Image from 'next/image'

export function CategoriesSection() {
  const { language, direction, message } = useLanguage()
  const { categories, loading } = useCategories()

  return (
    <section className={`py-20 bg-secondary/50 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          {message('categories.title', 'Categories')}
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {language === 'en'
            ? 'Browse our extensive collection of premium marble and stone products'
            : 'تصفح مجموعتنا الواسعة من منتجات الرخام والحجر الفاخرة'}
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p>{message('loading') || 'Loading...'}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4 hover-lift">
                    <img
                      src={category.translated[language]?.image_url || `/marble-category-${category.id}.jpg`}
                      alt={category.translated[language]?.name}
                      className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 smooth-transition" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent smooth-transition">
                    {category.translated[language]?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {category.translated[language]?.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/categories"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover-lift"
              >
                {message('categories.showmore')}
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
