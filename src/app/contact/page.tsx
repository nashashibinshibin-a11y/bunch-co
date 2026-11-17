'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();

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
            {t.contact.title}
          </h1>
          <p className="text-blue-200 text-sm md:text-base max-w-md mx-auto">{t.contact.subtitle}</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-brand-ivory py-14 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WhatsApp Card */}
            <div className="bg-white rounded-2xl shadow-card p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                  <MessageCircle size={22} className="text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{t.contact.whatsapp}</h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {t.contact.whatsappDesc}
              </p>
              <a
                href={`https://wa.me/918921267174?text=${encodeURIComponent(t.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-400 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors duration-200 w-full"
              >
                <MessageCircle size={18} />
                <span>{t.contact.whatsapp}</span>
                <ArrowRight size={16} />
              </a>
              <p className="text-center text-xs text-gray-400 mt-3">
                +91 89212 67174
              </p>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-card p-6 sm:p-7">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  {t.contact.businessInfo}
                </h2>
                <Image
                  src="/images/logo/logo-navy.png"
                  alt="BUNCH & CO."
                  width={110}
                  height={36}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-brand-navy" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      {t.contact.location}
                    </p>
                    <p className="text-sm text-gray-700">{t.contact.locationDetail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-brand-navy" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      {t.contact.businessHours}
                    </p>
                    <p className="text-sm text-gray-700">{t.contact.hoursDetail}</p>
                  </div>
                </div>
              </div>

              {/* How to Order */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">{t.contact.howToOrderTitle}</h3>
                <ol className="space-y-3">
                  {t.contact.howToOrderSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-brand-navy text-white text-xs flex items-center justify-center font-semibold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Delivery Note */}
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-brand-navy mb-2">
              {t.contact.deliveryInfoTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.contact.deliveryInfoText}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
