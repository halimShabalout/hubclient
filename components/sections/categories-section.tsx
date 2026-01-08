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

        {/* Categories Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          {categories.map(category => (
            <div
              key={category.id}
              className="group relative w-full h-84 rounded-2xl overflow-hidden mb-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={
                    category.imageUrl
                      ? `${baseUrl}${category.imageUrl}`
                      : '/images/no_image.png'
                  }
                  alt={category.translated.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>


              {/* Overlay */}
              <div className="
              absolute bottom-0 left-0 right-0
              min-h-[35%]
              bg-black/40 backdrop-blur-sm
              p-5
              flex flex-col justify-between
            ">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-accent transition-colors">
                    {category.translated.name}
                  </h3>

                  {category.translated.description && (
                    <p className="text-sm md:text-base text-white/80 mt-1 line-clamp-2">
                      {category.translated.description}
                    </p>
                  )}
                </div>

                <Link
                  href={`/${lang}/products?category=${category.id}`}
                  className="inline-block w-full text-center px-6 py-2 bg-accent text-accent-foreground font-semibold rounded-md shadow hover:scale-95 transition-transform duration-300 text-sm md:text-base"
                >
                  {message('showmore', 'Show More')}
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className={`flex justify-center`}>
          <Link
            href={`/${lang}/categories`}
            className="inline-block px-10 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl shadow-lg hover:scale-105 hover:-translate-y-1 transition-transform duration-300 text-md md:text-lg"
          >
            {message('showmore', 'Show More')}
          </Link>
        </div>
      </div>
    </section>





  )
}

export default CategoriesSection
