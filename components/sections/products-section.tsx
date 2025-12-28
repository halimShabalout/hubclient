'use client'

import { useLanguage } from '@/components/language-provider'
import { useLandingProducts } from '@/lib/hooks/useProducts'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'

const ProductsSection = () => {
  const { language, direction, message } = useLanguage()
  const { data, isLoading } = useLandingProducts(language)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const { ref, isVisible } = useIntersectionObserver()

  const products = data?.data || []
  const featuredProducts = products.slice(0, 6)

  // Structured Data JSON-LD for featured products
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: featuredProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.translated.name,
        image: product.mainImage ? `${baseUrl}${product.mainImage}` : '/images/no_image.png',
        description: product.translated.description,
        url: `/products/${product.id}`,
      },
    })),
  }

  return (
    <section className={`py-20 ${direction === 'rtl' ? 'rtl' : ''}`} ref={ref}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl md:text-5xl font-bold text-center mb-4 text-foreground ${
            isVisible ? 'fade-in' : 'opacity-0'
          }`}
        >
          {message('products.title', 'Featured Marble Products – Alshoaala Marble')}
        </h2>

        <p
          className={`text-center text-muted-foreground mb-12 max-w-2xl mx-auto ${
            isVisible ? 'fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: isVisible ? '0.1s' : '0s' }}
        >
          {message(
            'products.subtitle',
            'Handpicked selection of our best-selling marble and stone products'
          )}
        </p>

        {isLoading ? (
          <div className="text-center py-12">
            <p>{message('loading', 'Loading...')}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {featuredProducts.map((product, idx) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  title={`View details for ${product.translated.name}`}
                  aria-label={`View details for ${product.translated.name}`}
                  className={`bg-card rounded-lg overflow-hidden hover-lift hover-glow group ${
                    isVisible ? 'scale-in' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay: isVisible ? `${idx * 0.05}s` : '0s',
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={
                        product.mainImage
                          ? `${baseUrl}${product.mainImage}`
                          : '/images/no_image.png'
                      }
                      alt={`رخام طبيعي ${product.translated.name} – Alshoaala Marble`}
                      fill
                      objectFit="cover"
                      className="group-hover:scale-110 smooth-transition"
                      priority={false}
                      sizes="(max-width: 768px) 100vw, 20vw"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-accent smooth-transition">
                      {product.translated.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3">
                      {product.translated.description}
                    </p>

                    <button
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover-lift button-pulse text-sm font-medium"
                      aria-label={`View details for ${product.translated.name}`}
                    >
                      {message('products.viewdetails', 'View Details')}
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/products"
                className={`inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover-lift button-pulse ${
                  isVisible ? 'slide-in-up' : 'opacity-0'
                }`}
                style={{
                  animationDelay: isVisible ? '0.3s' : '0s',
                }}
                title="View all products"
                aria-label="View all products"
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

export default ProductsSection