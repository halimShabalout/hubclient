'use client'

import { useLanguage } from '@/components/language-provider'
import { useState } from 'react'
import { Heart, Share2 } from 'lucide-react'
import Link from 'next/link'

const allProducts: Record<number, any> = {
  1: {
    id: 1,
    name: { en: 'White Marble Tile', ar: 'بلاط الرخام الأبيض' },
    description: { en: 'Premium white marble tile perfect for modern and classic interiors', ar: 'بلاط رخام أبيض فاخر مثالي للديكورات الحديثة والكلاسيكية' },
    price: '$45',
    rating: 4.8,
    reviews: 124,
    specifications: {
      en: {
        size: '30cm x 30cm',
        thickness: '1cm',
        finish: 'Polished',
        origin: 'Italian',
      },
      ar: {
        size: '30 سم × 30 سم',
        thickness: '1 سم',
        finish: 'مصقول',
        origin: 'إيطالي',
      },
    },
    images: [
      '/white-marble-1.jpg',
      '/white-marble-2.jpg',
      '/white-marble-3.jpg',
      '/white-marble-4.jpg',
    ],
  },
  2: {
    id: 2,
    name: { en: 'Black Granite', ar: 'الجرانيت الأسود' },
    description: { en: 'Premium black granite with natural veining for countertops', ar: 'جرانيت أسود فاخر بعروق طبيعية للأسطح' },
    price: '$65',
    rating: 4.9,
    reviews: 98,
    specifications: {
      en: {
        size: '40cm x 60cm',
        thickness: '2cm',
        finish: 'Honed',
        origin: 'South African',
      },
      ar: {
        size: '40 سم × 60 سم',
        thickness: '2 سم',
        finish: 'مصقول خشن',
        origin: 'جنوب أفريقي',
      },
    },
    images: [
      '/black-granite-1.jpg',
      '/black-granite-2.jpg',
      '/black-granite-3.jpg',
      '/black-granite-4.jpg',
    ],
  },
  3: {
    id: 3,
    name: { en: 'Travertine Stone', ar: 'حجر الترافرتين' },
    description: { en: 'Natural travertine stone with warm earth tones', ar: 'حجر ترافرتين طبيعي بألوان دافئة' },
    price: '$55',
    rating: 4.7,
    reviews: 87,
    specifications: {
      en: {
        size: '30cm x 30cm',
        thickness: '1.2cm',
        finish: 'Brushed',
        origin: 'Turkish',
      },
      ar: {
        size: '30 سم × 30 سم',
        thickness: '1.2 سم',
        finish: 'فرشاة',
        origin: 'تركي',
      },
    },
    images: [
      '/travertine-1.jpg',
      '/travertine-2.jpg',
      '/travertine-3.jpg',
      '/travertine-4.jpg',
    ],
  },
  4: {
    id: 4,
    name: { en: 'Marble Slab', ar: 'لوح رخام' },
    description: { en: 'Large format marble slab for statement walls and features', ar: 'لوح رخام بصيغة كبيرة للجدران والميزات' },
    price: '$120',
    rating: 5.0,
    reviews: 156,
    specifications: {
      en: {
        size: '120cm x 240cm',
        thickness: '2cm',
        finish: 'Polished',
        origin: 'Portuguese',
      },
      ar: {
        size: '120 سم × 240 سم',
        thickness: '2 سم',
        finish: 'مصقول',
        origin: 'برتغالي',
      },
    },
    images: [
      '/marble-slab-1.jpg',
      '/marble-slab-2.jpg',
      '/marble-slab-3.jpg',
      '/placeholder.svg?key=2l3m4&height=600&width=600',
    ],
  },
  5: {
    id: 5,
    name: { en: 'Stone Mosaic', ar: 'فسيفساء حجرية' },
    description: { en: 'Artistic stone mosaic tiles for decorative accent walls', ar: 'بلاط فسيفساء حجر فني لجدران ديكورية' },
    price: '$35',
    rating: 4.6,
    reviews: 72,
    specifications: {
      en: {
        size: '30cm x 30cm',
        thickness: '0.8cm',
        finish: 'Varied',
        origin: 'Spanish',
      },
      ar: {
        size: '30 سم × 30 سم',
        thickness: '0.8 سم',
        finish: 'متنوع',
        origin: 'إسباني',
      },
    },
    images: [
      '/placeholder.svg?key=3m4n5&height=600&width=600',
      '/placeholder.svg?key=4n5o6&height=600&width=600',
      '/placeholder.svg?key=5o6p7&height=600&width=600',
      '/placeholder.svg?key=6p7q8&height=600&width=600',
    ],
  },
  6: {
    id: 6,
    name: { en: 'Pink Marble Tile', ar: 'بلاط الرخام الوردي' },
    description: { en: 'Elegant pink marble tile with subtle veining details', ar: 'بلاط رخام وردي أنيق مع تفاصيل عروق دقيقة' },
    price: '$52',
    rating: 4.8,
    reviews: 103,
    specifications: {
      en: {
        size: '30cm x 30cm',
        thickness: '1cm',
        finish: 'Polished',
        origin: 'Indian',
      },
      ar: {
        size: '30 سم × 30 سم',
        thickness: '1 سم',
        finish: 'مصقول',
        origin: 'هندي',
      },
    },
    images: [
      '/placeholder.svg?key=7q8r9&height=600&width=600',
      '/placeholder.svg?key=8r9s0&height=600&width=600',
      '/placeholder.svg?key=9s0t1&height=600&width=600',
      '/placeholder.svg?key=0t1u2&height=600&width=600',
    ],
  },
}

interface ProductDetailsProps {
  productId: number
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { language, direction } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const product = allProducts[productId]

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">{language === 'en' ? 'Product not found' : 'المنتج غير موجود'}</h1>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <section className={`py-12 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <Link href="/products" className="text-primary hover:text-accent mb-8 inline-flex items-center gap-2">
          <span>←</span>
          <span>{language === 'en' ? 'Back to Products' : 'العودة للمنتجات'}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden bg-secondary group">
              <img
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name[language]}
                className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-foreground smooth-transition z-10"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-foreground smooth-transition z-10"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-20 rounded border-2 overflow-hidden smooth-transition ${
                    idx === currentImageIndex ? 'border-accent' : 'border-border'
                  }`}
                >
                  <img src={img || "/placeholder.svg"} alt={`${product.name[language]} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name[language]}</h1>
              <p className="text-lg text-muted-foreground">{product.description[language]}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">{product.rating}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground">({product.reviews} {language === 'en' ? 'reviews' : 'تقييمات'})</span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-accent">{product.price}</div>

            {/* Specifications */}
            <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
              <h3 className="font-bold text-lg mb-4">{language === 'en' ? 'Specifications' : 'المواصفات'}</h3>
              {Object.entries(product.specifications[language]).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground capitalize">{key}:</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>

            {/* Quantity & Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-secondary">
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-secondary">
                  +
                </button>
              </div>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-3 rounded-lg border border-border hover:bg-secondary smooth-transition"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>

              <button className="p-3 rounded-lg border border-border hover:bg-secondary smooth-transition">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 smooth-transition">
                {language === 'en' ? 'Add to Cart' : 'أضف للسلة'}
              </button>
              <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 smooth-transition">
                {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
