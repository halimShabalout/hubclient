import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ContactPage } from '@/components/pages/contact-page'

export default function ContactPageRoute() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ContactPage />
      </main>
      <Footer />
    </>
  )
}
