import { products, getProductBySlug } from '@/data/products';
import { notFound } from 'next/navigation';
import OrderClient from './OrderClient';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Order | BUNCH & CO.' };
  return {
    title: `Order ${product.name} — BUNCH & CO.`,
    description: `Complete your delivery details to order ${product.name} via WhatsApp.`,
  };
}

export default async function OrderPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <OrderClient slug={slug} />;
}
