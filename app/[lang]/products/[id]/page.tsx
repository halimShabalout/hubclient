import { fetchProductById } from '@/lib/services/productService';
import type { Product } from '@/lib/types/Product';
import ProductDetails from '@/components/pages/product-details';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface ProductDetailsPageProps {
  params: Promise<{ lang: string; id: string }>;
}

/* =========================
   Dynamic Metadata
========================= */
export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
  const { lang: langParam, id } = await params;
  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar';
  const productId = parseInt(id);
  if (isNaN(productId)) notFound();

  const productData = await fetchProductById(productId, lang);
  const product: Product | null = productData?.data ?? null;
  if (!product) notFound();

  return {
    title: product.translated.name,
    description: product.translated.description,
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { lang: langParam, id } = await params;
  const lang: 'en' | 'ar' = langParam === 'en' ? 'en' : 'ar';
  const productId = parseInt(id);

  if (isNaN(productId)) notFound();

  const productData = await fetchProductById(productId, lang);
  const product: Product | null = productData?.data ?? null;

  if (!product) notFound();

  return <ProductDetails product={product} lang={lang} />;
}
