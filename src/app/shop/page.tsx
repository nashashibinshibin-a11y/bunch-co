'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { products, categories, Category } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ChevronRight } from 'lucide-react';

function ShopContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;

  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  useEffect(() => {
    if (categoryParam && categories.some((c) => c.name === categoryParam)) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('All');
    }
  }, [categoryParam]);

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const allCats: (Category | 'All')[] = ['All', ...categories.map((c) => c.name)];

  const getCatLabel = (cat: Category | 'All') => {
    if (cat === 'All') return t.misc?.all || 'All';
    return t.categories?.[cat] || cat;
  };

  return (
    <div className="bg-brand-ivory min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-3 sm:mb-4">
            <Link href="/" className="hover:text-brand-navy transition-colors">
              {t.misc?.home || 'Home'}
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-700 font-bold">{t.nav?.shop || 'Shop'}</span>
          </nav>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {t.nav?.allProducts || 'All Products'}
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              {t.categories?.itemCount?.(filteredProducts.length) || `${filteredProducts.length} products`}
              {activeCategory !== 'All' && ` • ${getCatLabel(activeCategory)}`}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Category Pills Scroll */}
      <div className="md:hidden bg-white border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto py-2.5 px-4 scrollbar-none">
          {allCats.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCatLabel(cat)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar — Desktop */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-card p-5 sticky top-24 border border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-4">
                {t.footer?.categories || 'Categories'}
              </h3>
              <ul className="space-y-1">
                {allCats.map((cat) => {
                  const count =
                    cat === 'All'
                      ? products.length
                      : products.filter((p) => p.category === cat).length;
                  const isSelected = activeCategory === cat;
                  return (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-brand-navy text-white font-bold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="truncate pr-2">{getCatLabel(cat)}</span>
                        <span
                          className={`text-xs rounded-full px-1.5 py-0.5 flex-shrink-0 ${
                            isSelected
                              ? 'bg-white/20 text-white font-semibold'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 sm:py-20 bg-white rounded-3xl p-8 border border-gray-100">
                <div className="text-5xl mb-4">📦</div>
                <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-2">
                  {t.product?.noProductsFound}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">{t.product?.checkBackSoon}</p>
                <button
                  type="button"
                  onClick={() => setActiveCategory('All')}
                  className="mt-6 inline-flex items-center gap-2 bg-brand-navy text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-brand-navy-dark transition-colors"
                >
                  {t.misc?.viewAll || 'View All Products'}
                </button>
              </div>
            ) : (
              /* 2-column grid on mobile phones (>= 360px), 1 col on < 360px */
              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} priority={i === 0} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
          <p className="text-gray-400 text-sm">Loading…</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
