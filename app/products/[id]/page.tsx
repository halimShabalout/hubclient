import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductDetails } from '@/components/pages/product-details'
import { notFound } from 'next/navigation'

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = await params
  
  // Validate ID
  const productId = parseInt(id)
  if (isNaN(productId) || productId < 1 || productId > 6) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ProductDetails productId={productId} />
      </main>
      <Footer />
    </>
  )
}
