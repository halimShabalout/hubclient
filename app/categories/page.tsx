import type { Metadata } from 'next'
import CategoriesGrid from '@/components/pages/categories-grid'

export const metadata: Metadata = {
  title: 'جميع التصنيفات | الشعلة للرخام',
  description:
    'تصفح جميع تصنيفات الرخام والجرانيت والأحجار الطبيعية لدى الشعلة للرخام. جودة عالية تناسب الأرضيات والجدران والأسطح.',
  openGraph: {
    title: 'جميع التصنيفات | الشعلة للرخام',
    description:
      'استعرض مجموعة كاملة من تصنيفات الرخام والأحجار الطبيعية لدى الشعلة للرخام.',
    url: '/categories',
    siteName: 'الشعلة للرخام',
    images: [
      {
        url: '/og/categories.jpg',
        width: 1200,
        height: 630,
        alt: 'تصنيفات الرخام – الشعلة للرخام',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: '/categories',
  },
}

export default function CategoriesPage() {
  return <CategoriesGrid />
}
