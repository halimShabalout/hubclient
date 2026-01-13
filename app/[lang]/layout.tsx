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
  params: Promise<{ lang: string }>;

}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar';

  if (lang === 'ar') {
    return {
      title: "رخام جدة | الشعلة الراقية للرخام والجرانيت والبورسلان",
      description:
        "الشعلة الراقية في جدة متخصصة في توريد وتصنيع الرخام الطبيعي والجرانيت والبورسلان. مطابخ رخام، مغاسل فاخرة، طاولات، وأعمال حجرية بجودة عالية وأسعار تنافسية.",
      alternates: { canonical: "/ar" },
    }
  }

  return {
    title: "Jeddah Marble | Elegant Torch for Marble, Granite & Porcelain",
    description:
      "Elegant Torch in Jeddah specializes in premium marble, granite, and porcelain supply and fabrication. Custom kitchens, sinks, tables, and high-quality stone solutions.",
    alternates: { canonical: "/en" },
  }
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang: langParam } = await params;
  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar';
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const [resSocialLinks, resContactInfo] = await Promise.all([
    fetchAllSocialLinks(),
    fetchContactInfo(lang),
  ])

  const socialLinks = resSocialLinks?.data ?? []
  const contactInfo = resContactInfo?.data ?? {}

  return (
    <LanguageProvider userLang={lang}>
      <div>
        <Navbar />
        <main>{children}</main>
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
