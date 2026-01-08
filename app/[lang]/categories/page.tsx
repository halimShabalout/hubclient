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
  }

  return {
    title: 'All Categories | Alshoaala Marble',
    description:
      'Browse all marble, granite, and natural stone categories at Alshoaala Marble. High-quality materials for floors, walls, and countertops.',
    openGraph: {
      title: 'All Categories | Alshoaala Marble',
      description:
        'Explore the full range of marble and natural stone categories at Alshoaala Marble.',
      url: '/en/categories',
      siteName: 'Alshoaala Marble',
      images: [
        {
          url: '/og/categories.jpg',
          width: 1200,
          height: 630,
          alt: 'Marble Categories – Alshoaala Marble',
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
