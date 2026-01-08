import HeroSection from '@/components/sections/hero-section'
import CategoriesSection from '@/components/sections/categories-section'
import ProductsSection from '@/components/sections/products-section'
import AboutUsSection from '@/components/sections/about-us-section'
import ContactSection from '@/components/sections/contact-section'

import { fetchHomeSlider } from '@/lib/services/homeSliderService'
import { fetchLandingCategories } from '@/lib/services/categoriesService'
import { fetchLandingProducts } from '@/lib/services/productService'
import { fetchAboutUs } from '@/lib/services/aboutUsService'
import { fetchContactInfo } from '@/lib/services/contactInfoService'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { lang: routeLang } = await params
  const lang: 'en' | 'ar' = routeLang === 'en' ? 'en' : 'ar'

  const [
    heroRes,
    categoriesRes,
    productsRes,
    aboutRes,
    contactRes,
  ] = await Promise.all([
    fetchHomeSlider(lang),
    fetchLandingCategories(lang),
    fetchLandingProducts(lang),
    fetchAboutUs(lang),
    fetchContactInfo(lang),
  ])

  if (
    !heroRes?.data ||
    !categoriesRes?.data ||
    !productsRes?.data ||
    !aboutRes?.data ||
    !contactRes?.data
  ) {
    notFound()
  }

  return (
    <main className="flex flex-col">
      <HeroSection slides={heroRes.data} lang={lang} />
      <CategoriesSection categories={categoriesRes.data} lang={lang} />
      <ProductsSection products={productsRes.data} lang={lang} />
      <AboutUsSection aboutUs={aboutRes.data} lang={lang} />
      <ContactSection contactInfo={contactRes.data} lang={lang} />
    </main>
  )
}
