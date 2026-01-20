import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  const lang = 'ar' 
  const isRTL = lang === 'ar'

  return {
    name: isRTL ? 'الشعلة الراقية' : 'Elegant Torch',
    short_name: isRTL ? 'رخام' : 'marble',
    description: isRTL
      ? 'اكتشف الرخام والحجر الطبيعي المتميز من الشعلة الراقية في جدة – مطابخ، أحواض، طاولات، بورسلين، جرانيت.'
      : 'Discover premium natural marble and stone from Elegant Torch in Jeddah – kitchens, sinks, tables, porcelain, granite.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    categories: ['business', 'marble', 'construction'],
    lang: lang,
  }
}
