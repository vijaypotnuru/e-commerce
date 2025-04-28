import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getProductById } from '@/services/productService';
import { formatPrice } from '@/lib/productUtils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const dynamic = 'force-dynamic';

// Update the interface to match the PageProps constraint
interface ProductPageProps {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductById(Number(params.id));

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found',
    };
  }

  return {
    title: `${product.title} | ShopCatalog`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.id);
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-1">{product.rating.rate}★</span>
              <span className="text-sm text-gray-500">({product.rating.count} reviews)</span>
            </div>

            <div className="text-2xl font-bold text-gray-900 mb-4">
              {formatPrice(product.price)}
            </div>

            <Separator className="my-4" />

            <div className="mb-6">
              <h2 className="font-medium mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mb-4">
              <h2 className="font-medium mb-2">Category</h2>
              <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                {product.category}
              </div>
            </div>

            <Button className="w-full mt-4" size="lg">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
