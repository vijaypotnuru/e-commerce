import type { Product, SortField, SortOrder } from '@/types/product';

export const sortProducts = (
  products: Product[],
  field: SortField,
  order: SortOrder
): Product[] => {
  return [...products].sort((a, b) => {
    if (field === 'title') {
      return order === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }

    if (field === 'price') {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    }

    return 0;
  });
};

export const paginateProducts = (
  products: Product[],
  page: number,
  itemsPerPage: number
): Product[] => {
  const startIndex = (page - 1) * itemsPerPage;
  return products.slice(startIndex, startIndex + itemsPerPage);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
