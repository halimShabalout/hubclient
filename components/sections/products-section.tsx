'use client'

import { useLanguage } from '@/components/language-provider'
import { useProducts } from '@/lib/hooks'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import Link from 'next/link'

export function ProductsSection() {
  const { language, direction, message } = useLanguage()
  const { products, loading } = useProducts()
  const { ref, isVisible } = useIntersectionObserver()

  const featuredProducts = products.slice(0, 6)

  return (
    <section className={`py-20 ${direction === 'rtl' ? 'rtl' : ''}`} ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 text-foreground ${isVisible ? 'fade-in' : 'opacity-0'}`}>
          {message('products.title')}
        </h2>
        <p className={`text-center text-muted-foreground mb-12 max-w-2xl mx-auto ${isVisible ? 'fade-in' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.1s' : '0s' }}>
          {language === 'en'
            ? 'Handpicked selection of our best-selling marble and stone products'
            : 'مجموعة مختارة بعناية من أفضل منتجات الرخام والحجر لدينا'}
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p>{message('loading') || 'Loading...'}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {featuredProducts.map((product, idx) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={`bg-card rounded-lg overflow-hidden hover-lift hover-glow group ${isVisible ? 'scale-in' : 'opacity-0'}`}
                  style={{
                    animationDelay: isVisible ? `${idx * 0.05}s` : '0s',
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.translated[language]?.image_url || `/placeholder.svg?height=300&width=300&query=marble-product`}
                      alt={product.translated[language]?.name}
                      className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-accent smooth-transition">
                      {product.translated[language]?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.translated[language]?.description}</p>
                    <p className="text-xl font-bold text-accent mb-3">${product.price}</p>
                    <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover-lift button-pulse text-sm font-medium">
                      {message('products.viewdetails')}
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/products"
                className={`inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover-lift button-pulse ${isVisible ? 'slide-in-up' : 'opacity-0'}`}
                style={{
                  animationDelay: isVisible ? '0.3s' : '0s',
                }}
              >
                {message('products.showmore')}
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
