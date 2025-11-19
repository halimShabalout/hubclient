'use client'

import { useLanguage } from '@/components/language-provider'
import Link from 'next/link'
import { useState } from 'react'

const allCategories = [
  { id: 1, name: { en: 'Marble Tiles', ar: 'بلاط الرخام' }, description: { en: 'Premium marble tiles for flooring and walls', ar: 'بلاط رخام فاخر للأرضيات والجدران' } },
  { id: 2, name: { en: 'Granite Countertops', ar: 'أسطح الجرانيت' }, description: { en: 'Durable granite surfaces for kitchens', ar: 'أسطح جرانيت متينة للمطابخ' } },
  { id: 3, name: { en: 'Stone Slabs', ar: 'ألواح الحجر' }, description: { en: 'Large format natural stone slabs', ar: 'ألواح حجر طبيعية بصيغة كبيرة' } },
  { id: 4, name: { en: 'Decorative Pieces', ar: 'قطع زخرفية' }, description: { en: 'Artistic marble and stone decorations', ar: 'زينات رخام وحجر فنية' } },
  { id: 5, name: { en: 'Mosaics', ar: 'الفسيفساء' }, description: { en: 'Traditional and modern mosaic designs', ar: 'تصاميم الفسيفساء التقليدية والحديثة' } },
  { id: 6, name: { en: 'Bathroom Fixtures', ar: 'تجهيزات الحمام' }, description: { en: 'Marble basins and bathroom elements', ar: 'أحواض رخام وعناصر الحمام' } },
  { id: 7, name: { en: 'Architectural Stone', ar: 'الحجر المعماري' }, description: { en: 'Stone for building facades and structures', ar: 'حجر لواجهات وهياكل المباني' } },
  { id: 8, name: { en: 'Fireplace Surrounds', ar: 'إطارات المدفأة' }, description: { en: 'Elegant marble fireplace designs', ar: 'تصاميم مدافئ رخام أنيقة' } },
  { id: 9, name: { en: 'Outdoor Pavers', ar: 'رصفات خارجية' }, description: { en: 'Weather-resistant stone pavers', ar: 'رصفات حجرية مقاومة للعوامل الجوية' } },
  { id: 10, name: { en: 'Custom Designs', ar: 'تصاميم مخصصة' }, description: { en: 'Bespoke marble and stone creations', ar: 'إنشاءات رخام وحجر مخصصة' } },
  { id: 11, name: { en: 'Polished Finishes', ar: 'تشطيبات مصقولة' }, description: { en: 'High-gloss marble and stone finishes', ar: 'تشطيبات رخام وحجر لامعة عالية' } },
  { id: 12, name: { en: 'Textured Surfaces', ar: 'الأسطح المنسوجة' }, description: { en: 'Natural texture stone options', ar: 'خيارات الحجر ذات النسيج الطبيعي' } },
]

export function CategoriesGrid() {
  const { language, direction } = useLanguage()
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  return (
    <section className={`py-20 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 text-primary">
          {language === 'en' ? 'All Categories' : 'جميع الفئات'}
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {language === 'en'
            ? 'Browse our complete selection of marble and stone categories'
            : 'تصفح مجموعتنا الكاملة من فئات الرخام والحجر'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="group"
            >
              <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-accent smooth-transition hover-lift h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={`/marble-category-.jpg?height=400&width=400&query=marble-category-${category.id}`}
                    alt={category.name[language]}
                    className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 smooth-transition" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-accent smooth-transition">
                    {category.name[language]}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 smooth-transition flex-1">
                    {category.description[language]}
                  </p>

                  <button className="mt-4 w-full px-4 py-2 bg-accent text-accent-foreground rounded font-semibold hover:bg-accent/90 transition-colors text-sm scale-in">
                    {language === 'en' ? 'View Products' : 'عرض المنتجات'}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
