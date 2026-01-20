import type { Metadata } from 'next'
import CategoriesGrid from '@/components/pages/categories-grid'
import { fetchAllCategories } from '@/lib/services/categoriesService'
import { Category } from '@/lib/types/Category'

interface PageProps {
  params: Promise<{ lang: string }>;
}

/* =========================
   Metadata
========================= */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
    const { lang: langParam } = await params;
  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar';

  if (lang === 'ar') {
    return {
      title: 'جميع التصنيفات | الشعلة الراقية',
      description:
        'تصفح جميع تصنيفات الرخام والجرانيت والأحجار الطبيعية لدى الشعلة الراقية. جودة عالية تناسب الأرضيات والجدران والأسطح.',
      openGraph: {
        title: 'جميع التصنيفات | الشعلة الراقية',
        description:
          'استعرض مجموعة كاملة من تصنيفات الرخام والأحجار الطبيعية لدى الشعلة الراقية.',
        url: '/categories',
        siteName: 'الشعلة الراقية',
        images: [
          {
            url: '/og/categories.jpg',
            width: 1200,
            height: 630,
            alt: 'تصنيفات الرخام – الشعلة الراقية',
          },
        ],
        type: 'website',
      },
      alternates: {
        canonical: '/categories',
      },
    }
  }

  return {
    title: 'All Categories | Elegant Torch',
    description:
      'Browse all marble, granite, and natural stone categories at Elegant Torch. High-quality materials for floors, walls, and countertops.',
    openGraph: {
      title: 'All Categories | Elegant Torch',
      description:
        'Explore the full range of marble and natural stone categories at Elegant Torch.',
      url: '/en/categories',
      siteName: 'Elegant Torch',
      images: [
        {
          url: '/og/categories.jpg',
          width: 1200,
          height: 630,
          alt: 'Marble Categories – Elegant Torch',
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: '/en/categories',
    },
  }
}

/* =========================
   Page
========================= */
export default async function CategoriesPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar';

  const categoriesData = await fetchAllCategories(lang)
  const categories: Category[] = categoriesData?.data ?? []

  return <CategoriesGrid categories={categories} lang={lang} />
}
