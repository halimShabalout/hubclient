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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.translated.name,
      url: `/${lang}/products/${product.id}`,
    })),
  }

  return (
    <section className="py-20" dir={direction}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 text-foreground">
          {message('our.products', 'Our Products')}
        </h1>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {message(
            'products.all.title',
            'Browse our collection of premium marble and stone products'
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent hover-lift transition-all flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={product.mainImage ? `${baseUrl}${product.mainImage}` : '/images/no_image.png'}
                  alt={`${product.translated.name} – ${lang === 'ar' ? 'الشعلة للرخام' : 'Alshoaala Marble'}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-shadow shadow-lg">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                  {product.translated.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-3 flex-1">
                  {product.translated.description}
                </p>

                <Link
                  href={`/${lang}/products/${product.id}`}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors text-sm text-center"
                >
                  {message('products.viewdetails', 'View Details')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsGrid
