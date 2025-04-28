"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) return null;

  // Function to generate page numbers with proper spacing
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Logic for showing page numbers and ellipsis
    if (totalPages <= 7) {
      // If 7 or fewer pages, show all pages
      for (let i = 2; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // For many pages, show current page with neighbors and ellipsis
      if (currentPage > 3) {
        pages.push("ellipsis-start");
      }

      // Show range around current page
      const rangeStart = Math.max(2, currentPage - 1);
      const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-end");
      }
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center mt-8 space-x-1"
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center space-x-1 mx-2">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <div
                key={`${page}-${index}`}
                className="flex items-center justify-center w-8 h-8"
              >
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </div>
            );
          }

          return (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className="w-8 h-8 p-0"
              aria-current={currentPage === page ? "page" : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
