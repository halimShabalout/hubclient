import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AboutUsPage } from '@/components/pages/about-us-page'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <AboutUsPage />
      </main>
      <Footer />
    </>
  )
}
