'use client'

import { useLanguage } from '@/components/language-provider'
import { useAboutUs } from '@/lib/hooks/useAboutUs'
import Link from 'next/link'

export function AboutUsPage() {
  const { language, direction } = useLanguage()
  const { data: response, isLoading } = useAboutUs(language)

  if (isLoading || !response?.data?.length) {
    return (
      <section className={`py-20 bg-secondary/50 ${direction === 'rtl' ? 'rtl' : ''}`}>
        <div className="container mx-auto px-4 text-center">
          <p>Loading...</p>
        </div>
      </section>
    )
  }

  const aboutUs = response.data[0]
  const data = aboutUs.translated

  const stats = [
    { label: { en: 'Years Experience', ar: 'سنوات الخبرة' }, value: '25+' },
    { label: { en: 'Satisfied Customers', ar: 'العملاء الراضون' }, value: '5000+' },
    { label: { en: 'Products', ar: 'المنتجات' }, value: '200+' },
    { label: { en: 'Expert Team', ar: 'الفريق الخبير' }, value: '50+' },
  ]

  return (
    <div className={`${direction === 'rtl' ? 'rtl' : ''}`}>
      {/* Hero Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 slide-in-up">
            {language === 'en' ? 'About Our Company' : 'حول شركتنا'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl slide-in-up">
            {language === 'en'
              ? 'A legacy of excellence in marble and stone craftsmanship'
              : 'إرث من التميز في حرفة الرخام والحجر'}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold text-primary mb-6 slide-in-up">
            {language === 'en' ? 'Our Story' : 'قصتنا'}
          </h2>
          <div className="space-y-4 text-lg text-foreground/90 slide-in-up">
            <p>{data.story}</p>
            <p>{data.mission}</p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center slide-in-up">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {language === 'en' ? 'Our Mission' : 'مهمتنا'}
              </h3>
              <p className="text-foreground/80">{data.mission}</p>
            </div>
            <div className="text-center slide-in-up">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {language === 'en' ? 'Our Vision' : 'رؤيتنا'}
              </h3>
              <p className="text-foreground/80">{data.vision}</p>
            </div>
            <div className="text-center slide-in-up">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {language === 'en' ? 'Our Values' : 'قيمنا'}
              </h3>
              <p className="text-foreground/80">{data.values}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="slide-in-up">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label[language]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
