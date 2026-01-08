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
      title: "رخام جدة | رخام الشعلة الراقية",
      description:
        "تعرف على الرخام الطبيعي عالي الجودة من الشعلة للرخام في جدة – مطابخ، مغاسل، طاولات، بورسلان وجرانيت.",
      alternates: { canonical: "/ar" },
    }
  }

  return {
    title: "Alshoaala Marble | Premium Marble in Jeddah",
    description:
      "Discover premium natural marble and stone from Alshoaala Marble in Jeddah – kitchens, sinks, tables, porcelain, granite.",
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
