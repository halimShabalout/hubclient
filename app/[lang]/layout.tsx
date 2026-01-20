import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FloatingActionButtons from '@/components/floating-action-buttons'
import { ReactNode } from 'react'
import { fetchContactInfo } from '@/lib/services/contactInfoService'
import { fetchAllSocialLinks } from '@/lib/services/socialLinkService'
import { LanguageProvider } from '@/components/language-provider'
import type { Metadata } from 'next'

interface LayoutProps {
  children: ReactNode
  params: Promise<{ lang: string }>
}

/* =========================
   Metadata
========================= */
export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar'

  if (lang === 'ar') {
    return {
      title: 'الشعلة الراقية للرخام في جدة | جودة فاخرة وتصاميم مميزة',
      description:
        'الشعلة الراقية تقدم أفضل أنواع الرخام الطبيعي والجرانيت والبورسلان في جدة. منتجات مختارة بعناية تضيف لمسة فخامة لمساحتك.',
      alternates: { canonical: '/ar' },
    }
  }

  return {
    title: 'Elegant Torch Marble in Jeddah | Premium Stone & Surfaces',
    description:
      'Elegant Torch offers premium marble, granite, and porcelain in Jeddah. Carefully selected materials to elevate your space with elegance and quality.',
    alternates: { canonical: '/en' },
  }
}

/* =========================
   Layout
========================= */
export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang: langParam } = await params
  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar'

  const [resSocialLinks, resContactInfo] = await Promise.all([
    fetchAllSocialLinks(),
    fetchContactInfo(lang),
  ])

  const socialLinks = resSocialLinks?.data ?? []
  const contactInfo = resContactInfo?.data ?? {}

  return (
    <LanguageProvider userLang={lang}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer
          language={lang}
          contactInfo={contactInfo}
          socialLinks={socialLinks}
        />
        <FloatingActionButtons lang={lang} contactInfo={contactInfo} />
      </div>
    </LanguageProvider>
  )
}
