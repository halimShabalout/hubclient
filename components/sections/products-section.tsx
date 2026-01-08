'use client'

import { useLanguage } from '@/components/language-provider'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types/Product'

interface ProductsSectionProps {
  products: Product[]
  lang: 'en' | 'ar'
}

const ProductsSection = ({ products, lang }: ProductsSectionProps) => {
  const { direction, message } = useLanguage()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const { ref, isVisible } = useIntersectionObserver()

  if (!products || products.length === 0) {
    return null
  }

  const featuredProducts = products.slice(0, 6)

  return (
    <section
      ref={ref}
      className="py-20"
      dir={direction}
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2
          className={`text-4xl md:text-5xl font-bold mb-4 ${
            direction === 'rtl' ? 'text-right' : 'text-center'
          } ${isVisible ? 'fade-in' : 'opacity-0'}`}
        >
          {message('products.title', 'Featured Products')}
        </h2>

        {/* Subtitle */}
        <p
          className={`text-muted-foreground mb-12 max-w-2xl mx-auto ${
            direction === 'rtl' ? 'text-right' : 'text-center'
          } ${isVisible ? 'fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          {message(
            'products.subtitle',
            'Handpicked selection of our best-selling marble and stone products'
          )}
        </p>

        {/* Products Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10 ${
            direction === 'rtl' ? 'text-right' : 'text-left'
          }`}
        >
          {featuredProducts.map((product, idx) => (
            <Link
              key={product.id}
              href={`/${lang}/products/${product.id}`}
              className={`bg-card rounded-xl overflow-hidden border border-border hover:border-accent hover-lift group ${
                isVisible ? 'scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={
                    product.mainImage
                      ? `${baseUrl}${product.mainImage}`
                      : '/images/no_image.png'
                  }
                  alt={product.translated.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-4 flex flex-col h-full">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                  {product.translated.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.translated.description}
                </p>

                <span
                  className={`mt-auto inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded font-medium text-sm hover:bg-primary/90 transition-colors ${
                    direction === 'rtl' ? 'self-start' : 'self-end'
                  }`}
                >
                  {message('products.viewdetails', 'View Details')}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More */}
        <div
          className={`${
            direction === 'rtl' ? 'text-right' : 'text-center'
          }`}
        >
          <Link
            href={`/${lang}/products`}
            className={`inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover-lift ${
              isVisible ? 'slide-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            {message('showmore', 'Show More')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
