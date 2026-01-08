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
              className="group relative w-full h-84 rounded-2xl overflow-hidden mb-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"

            >
              {/* Image */}
              <div className="relative h-full w-full">
                <Image
                  src={
                    product.mainImage
                      ? `${baseUrl}${product.mainImage}`
                      : '/images/no_image.png'
                  }
                  alt={product.translated.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlay  */}
              <div
                className="
        absolute bottom-0 left-0 right-0
        min-h-[35%]
        bg-black/40 backdrop-blur-sm
        p-4
        flex flex-col justify-between
      "
              >
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-accent transition-colors">
                    {product.translated.name}
                  </h3>

                  <p className="text-sm text-white/80 mt-1 line-clamp-2">
                    {product.translated.description}
                  </p>
                </div>

                {/* Link */}
                <Link
                  href={`/${lang}/products/${product.id}`}
                  className="
          mt-3 inline-flex items-center justify-center
          px-4 py-2
          bg-accent text-accent-foreground
          rounded-lg
          text-sm font-medium
          hover:scale-[0.98]
          transition-transform
        "
                >
                  {message('products.viewdetails', 'View Details')}
                </Link>
              </div>
            </div>
          ))}

        </div>

        {/* Show More */}
        <div className={`flex justify-center`}>
          <Link
            href={`/${lang}/products`}
            className="inline-block px-10 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl shadow-lg hover:scale-105 hover:-translate-y-1 transition-transform duration-300 text-md md:text-lg"

          >
            {message('showmore', 'Show More')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductsGrid
