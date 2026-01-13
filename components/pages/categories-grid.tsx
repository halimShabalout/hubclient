'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { Category } from '@/lib/types/Category'

interface CategoriesGridProps {
  categories: Category[]
  lang: 'en' | 'ar'
}

const CategoriesGrid = ({ categories, lang }: CategoriesGridProps) => {
  const { message } = useLanguage()
  const direction: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr'
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''

  return (
    <section className="py-20 bg-secondary/50" dir={direction}>
      <div className="container mx-auto px-4">
        <h2
          className={"text-4xl md:text-5xl font-bold mb-4 text-center"}
        >
          {message('categories.title', 'Explore Our Marble Categories')}
        </h2>

        <p
          className={"text-muted-foreground mb-12 max-w-2xl mx-auto text-center"}
        >
          {message('categories.subtitle', 'Explore our diverse range of marble and stone categories')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative w-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                <Image
                  src={category.imageUrl ? `${baseUrl}${category.imageUrl}` : '/images/no_image.png'}
                  alt={category.translated.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-700"

                />
              </div>

              {/* Content Wrapper */}
              <div className="p-4 flex flex-col h-[200px] md:h-[220px]">
                <div className="flex-1 flex flex-col items-center justify-start">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground/90 mb-2 text-center">
                    {category.translated.name}
                  </h3>

                  {category.translated.description && (
                    <p className="text-sm text-foreground/80 line-clamp-2 text-center">
                      {category.translated.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex justify-center">
                  <Link
                    href={`/${lang}/products?category=${category.id}`}
                    className="px-6 py-2 bg-accent text-accent-foreground font-semibold rounded-md shadow-lg 
                   hover:bg-accent/90 hover:scale-105 transition-all duration-300 text-sm md:text-base text-center"
                  >
                    {message('categories.viewproducts', 'View Products')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  )
}

export default CategoriesGrid
