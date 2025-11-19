import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CategoriesGrid } from '@/components/pages/categories-grid'

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CategoriesGrid />
      </main>
      <Footer />
    </>
  )
}
