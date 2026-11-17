'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-ivory px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-brand-navy/10 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-500 text-sm mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-navy-dark transition-colors"
        >
          <ShoppingBag size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
