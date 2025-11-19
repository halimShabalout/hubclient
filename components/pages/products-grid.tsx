'use client'

import { useLanguage } from '@/components/language-provider'
import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const allProducts = [
  { id: 1, name: { en: 'White Marble Tile', ar: 'بلاط الرخام الأبيض' }, description: { en: 'Premium white marble tile', ar: 'بلاط رخام أبيض فاخر' }, price: '$45', categoryId: 1, rating: 4.8 },
  { id: 2, name: { en: 'Black Granite', ar: 'الجرانيت الأسود' }, description: { en: 'Classic black granite surface', ar: 'سطح جرانيت أسود كلاسيكي' }, price: '$65', categoryId: 2, rating: 4.9 },
  { id: 3, name: { en: 'Travertine Stone', ar: 'حجر الترافرتين' }, description: { en: 'Natural travertine stone slab', ar: 'لوح حجر ترافرتين طبيعي' }, price: '$55', categoryId: 3, rating: 4.7 },
  { id: 4, name: { en: 'Marble Slab', ar: 'لوح رخام' }, description: { en: 'Large format marble slab', ar: 'لوح رخام بصيغة كبيرة' }, price: '$120', categoryId: 1, rating: 5.0 },
  { id: 5, name: { en: 'Stone Mosaic', ar: 'فسيفساء حجرية' }, description: { en: 'Artistic stone mosaic design', ar: 'تصميم فسيفساء حجر فني' }, price: '$35', categoryId: 5, rating: 4.6 },
  { id: 6, name: { en: 'Pink Marble Tile', ar: 'بلاط الرخام الوردي' }, description: { en: 'Elegant pink marble tile', ar: 'بلاط رخام وردي أنيق' }, price: '$52', categoryId: 1, rating: 4.8 },
]

export function ProductsGrid() {
  const { language, direction } = useLanguage()
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const searchParams = useSearchParams()

  const categoryId = searchParams.get('category') // Extract category as a primitive value for proper dependency tracking

  useEffect(() => {
    if (categoryId) {
      setFilteredProducts(allProducts.filter(p => p.categoryId === parseInt(categoryId)))
    } else {
      setFilteredProducts(allProducts.slice(0, 5))
    }
  }, [categoryId]) // Use categoryId string instead of searchParams object

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  return (
    <section className={`py-20 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 text-primary">
          {language === 'en' ? 'Our Products' : 'منتجاتنا'}
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {language === 'en'
            ? 'Browse our collection of premium marble and stone products'
            : 'تصفح مجموعتنا من منتجات الرخام والحجر الفاخرة'}
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent hover-lift smooth-transition flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={`/ceholder-svg-key-8u4q.jpg?key=8u4q${product.id}&height=400&width=400&query=marble-product-${product.id}`}
                  alt={product.name[language]}
                  className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full smooth-transition shadow-lg"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-accent smooth-transition">
                  {product.name[language]}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 flex-1">
                  {product.description[language]}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-accent">{product.price}</span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>⭐</span> {product.rating}
                  </span>
                </div>

                <Link
                  href={`/products/${product.id}`}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors text-sm text-center"
                >
                  {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
