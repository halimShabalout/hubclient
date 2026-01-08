import ContactPage from '@/components/pages/contact-page'
import { fetchContactInfo } from '@/lib/services/contactInfoService'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function ContactPageRoute({ params }: PageProps) {
    const { lang: langParam } = await params;
  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar';

  const response = await fetchContactInfo(lang)
  const contactInfo = response?.data

  if (!contactInfo) notFound()

  return <ContactPage contactInfo={contactInfo} lang={lang} />
}
