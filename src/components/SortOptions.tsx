'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type { SortField, SortOrder, SortOption } from '@/types/product';

interface SortOptionsProps {
  currentSort: SortOption;
  onSortChange: (newSort: SortOption) => void;
}

export default function SortOptions({
  currentSort,
  onSortChange,
}: SortOptionsProps) {
  const handleSortFieldChange = (field: SortField) => {
    onSortChange({ ...currentSort, field });
  };

  const handleSortOrderChange = (order: SortOrder) => {
    onSortChange({ ...currentSort, order });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <span className="mr-2 text-sm font-medium">Sort by:</span>
      <div className="flex gap-2">
        <Select
          value={currentSort.field}
          onValueChange={(value) => handleSortFieldChange(value as SortField)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Name</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={currentSort.order}
          onValueChange={(value) => handleSortOrderChange(value as SortOrder)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
