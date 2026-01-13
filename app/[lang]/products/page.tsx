import type { Metadata } from 'next'
import ProductsGrid from '@/components/pages/products-grid'
import { fetchAllProductsByLanguage } from '@/lib/services/productService'
import { Product } from '@/lib/types/Product'

interface PageProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ category?: string }>
}

/* =========================
   Metadata
========================= */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar'

  if (lang === 'ar') {
    return {
      title: 'منتجات الرخام | الشعلة الراقية للرخام',
      description:
        'تصفح مجموعة واسعة من منتجات الرخام والأحجار الطبيعية عالية الجودة من مؤسسة الشعلة للرخام.',
      alternates: { canonical: '/ar/products' },
    }
  }

  return {
    title: 'Marble Products | Elegant Torch',
    description:
      'Browse our wide range of high-quality marble and natural stone products at Elegant Torch.',
    alternates: { canonical: '/en/products' },
  }
}

/* =========================
   Page
========================= */
export default async function ProductsPage({
  params,
  searchParams,
}: PageProps) {
  const { lang: langParam } = await params
  const { category } = await searchParams

  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar'

  const categoryId = category ? Number(category) : undefined

  const productsData = await fetchAllProductsByLanguage(lang)
  const allProducts: Product[] = productsData?.data ?? []

  const filteredProducts = categoryId
    ? allProducts.filter(p => p.categoryId === categoryId)
    : allProducts

  return <ProductsGrid products={filteredProducts} lang={lang} />
}
