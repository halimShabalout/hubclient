import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductsGrid } from '@/components/pages/products-grid'

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ProductsGrid />
      </main>
      <Footer />
    </>
  )
}
