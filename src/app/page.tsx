"use client";

import { useCallback, useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import SortOptions from "@/components/SortOptions";
import SearchBar from "@/components/SearchBar";
import type { Product, SortOption } from "@/types/product";
import {
  paginateProducts,
  sortProducts,
  filterProductsBySearch,
} from "@/lib/productUtils";
import { getAllProducts } from "@/services/productService";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const ITEMS_PER_PAGE = 10;
// Create a static array of skeleton IDs to avoid using index as key
const SKELETON_IDS = [
  "sk-1",
  "sk-2",
  "sk-3",
  "sk-4",
  "sk-5",
  "sk-6",
  "sk-7",
  "sk-8",
  "sk-9",
  "sk-10",
];

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>({
    field: "title",
    order: "asc",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        setAllProducts(products);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Reset to page 1 when search or sort criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortOption]);

  // Memoized function to get processed products
  const getProcessedProducts = useCallback(() => {
    // Apply filters and sorting
    const filtered = filterProductsBySearch(allProducts, searchQuery);
    const sorted = sortProducts(filtered, sortOption.field, sortOption.order);

    // Calculate total pages
    const total = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));

    // Ensure current page is valid
    const validPage = Math.min(Math.max(1, currentPage), total);

    // Get current page items
    const paginatedItems = paginateProducts(sorted, validPage, ITEMS_PER_PAGE);

    return {
      filtered,
      sorted,
      paginatedItems,
      totalPages: total,
      validPage,
    };
  }, [allProducts, searchQuery, sortOption, currentPage]);

  const {
    filtered: filteredProducts,
    sorted: sortedProducts,
    paginatedItems: paginatedProducts,
    totalPages,
    validPage: validCurrentPage,
  } = getProcessedProducts();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    // Validate page number
    const newPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(newPage);

    // Scroll to top when changing pages
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
        <div className="flex flex-col gap-4 mb-4">
          <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-gray-600">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
              {totalPages > 1 && ` • Page ${validCurrentPage} of ${totalPages}`}
            </p>
            <SortOptions
              currentSort={sortOption}
              onSortChange={handleSortChange}
            />
          </div>
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
                <p className="text-gray-500">
                  No products found matching your search criteria.
                </p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={validCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
