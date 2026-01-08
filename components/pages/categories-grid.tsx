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
  const direction: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr'


  const { message } = useLanguage()

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
  const brandName = lang === 'ar' ? 'الشعلة للرخام' : 'Alshoaala Marble'

  return (
    <section className="py-20" dir={direction}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 text-foreground">
          {message('categories.all', 'All Categories')}
        </h1>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {message(
            'categories.all.subtitle',
            'Browse our complete selection of marble and stone categories'
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/${lang}/products?category=${category.id}`}
              title={category.translated?.name}
              className="group"
            >
              <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-all h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={
                      category.imageUrl
                        ? `${baseUrl}${category.imageUrl}`
                        : '/images/no_image.png'
                    }
                    alt={`${category.translated?.name} – ${brandName}`}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors">
                    {category.translated?.name}
                  </h3>

                  <p className="text-sm text-muted-foreground flex-1">
                    {category.translated?.description}
                  </p>

                  <span className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-accent text-accent-foreground rounded font-semibold text-sm group-hover:bg-accent/90 transition-colors">
                    {message('categories.viewproducts', 'View Products')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesGrid
