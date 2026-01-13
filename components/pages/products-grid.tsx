'use client'

import { useLanguage } from '@/components/language-provider'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types/Product'

interface ProductsGridProps {
  products: Product[]
  lang: 'en' | 'ar'
}

const ProductsGrid = ({ products, lang }: ProductsGridProps) => {
  const { message } = useLanguage()
  const direction: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr'
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  if (!products.length)
    return <p className="text-center py-20">{message('products.empty', 'No products found')}</p>

  return (
    <section
      className="py-20 bg-secondary/50"
      dir={direction}
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2
          className={"text-4xl md:text-5xl font-bold mb-4 text-center"}
        >
          {message('products.title', 'Featured Products')}
        </h2>

        {/* Subtitle */}
        <p
          className={"text-muted-foreground mb-12 max-w-2xl mx-auto text-center"}
        >
          {message(
            'products.subtitle',
            'Handpicked selection of our best-selling marble and stone products'
          )}
        </p>

        {/* Products Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          {products.map((product, idx) => (
            <div
              key={product.id}
              className="group relative w-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                <Image
                  src={product.mainImage ? `${baseUrl}${product.mainImage}` : '/images/no_image.png'}
                  alt={product.translated.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col h-[200px] md:h-[220px]">
                {/* Name & Description */}
                <div className="flex-1 flex flex-col items-center justify-start">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground/90 mb-2 text-center">
                    {product.translated.name}
                  </h3>

                  {product.translated.description && (
                    <p className="text-sm text-foreground/80 line-clamp-2 text-center">
                      {product.translated.description}
                    </p>
                  )}
                </div>

                {/* Button fixed at bottom */}
                <div className="mt-4 flex justify-center">
                  <Link
                    href={`/${lang}/products/${product.id}`}
                    className="px-6 py-2 bg-accent text-accent-foreground font-semibold rounded-md shadow-lg 
                   hover:bg-accent/90 hover:scale-105 transition-all duration-300 text-sm md:text-base text-center"
                  >
                    {message('products.viewdetails', 'View Details')}
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

export default ProductsGrid
