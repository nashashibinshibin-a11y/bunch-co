'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle, ShoppingBag, CheckCircle } from 'lucide-react';

export default function WhatsAppSection() {
  const { t } = useLanguage();

  const steps = [
    { icon: ShoppingBag, num: '1', title: t.whatsapp.step1, desc: t.whatsapp.step1Desc },
    { icon: MessageCircle, num: '2', title: t.whatsapp.step2, desc: t.whatsapp.step2Desc },
    { icon: CheckCircle, num: '3', title: t.whatsapp.step3, desc: t.whatsapp.step3Desc },
  ];

  return (
    <section className="bg-brand-navy py-14 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t.whatsapp.title}
          </h2>
          <p className="text-blue-200 text-sm sm:text-base max-w-xl mx-auto">
            {t.whatsapp.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-white/10 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center mx-auto mb-4">
                <step.icon size={22} className="text-white" />
              </div>
              <div className="absolute top-4 right-4 text-5xl font-black text-white/5 leading-none select-none">
                {step.num}
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
              <p className="text-blue-200 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={`https://wa.me/918921267174?text=${encodeURIComponent(t.contact.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors duration-200 text-base shadow-sm"
          >
            <MessageCircle size={20} />
            {t.whatsapp.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
