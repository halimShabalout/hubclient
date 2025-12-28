import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/components/language-provider';
import FloatingActionButtons from '@/components/floating-action-buttons';
import { ClientProviders } from '@/providers/ClientProviders';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const geist = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default:
      'رخام جدة | رخام الشعلة الراقية | Alshoaala Marble | رخام مطابخ ومغاسل في جدة',
    template:
      '%s | رخام جدة – رخام الشعلة الراقية | Alshoaala Marble',
  },
  description:
    'رخام الشعلة الراقية – Alshoaala Marble، مؤسسة متخصصة في بيع وتوريد وتركيب الرخام في جدة. رخام مطابخ، مغاسل رخام، طاولات رخام، بورسلان، جرانيت بجودة عالية وأسعار منافسة داخل جدة.',
  keywords: [
    'رخام جدة',
    'شركة رخام في جدة',
    'بيع رخام جدة',
    'رخام مطابخ جدة',
    'مغاسل رخام جدة',
    'طاولات رخام',
    'بورسلان جدة',
    'جرانيت جدة',
    'marble jeddah',
    'marble company jeddah',
    'granite jeddah',
    'porcelain tiles jeddah',
    'alshoaala marble',
  ],
  applicationName: 'Alshoaala Marble',
  authors: [{ name: 'Alshoaala Marble' }],
  generator: 'Next.js',
  metadataBase: new URL('https://alshoaala-marbel.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      ar: '/ar',
      en: '/en',
    },
  },
  openGraph: {
    title:
      'رخام جدة | رخام الشعلة الراقية | Alshoaala Marble',
    description:
      'بيع وتوريد وتركيب الرخام في جدة – رخام مطابخ، مغاسل، طاولات، بورسلان وجرانيت. مؤسسة الشعلة الراقية للمقاولات العامة.',
    url: 'https://alshoaala-marbel.vercel.app',
    siteName: 'Alshoaala Marble',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'رخام جدة | رخام الشعلة الراقية',
    description:
      'أفضل مؤسسة رخام في جدة – مطابخ، مغاسل، بورسلان، جرانيت.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'مؤسسة الشعلة الراقية للمقاولات العامة',
    alternateName: 'Alshoaala Marble',
    url: 'https://alshoaala-marbel.vercel.app',
    logo: 'https://alshoaala-marbel.vercel.app/logo.png',
    description:
      'بيع وتوريد وتركيب الرخام في جدة. رخام مطابخ، مغاسل رخام، طاولات رخام، بورسلان وجرانيت.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'جدة',
      addressRegion: 'منطقة مكة المكرمة',
      addressCountry: 'SA',
    },
    areaServed: {
      '@type': 'City',
      name: 'Jeddah',
    },
    telephone: '+966505633490',
    priceRange: '$$',
    makesOffer: [
      { '@type': 'Product', name: 'رخام مطابخ' },
      { '@type': 'Product', name: 'مغاسل رخام' },
      { '@type': 'Product', name: 'طاولات رخام' },
      { '@type': 'Product', name: 'بورسلان' },
      { '@type': 'Product', name: 'جرانيت' },
    ],
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111827" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ClientProviders>
          <ThemeProvider>
            <LanguageProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <FloatingActionButtons />
            </LanguageProvider>
          </ThemeProvider>
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  );
}
