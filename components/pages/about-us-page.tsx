'use client'

import { useLanguage } from '@/components/language-provider'

export function AboutUsPage() {
  const { language, direction } = useLanguage()

  const stats = [
    { label: { en: 'Years Experience', ar: 'سنوات الخبرة' }, value: '25+' },
    { label: { en: 'Satisfied Customers', ar: 'العملاء الراضون' }, value: '5000+' },
    { label: { en: 'Products', ar: 'المنتجات' }, value: '200+' },
    { label: { en: 'Expert Team', ar: 'الفريق الخبير' }, value: '50+' },
  ]

  const team = [
    { name: { en: 'Ahmed Hassan', ar: 'أحمد حسن' }, role: { en: 'Founder & CEO', ar: 'المؤسس والرئيس التنفيذي' } },
    { name: { en: 'Fatima Al-Mansouri', ar: 'فاطمة المنصوري' }, role: { en: 'Design Director', ar: 'مدير التصميم' } },
    { name: { en: 'Mohammed Ali', ar: 'محمد علي' }, role: { en: 'Operations Manager', ar: 'مدير العمليات' } },
    { name: { en: 'Sara Johnson', ar: 'سارة جونسون' }, role: { en: 'Customer Relations', ar: 'العلاقات العامة' } },
  ]

  return (
    <div className={`${direction === 'rtl' ? 'rtl' : ''}`}>
      {/* Hero Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 slide-in-up">
            {language === 'en' ? 'About Our Company' : 'حول شركتنا'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl slide-in-up" style={{ animationDelay: '0.1s' }}>
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
            <p>
              {language === 'en'
                ? 'Founded in 1999, our company began as a small family business with a passion for premium marble and stone. Over 25 years, we have grown to become one of the most trusted suppliers in the region.'
                : 'تأسست شركتنا عام 1999 كمشروع عائلي صغير برغبة في الرخام والحجر الفاخر. وعلى مدى 25 سنة، نما لنصبح أحد أكثر الموردين الموثوقية في المنطقة.'}
            </p>
            <p>
              {language === 'en'
                ? 'Our commitment to quality, innovation, and customer satisfaction has been the cornerstone of our success. Every product is carefully selected and inspected to ensure it meets our high standards.'
                : 'التزامنا بالجودة والابتكار ورضا العملاء كان حجر الأساس لنجاحنا. يتم اختيار كل منتج وفحصه بعناية للتأكد من استيفائه معاييرنا العالية.'}
            </p>
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
              <p className="text-foreground/80">
                {language === 'en'
                  ? 'To provide the finest quality marble and stone products that enhance the beauty and value of every space.'
                  : 'توفير أفضل منتجات الرخام والحجر التي تعزز جمال وقيمة كل مساحة.'}
              </p>
            </div>
            <div className="text-center slide-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-2xl font-bold text-primary mb-4">
                {language === 'en' ? 'Our Vision' : 'رؤيتنا'}
              </h3>
              <p className="text-foreground/80">
                {language === 'en'
                  ? 'To be the leading marble and stone supplier recognized for excellence, innovation, and customer focus.'
                  : 'أن نكون الموردين الرائدين للرخام والحجر المعروفين بالتميز والابتكار وتركيز العملاء.'}
              </p>
            </div>
            <div className="text-center slide-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold text-primary mb-4">
                {language === 'en' ? 'Our Values' : 'قيمنا'}
              </h3>
              <p className="text-foreground/80">
                {language === 'en'
                  ? 'Quality, integrity, sustainability, and customer satisfaction are the core values that guide our business.'
                  : 'الجودة والنزاهة والاستدامة ورضا العملاء هي القيم الأساسية التي توجه عملنا.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="slide-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label[language]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-12 slide-in-up">
            {language === 'en' ? 'Our Leadership Team' : 'فريق القيادة لدينا'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-card rounded-lg overflow-hidden hover-lift slide-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20" />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-foreground">{member.name[language]}</h3>
                  <p className="text-sm text-accent">{member.role[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
