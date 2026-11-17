'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, getLocalizedProduct } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingBag, Package, Banknote } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

function ProductCard({ product, priority = false }: ProductCardProps) {
  const { t, language } = useLanguage();
  const localized = getLocalizedProduct(product, language);

  const availabilityLabel = {
    'in-stock': t.product?.inStock || 'In Stock',
    'out-of-stock': t.product?.outOfStock || 'Out of Stock',
    limited: t.product?.limitedStock || 'Limited Stock',
  }[product.availability];

  const availabilityColor = {
    'in-stock': 'text-green-700 bg-green-50 border-green-200/50',
    'out-of-stock': 'text-red-600 bg-red-50 border-red-200/50',
    limited: 'text-amber-700 bg-amber-50 border-amber-200/50',
  }[product.availability];

  const localizedCategory =
    t.categories?.[product.category] || product.category;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-gray-100/80 transition-all duration-300 flex flex-col h-full">
      {/* Product Image */}
      <Link
        href={`/shop/${product.slug}`}
        className="block relative overflow-hidden aspect-square bg-gray-50/70"
      >
        <Image
          src={product.cardImage || product.images[0]}
          alt={localized.name}
          fill
          className="object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
        {/* New Arrival Badge */}
        {product.newArrival && (
          <span className="absolute top-2.5 left-2.5 bg-brand-orange text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
            {t.categories?.['New Arrivals'] || 'New'}
          </span>
        )}
        {/* Pack Size Badge on Image */}
        {product.packSize && product.packSize > 1 && (
          <span className="absolute bottom-2.5 left-2.5 bg-brand-navy/90 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-xs">
            {product.packBadgeI18n?.[language] || `Pack of ${product.packSize}`}
          </span>
        )}
        {/* Availability Badge */}
        <span
          className={`absolute top-2.5 right-2.5 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full border ${availabilityColor}`}
        >
          {availabilityLabel}
        </span>
      </Link>

      {/* Product Info */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Brand & Pack Tag */}
        <div className="flex items-center justify-between mb-1 gap-2">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-orange truncate">
            {product.brand}
          </p>
          {product.packSize && product.packSize > 1 && (
            <span className="text-[10px] font-bold text-brand-navy bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full flex-shrink-0">
              {product.packBadgeI18n?.[language] || `Pack of ${product.packSize}`}
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug hover:text-brand-navy transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
            {localized.name}
          </h3>
        </Link>

        {/* Category */}
        <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1 mb-2.5">
          <Package size={11} className="flex-shrink-0" />
          <span className="truncate">{localizedCategory}</span>
        </p>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-auto mb-2 flex-wrap">
          <span className="text-lg sm:text-xl font-black text-brand-navy">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-400 line-through font-medium">
              ₹{product.originalPrice}
            </span>
          )}
          {product.packSize && product.packSize > 1 && (
            <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">
              {language === 'ml' ? '(പായ്ക്ക്)' : language === 'hi' ? '(प्रति पैक)' : '(per pack)'}
            </span>
          )}
        </div>

        {/* Cash on Delivery Badge */}
        <div className="flex items-center gap-1.5 text-[10.5px] text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg mb-3 w-fit font-semibold">
          <Banknote size={11} className="text-emerald-600 flex-shrink-0" />
          <span className="truncate">{t.trust?.codBadge || 'Cash on Delivery Available'}</span>
        </div>

        {/* Action Buttons — 2-column grid so both fit cleanly on mobile */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <Link
            href={`/shop/${product.slug}`}
            className="text-center text-xs font-bold border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white px-2 py-2 rounded-xl transition-colors duration-150 truncate"
          >
            {t.product?.viewDetails || 'Details'}
          </Link>
          <Link
            href={`/shop/${product.slug}/order`}
            className="flex items-center justify-center gap-1 text-xs font-bold bg-brand-orange hover:bg-brand-orange-light text-white px-2 py-2 rounded-xl transition-colors duration-150 truncate shadow-sm"
          >
            <ShoppingBag size={12} className="flex-shrink-0" />
            <span className="truncate">{t.product?.buyNow || 'Order'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
