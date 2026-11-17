'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Banknote, RotateCcw, ShieldCheck, ArrowRight } from 'lucide-react';

interface TrustSectionProps {
  compact?: boolean;
}

export default function TrustSection({ compact = false }: TrustSectionProps) {
  const { t } = useLanguage();

  const trustItems = [
    {
      icon: Banknote,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      title: t.trust.codTitle,
      description: t.trust.codDesc,
      badge: t.trust.codBadge,
    },
    {
      icon: RotateCcw,
      iconColor: 'text-brand-navy bg-blue-50 border-blue-100',
      title: t.trust.returnsTitle,
      description: t.trust.returnsDesc,
      badge: t.trust.returnsBadge,
      href: '/returns-and-refunds',
    },
    {
      icon: ShieldCheck,
      iconColor: 'text-brand-orange bg-orange-50 border-orange-100',
      title: t.trust.refundsTitle,
      description: t.trust.refundsDesc,
      badge: t.trust.refundsBadge,
      href: '/returns-and-refunds',
    },
  ];

  if (compact) {
    return (
      <div className="bg-brand-cream/60 border border-orange-100/80 rounded-2xl p-4 my-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2.5">
          {t.trust.bannerBadge}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-gray-700">
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border ${item.iconColor}`}>
                <item.icon size={15} />
              </span>
              <div>
                <p className="font-bold text-gray-900 leading-tight">{item.title}</p>
                <p className="text-[11px] text-gray-500 leading-tight">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-10 bg-white border-y border-gray-100/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {trustItems.map((item, idx) => {
            const Content = (
              <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-gray-50/60 hover:bg-gray-50 border border-gray-100 transition-all duration-200 h-full group">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-200 group-hover:scale-105 ${item.iconColor}`}
                >
                  <item.icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                    {item.href && (
                      <ArrowRight size={13} className="text-gray-400 group-hover:text-brand-orange transition-colors flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );

            return item.href ? (
              <Link key={idx} href={item.href} className="block">
                {Content}
              </Link>
            ) : (
              <div key={idx}>{Content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
