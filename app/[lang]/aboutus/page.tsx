import type { Metadata } from 'next'
import AboutUsPage from '@/components/pages/about-us-page'
import { fetchAboutUs } from '@/lib/services/aboutUsService'
import { notFound } from 'next/navigation'

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
      title: 'من نحن | الشعلة الراقية',
      description:
        'تعرف على قصة الشعلة الراقية رؤيتنا، رسالتنا، وقيمنا في تقديم أفضل حلول الرخام والأحجار الطبيعية.',
      openGraph: {
        title: 'من نحن | الشعلة الراقية',
        description:
          'اكتشف تاريخ وخبرة الشعلة الراقية في عالم الرخام والأحجار الطبيعية.',
        url: '/about',
        siteName: 'الشعلة الراقية',
        images: [
          {
            url: '/og/about.jpg',
            width: 1200,
            height: 630,
            alt: 'من نحن – الشعلة الراقية',
          },
        ],
        type: 'website',
      },
      alternates: {
        canonical: '/about',
      },
    }
  }

  return {
    title: 'About Us | Elegant Torch',
    description:
      'Learn about Elegant Torch, our story, mission, vision, and values in delivering premium marble and natural stone solutions.',
    openGraph: {
      title: 'About Us | Elegant Torch',
      description:
        'Discover the story and expertise behind Elegant Torch in the marble and natural stone industry.',
      url: '/en/about',
      siteName: 'Elegant Torch',
      images: [
        {
          url: '/og/about.jpg',
          width: 1200,
          height: 630,
          alt: 'About Us – Elegant Torch',
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: '/en/about',
    },
  }
}

/* =========================
   Page (Server)
========================= */
export default async function AboutPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar';

  const response = await fetchAboutUs(lang)
  const aboutUs = response?.data

  if (!aboutUs) notFound()

  return <AboutUsPage aboutUs={aboutUs} lang={lang} />
}
