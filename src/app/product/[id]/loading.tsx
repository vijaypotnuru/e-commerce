import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Skeleton className="w-full aspect-square rounded-md" />
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="flex items-center mb-4">
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="h-8 w-24 mb-4" />

            <Separator className="my-4" />

            <div className="mb-6">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="mb-4">
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>

            <Skeleton className="h-12 w-full mt-4 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
