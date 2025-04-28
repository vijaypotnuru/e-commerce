'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/productUtils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg">
        <CardHeader className="p-4 flex-1 flex items-center justify-center bg-gray-50 rounded-t-lg overflow-hidden">
          <div className="relative w-full h-48">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              style={{ objectFit: 'contain' }}
              priority={false}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <h3 className="font-medium line-clamp-2 h-12 mb-2" title={product.title}>
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 h-10" title={product.description}>
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <span className="font-bold text-lg">{formatPrice(product.price)}</span>
          <div className="flex items-center">
            <span className="text-sm text-yellow-500 font-medium mr-1">
              {product.rating.rate}★
            </span>
            <span className="text-xs text-gray-400">({product.rating.count})</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
