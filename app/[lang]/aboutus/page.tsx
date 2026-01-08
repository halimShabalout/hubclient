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
      title: 'من نحن | الشعلة للرخام',
      description:
        'تعرف على قصة الشعلة للرخام، رؤيتنا، رسالتنا، وقيمنا في تقديم أفضل حلول الرخام والأحجار الطبيعية.',
      openGraph: {
        title: 'من نحن | الشعلة للرخام',
        description:
          'اكتشف تاريخ وخبرة الشعلة للرخام في عالم الرخام والأحجار الطبيعية.',
        url: '/about',
        siteName: 'الشعلة للرخام',
        images: [
          {
            url: '/og/about.jpg',
            width: 1200,
            height: 630,
            alt: 'من نحن – الشعلة للرخام',
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
    title: 'About Us | Alshoaala Marble',
    description:
      'Learn about Alshoaala Marble, our story, mission, vision, and values in delivering premium marble and natural stone solutions.',
    openGraph: {
      title: 'About Us | Alshoaala Marble',
      description:
        'Discover the story and expertise behind Alshoaala Marble in the marble and natural stone industry.',
      url: '/en/about',
      siteName: 'Alshoaala Marble',
      images: [
        {
          url: '/og/about.jpg',
          width: 1200,
          height: 630,
          alt: 'About Us – Alshoaala Marble',
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
