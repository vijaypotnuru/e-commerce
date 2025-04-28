import type { Product, SortField, SortOrder } from "@/types/product";

export const sortProducts = (
  products: Product[],
  field: SortField,
  order: SortOrder
): Product[] => {
  if (!products || products.length === 0) {
    return [];
  }

  return [...products].sort((a, b) => {
    if (field === "title") {
      return order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }

    if (field === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    }

    return 0;
  });
};

export const paginateProducts = (
  products: Product[],
  page: number,
  itemsPerPage: number
): Product[] => {
  // Handle edge cases
  if (!products || products.length === 0) {
    return [];
  }

  // Ensure page is valid
  const validPage = Math.max(1, page);
  const startIndex = (validPage - 1) * itemsPerPage;

  // Ensure we don't go beyond array bounds
  if (startIndex >= products.length) {
    return [];
  }

  return products.slice(startIndex, startIndex + itemsPerPage);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const filterProductsBySearch = (
  products: Product[],
  searchQuery: string
): Product[] => {
  if (!products || products.length === 0) {
    return [];
  }

  if (!searchQuery.trim()) {
    return products;
  }

  const query = searchQuery.toLowerCase().trim();

  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );
};
