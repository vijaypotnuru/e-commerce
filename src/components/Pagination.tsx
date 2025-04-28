"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

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
  // For visual feedback during transitions
  const [activeTransition, setActiveTransition] = useState(false);
  const [internalPage, setInternalPage] = useState(currentPage);

  // Update internal state when props change
  useEffect(() => {
    setInternalPage(currentPage);
  }, [currentPage]);

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
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // For many pages, show current page with neighbors and ellipsis
      if (internalPage > 3) {
        pages.push("ellipsis-start");
      }

      // Show range around current page
      const rangeStart = Math.max(2, internalPage - 1);
      const rangeEnd = Math.min(totalPages - 1, internalPage + 1);

      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }

      if (internalPage < totalPages - 2) {
        pages.push("ellipsis-end");
      }

      // Always add last page if not already included
      if (rangeEnd < totalPages) {
        pages.push(totalPages);
      }
    }

    // Remove duplicates while preserving order
    return Array.from(new Set(pages));
  };

  const pageNumbers = getPageNumbers();

  // Handler functions with visual transition indicators
  const handlePageChange = (page: number) => {
    if (page === internalPage) return;

    setActiveTransition(true);
    setInternalPage(page);
    onPageChange(page);

    // Reset transition indicator after a delay
    setTimeout(() => {
      setActiveTransition(false);
    }, 300);
  };

  const handlePrevious = () => {
    if (internalPage > 1) {
      handlePageChange(internalPage - 1);
    }
  };

  const handleNext = () => {
    if (internalPage < totalPages) {
      handlePageChange(internalPage + 1);
    }
  };

  return (
    <nav
      className="flex flex-wrap items-center justify-center mt-8 gap-2"
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={internalPage <= 1 || activeTransition}
        aria-label="Previous page"
        className="h-10 w-10 text-gray-700 hover:bg-gray-100 transition-all"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex flex-wrap items-center gap-2 mx-1">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <div
                key={`${page}-${index}`}
                className="flex items-center justify-center w-10 h-10"
              >
                <MoreHorizontal className="h-5 w-5 text-gray-400" />
              </div>
            );
          }

          const isActive = internalPage === page;

          return (
            <Button
              key={`page-${page}`}
              variant={isActive ? "default" : "outline"}
              size="sm"
              disabled={activeTransition}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              className={`w-10 h-10 p-0 font-medium transition-all ${
                isActive
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  : "hover:bg-gray-100"
              }`}
              aria-current={isActive ? "page" : undefined}
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
        onClick={handleNext}
        disabled={internalPage >= totalPages || activeTransition}
        aria-label="Next page"
        className="h-10 w-10 text-gray-700 hover:bg-gray-100 transition-all"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
