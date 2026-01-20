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
      title: "الشعلة الراقية – أفضل رخام وجرانيت وبورسلان في جدة",
      description:
        "الشعلة الراقية… حيث يلتقي التميّز بالجودة. منتجات مختارة بعناية من الرخام الطبيعي، الجرانيت، والبورسلان لرفع مستوى مساحتك بأناقة وجودة عالية.",
      alternates: { canonical: "/ar" },
    }
  }

  return {
    title: "Elegant Torch – Premium Marble, Granite & Porcelain in Jeddah",
    description:
      "Elegant Torch… where excellence meets quality. Carefully selected marble, granite, and porcelain products to elevate your space with elegance and high-quality craftsmanship.",
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
