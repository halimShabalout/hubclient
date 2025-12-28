import { Metadata } from 'next'
import ProductsGrid from '@/components/pages/products-grid'

export const metadata: Metadata = {
  title: 'منتجات الرخام | الشعلة للرخام',
  description:
    'تصفح مجموعة واسعة من منتجات الرخام والأحجار الطبيعية عالية الجودة من مؤسسة الشعلة للرخام.',
  keywords: [
    'رخام',
    'منتجات رخام',
    'رخام طبيعي',
    'جرانيت',
    'الشعلة للرخام',
    'رخام جدة'
  ],
  alternates: {
    canonical: '/products'
  },
}

export default function ProductsPage() {
  return <ProductsGrid />
}
