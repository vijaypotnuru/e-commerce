'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-bold text-xl">ShopCatalog</span>
          </Link>
          <nav>
            <Link
              href="/"
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Products
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
