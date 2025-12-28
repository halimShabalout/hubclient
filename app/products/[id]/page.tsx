import ProductDetails from '@/components/pages/product-details'
import { notFound } from 'next/navigation'

interface ProductDetailsPageProps {
  params: { id: string } | Promise<{ id: string }>
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = await params
  const productId = parseInt(id)

  if (isNaN(productId)) {
    notFound()
  }

  return <ProductDetails productId={productId} />
}
