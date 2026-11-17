'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import {
  getFeaturedProducts,
  getNewArrivals,
  categories,
  getCategoryCount,
} from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FAQSection from '@/components/FAQSection';
import WhatsAppSection from '@/components/WhatsAppSection';
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Shield,
  MessageCircle,
} from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <>
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative bg-brand-navy overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-orange blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-400 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 text-blue-200 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 max-w-full">
                <Sparkles size={13} className="text-brand-orange flex-shrink-0" />
                <span className="truncate">{t.hero?.badge || "Kerala's curated everyday product catalogue"}</span>
              </div>

              {/* Official White Logo in Dark Hero */}
              <div className="mb-5 flex justify-center lg:justify-start">
                <Image
                  src="/images/logo/logo-white.webp"
                  alt="BUNCH & CO."
                  width={280}
                  height={93}
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                  priority
                />
                <h1 className="sr-only">BUNCH & CO.</h1>
              </div>

              {/* Tagline & Subtitle */}
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-100 mb-3 leading-snug">
                {t.hero?.tagline}
              </p>
              <p className="text-blue-200 text-sm sm:text-base mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {t.hero?.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-light active:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-150 text-sm sm:text-base shadow-md"
                >
                  <ShoppingBag size={18} />
                  <span>{t.hero?.shopNow || 'Shop Now'}</span>
                </Link>
                <Link
                  href="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-150 text-sm sm:text-base border border-white/10"
                >
                  <span>{t.hero?.exploreCategories || 'Explore Categories'}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-10 pt-6 border-t border-white/10">
                {[
                  {
                    icon: Shield,
                    label: t.hero?.qualityAssured || 'Quality Assured',
                  },
                  {
                    icon: MessageCircle,
                    label: t.hero?.whatsappOrders || 'WhatsApp Orders',
                  },
                  {
                    icon: Sparkles,
                    label: t.hero?.curatedProducts || 'Curated Finds',
                  },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 text-blue-200 text-xs font-medium"
                  >
                    <Icon size={14} className="text-brand-orange flex-shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Product Spotlight Image */}
            {featuredProducts.length > 0 && (
              <div className="hidden lg:flex justify-center">
                <div className="relative w-80 h-80 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 shadow-2xl flex items-center justify-center">
                  <Image
                    src={featuredProducts[0].cardImage || featuredProducts[0].images[0]}
                    alt={featuredProducts[0].name}
                    fill
                    className="object-contain p-6"
                    priority
                    sizes="320px"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-brand-orange text-white text-xs font-black px-4 py-2 rounded-2xl shadow-lg">
                    ₹{featuredProducts[0].price}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================== FEATURED PRODUCTS ===================== */}
      {featuredProducts.length > 0 && (
        <section className="py-14 sm:py-18 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8 sm:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {t.sections?.featuredProducts}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {t.sections?.featuredSubtitle}
                </p>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors"
              >
                <span>{t.misc?.viewAll || 'View All'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Responsive Grid: 1 col on <360px, 2 cols on >=360px, 3/4 cols on desktop */}
            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {featuredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i === 0} />
              ))}
            </div>

            <div className="sm:hidden mt-6 text-center">
              <Link
                href="/shop"
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white py-3 px-4 rounded-xl transition-colors"
              >
                <span>{t.misc?.viewAll || 'View All'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===================== SHOP BY CATEGORY ===================== */}
      <section className="py-14 sm:py-18 md:py-20 bg-brand-ivory border-y border-gray-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {t.sections?.shopByCategory}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md mx-auto">
              {t.sections?.categorySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((cat) => {
              const count = getCategoryCount(cat.name);
              const localizedCatName = t.categories?.[cat.name] || cat.name;
              const countText =
                t.categories?.itemCount?.(count) ||
                (count === 1 ? '1 product' : `${count} products`);

              return (
                <Link
                  key={cat.name}
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="group bg-white hover:bg-brand-navy rounded-2xl p-4 sm:p-5 text-center shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-200"
                >
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-200">
                    {cat.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-white transition-colors leading-tight mb-1">
                    {localizedCatName}
                  </h3>
                  <p className="text-[11px] text-gray-400 group-hover:text-blue-200 transition-colors">
                    {countText}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== NEW ARRIVALS ===================== */}
      {newArrivals.length > 0 && (
        <section className="py-14 sm:py-18 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8 sm:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {t.sections?.newArrivals}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {t.sections?.newArrivalsSubtitle}
                </p>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors"
              >
                <span>{t.misc?.viewAll || 'View All'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== BRAND INTRO ===================== */}
      <section className="py-14 sm:py-18 md:py-20 bg-brand-cream border-t border-orange-100/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-brand-navy mb-3">
            {t.sections?.aboutBrand}
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-5">
            {t.about?.story}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-8">
            {t.about?.mission}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {[
              {
                title: t.about?.values?.quality,
                desc: t.about?.values?.qualityDesc,
                icon: '✓',
              },
              {
                title: t.about?.values?.trust,
                desc: t.about?.values?.trustDesc,
                icon: '🛡',
              },
              {
                title: t.about?.values?.convenience,
                desc: t.about?.values?.convenienceDesc,
                icon: '💬',
              },
            ].map((val) => (
              <div
                key={val.title}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-card text-center border border-gray-100"
              >
                <div className="text-2xl mb-2 sm:mb-3">{val.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-xs sm:text-sm">
                  {val.title}
                </h3>
                <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors"
            >
              <span>{t.about?.learnMore || 'Learn more about us'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FAQ SECTION ===================== */}
      <FAQSection />

      {/* ===================== WHATSAPP CTA ===================== */}
      <WhatsAppSection />
    </>
  );
}
