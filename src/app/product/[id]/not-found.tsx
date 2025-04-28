import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
      <p className="text-gray-600 text-center mb-8 max-w-lg">
        The product you're looking for doesn't exist or may have been removed.
      </p>
      <Link href="/">
        <Button>Return to Products</Button>
      </Link>
    </div>
  );
}
