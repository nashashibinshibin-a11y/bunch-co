'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getProductBySlug, getLocalizedProduct } from '@/data/products';
import ImageGallery from '@/components/ImageGallery';
import {
  ChevronRight,
  ShoppingBag,
  CheckCircle,
  Truck,
  Tag,
  Package,
} from 'lucide-react';

interface Props {
  slug: string;
}

export default function ProductDetailClient({ slug }: Props) {
  const { t, language } = useLanguage();
  const rawProduct = getProductBySlug(slug);

  // This component is only rendered if the product exists (server page checks)
  if (!rawProduct) return null;

  const product = getLocalizedProduct(rawProduct, language);
  const localizedCategory = t.categories?.[product.category] || product.category;

  const availabilityLabel = {
    'in-stock': t.product.inStock,
    'out-of-stock': t.product.outOfStock,
    limited: t.product.limitedStock,
  }[product.availability];

  const availabilityColor = {
    'in-stock': 'text-green-600',
    'out-of-stock': 'text-red-500',
    limited: 'text-amber-600',
  }[product.availability];

  return (
    <div className="bg-brand-ivory min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-brand-navy transition-colors">
              {t.misc.home}
            </Link>
            <ChevronRight size={12} className="flex-shrink-0" />
            <Link href="/shop" className="hover:text-brand-navy transition-colors">
              {t.nav.shop}
            </Link>
            <ChevronRight size={12} className="flex-shrink-0" />
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hover:text-brand-navy transition-colors"
            >
              {localizedCategory}
            </Link>
            <ChevronRight size={12} className="flex-shrink-0" />
            <span className="text-gray-700 font-medium truncate max-w-[180px] sm:max-w-none">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
          {/* LEFT — Image Gallery */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* RIGHT — Product Info */}
          <div className="flex flex-col">
            {/* Brand */}
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
              {product.brand}
            </p>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>

            {/* Availability */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-sm font-semibold ${availabilityColor} flex items-center gap-1`}>
                <CheckCircle size={14} />
                {availabilityLabel}
              </span>
            </div>

            {/* Price Row */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-3xl font-black text-brand-navy">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through font-medium">
                  ₹{product.originalPrice}
                </span>
              )}
              {product.packSize && product.packSize > 1 && (
                <span className="text-xs font-bold text-brand-orange bg-orange-50 border border-orange-200/60 px-3 py-1 rounded-full">
                  {language === 'ml'
                    ? `₹${product.price} / ${product.packSize} എണ്ണത്തിന്റെ പായ്ക്ക്`
                    : language === 'hi'
                    ? `₹${product.price} / ${product.packSize} का पैक`
                    : `₹${product.price} / Pack of ${product.packSize}`}
                </span>
              )}
            </div>

            {/* Package Contents Callout — Clearly states the pack quantity and items in the order */}
            {product.packageContentsI18n?.[language] ? (
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 mb-5 flex items-start gap-3 text-amber-950">
                <span className="text-xl flex-shrink-0">📦</span>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-amber-800 mb-0.5">
                    {language === 'ml' ? 'പായ്ക്ക് ഉള്ളടക്കം' : language === 'hi' ? 'पैकेज सामग्री' : 'Package Contents'}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-amber-950">
                    {product.packageContentsI18n[language].main}
                  </p>
                  {product.packageContentsI18n[language].sub && (
                    <p className="text-[11px] text-amber-800/80 mt-1">
                      {product.packageContentsI18n[language].sub}
                    </p>
                  )}
                </div>
              </div>
            ) : product.packSize && product.packSize > 1 ? (
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 mb-5 flex items-start gap-3 text-amber-950">
                <span className="text-xl flex-shrink-0">📦</span>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-amber-800 mb-0.5">
                    {language === 'ml' ? 'പായ്ക്ക് ഉള്ളടക്കം' : language === 'hi' ? 'पैकेज सामग्री' : 'Package Contents'}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-amber-950">
                    {language === 'ml'
                      ? `ഈ ഓർഡറിൽ ${product.packSize} എണ്ണത്തിന്റെ പായ്ക്ക് ഉൾപ്പെടുന്നു.`
                      : language === 'hi'
                      ? `इस ऑर्डर में ${product.packSize} का पैक शामिल है।`
                      : `This order contains a Pack of ${product.packSize}.`}
                  </p>
                  <p className="text-[11px] text-amber-800/80 mt-1">
                    {language === 'ml'
                      ? `1 പായ്ക്ക് ഓർഡർ ചെയ്യുമ്പോൾ ${product.packSize} എണ്ണം ലഭിക്കും.`
                      : language === 'hi'
                      ? `1 पैक ऑर्डर करने पर ${product.packSize} इकाइयाँ प्राप्त होंगी।`
                      : `Ordering 1 pack delivers ${product.packSize} units to your address.`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-3.5 mb-5 flex items-center gap-3 text-blue-950">
                <span className="text-lg flex-shrink-0">📦</span>
                <p className="text-xs sm:text-sm font-semibold">
                  {language === 'ml'
                    ? 'ഈ ഓർഡറിൽ 1 യൂണിറ്റ് അടങ്ങിയിരിക്കുന്നു.'
                    : language === 'hi'
                    ? 'इस ऑर्डर में 1 इकाई शामिल है।'
                    : 'This order contains 1 unit.'}
                </p>
              </div>
            )}

            {/* Short description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 border-t border-gray-100 pt-5">
              {product.shortDescription}
            </p>

            {/* Key Features */}
            <div className="mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                {t.product.features}
              </h2>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle
                      size={15}
                      className="text-brand-orange mt-0.5 flex-shrink-0"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 mb-6 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Tag size={12} className="text-brand-orange" />
                {t.product.brand}: <strong className="text-gray-700 ml-1">{product.brand}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Package size={12} className="text-brand-orange" />
                {t.product.category}: <strong className="text-gray-700 ml-1">{localizedCategory}</strong>
              </span>
            </div>

            {/* Order Now Button — Opens dedicated order form */}
            <Link
              href={`/shop/${product.slug}/order`}
              className="flex items-center justify-center gap-2.5 bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3.5 sm:py-4 px-6 rounded-2xl transition-colors duration-200 text-base mb-2 shadow-sm group"
            >
              <ShoppingBag size={20} className="transition-transform group-hover:scale-110" />
              {t.product.buyNow}
            </Link>
            <p className="text-center text-xs text-gray-500 mb-6">
              {t.product.redirectNotice}
            </p>

            {/* Delivery Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Truck size={18} className="text-brand-navy mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-brand-navy mb-1">
                    {t.product.delivery}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {product.delivery.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications — Full width below */}
        <div className="mt-8 sm:mt-12 bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">{t.product.specifications}</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {product.specifications.map((spec, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row sm:items-center px-4 sm:px-6 py-3 sm:py-3.5 text-sm gap-1 sm:gap-4 ${
                  i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                }`}
              >
                <span className="w-full sm:w-48 font-medium text-gray-500 text-xs sm:text-sm flex-shrink-0">
                  {spec.label}
                </span>
                <span className="text-gray-900 font-semibold text-sm break-words">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Full Description */}
        <div className="mt-6 sm:mt-8 bg-white rounded-2xl shadow-card p-5 sm:p-8">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
            {t.product.aboutProduct}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-orange transition-colors"
          >
            ← {t.misc.backToShop}
          </Link>
        </div>
      </div>
    </div>
  );
}
