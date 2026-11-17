'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import WhatsAppSection from '@/components/WhatsAppSection';
import { Shield, Heart, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Shield,
      title: t.about.values.quality,
      desc: t.about.values.qualityDesc,
    },
    {
      icon: Heart,
      title: t.about.values.trust,
      desc: t.about.values.trustDesc,
    },
    {
      icon: Sparkles,
      title: t.about.values.convenience,
      desc: t.about.values.convenienceDesc,
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-brand-navy py-14 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mb-4">
            <Image
              src="/images/logo/logo-white.webp"
              alt="BUNCH & CO."
              width={220}
              height={73}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t.about.title}
          </h1>
          <p className="text-brand-orange font-medium text-base italic">
            &ldquo;{t.about.tagline}&rdquo;
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-14 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-xl font-bold text-brand-navy mb-4">
                {t.about.storyTitle}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">{t.about.story}</p>
              <p className="text-gray-500 leading-relaxed text-sm">{t.about.mission}</p>
            </div>
            {/* Story Brand Card: Navy container with white lettered logo */}
            <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-10 text-center shadow-card">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/logo/logo-white.png"
                  alt="BUNCH & CO."
                  width={200}
                  height={66}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-brand-orange font-semibold text-sm italic">
                &ldquo;{t.about.tagline}&rdquo;
              </p>
              <div className="mt-6 pt-6 border-t border-white/10 text-xs text-blue-200 leading-relaxed">
                {t.about.est}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-ivory py-14 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10 sm:mb-12">
            {t.about.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val) => (
              <div key={val.title} className="bg-white rounded-2xl p-6 sm:p-7 shadow-card text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <val.icon size={22} className="text-brand-navy" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <WhatsAppSection />
    </>
  );
}
