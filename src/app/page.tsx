'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import SortOptions from '@/components/SortOptions';
import type { Product, SortOption } from '@/types/product';
import { paginateProducts, sortProducts } from '@/lib/productUtils';
import { getAllProducts } from '@/services/productService';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const ITEMS_PER_PAGE = 10;
// Create a static array of skeleton IDs to avoid using index as key
const SKELETON_IDS = [
  'sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5',
  'sk-6', 'sk-7', 'sk-8', 'sk-9', 'sk-10'
];

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>({
    field: 'title',
    order: 'asc',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        setAllProducts(products);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = sortProducts(allProducts, sortOption.field, sortOption.order);
  const paginatedProducts = paginateProducts(sortedProducts, currentPage, ITEMS_PER_PAGE);
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-gray-600">
            {allProducts.length} products available
          </p>
          <SortOptions
            currentSort={sortOption}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      <Separator className="mb-8" />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {SKELETON_IDS.map((id) => (
            <div key={id} className="flex flex-col space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-10" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="flex justify-center items-center p-8 border rounded-lg">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No products found.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
