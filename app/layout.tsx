import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { cookies } from 'next/headers'
import { ClientProviders } from '@/providers/ClientProviders'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  applicationName: 'Elegant Torch',
  metadataBase: new URL('https://jeddahmarble.com'),
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const lang = cookieStore.get('NEXT_LOCALE')?.value === 'en' ? 'en' : 'ar'
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#101828" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ClientProviders>
          <ThemeProvider>{children}</ThemeProvider>
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
