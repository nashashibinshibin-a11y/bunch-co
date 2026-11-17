'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Language, languageNames } from '@/data/translations';
import { categories } from '@/data/products';
import { MessageCircle, MapPin, Clock, Globe, Banknote, RotateCcw, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { t, language, setLanguage } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: t.nav.home },
    { href: '/shop', label: t.nav.shop },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
    { href: '/returns-and-refunds', label: t.footer.returnsRefunds || 'Returns & Refunds' },
  ];

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo/logo-white.webp"
              alt="BUNCH & CO."
              width={160}
              height={53}
              className="h-9 w-auto mb-4 object-contain"
              loading="lazy"
            />
            <p className="text-blue-200 text-sm leading-relaxed mb-5">
              {t.footer.tagline}
            </p>
            <a
              href={`https://wa.me/918921267174?text=${encodeURIComponent(t.contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-150"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-300 mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-200 text-sm hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-300 mb-4">
              {t.footer.categories}
            </h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat.name)}`}
                    className="text-blue-200 text-sm hover:text-white transition-colors duration-150"
                  >
                    {t.categories?.[cat.name] || cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-300 mb-4">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <span className="text-blue-200 text-sm">{t.contact.location}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={15} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <span className="text-blue-200 text-sm">{t.contact.hoursDetail}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle size={15} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <a
                  href={`https://wa.me/918921267174?text=${encodeURIComponent(t.contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 text-sm hover:text-white transition-colors"
                >
                  +91 89212 67174
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Trust Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs text-blue-200">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <Banknote size={15} />
            </span>
            <span className="font-medium">{t.trust?.codBadge || 'Cash on Delivery Available'}</span>
          </div>
          <Link
            href="/returns-and-refunds"
            className="flex items-center gap-2.5 hover:text-white transition-colors group"
          >
            <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <RotateCcw size={15} />
            </span>
            <span className="font-medium underline-offset-4 group-hover:underline">
              {t.trust?.returnsBadge || 'Returns Available'}
            </span>
          </Link>
          <Link
            href="/returns-and-refunds"
            className="flex items-center gap-2.5 hover:text-white transition-colors group"
          >
            <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <ShieldCheck size={15} />
            </span>
            <span className="font-medium underline-offset-4 group-hover:underline">
              {t.trust?.refundsBadge || 'Refund Support Available'}
            </span>
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-blue-300 text-xs text-center sm:text-left">
            © {year} BUNCH & CO. {t.footer.rights}
          </p>

          {/* Footer Language Selector */}
          <div className="flex items-center gap-2 text-xs">
            <Globe size={13} className="text-brand-orange flex-shrink-0" />
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/10">
              {(['en', 'ml', 'hi'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    language === lang
                      ? 'bg-white text-brand-navy font-bold shadow-xs'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </div>
          </div>

          <p className="text-blue-300 text-xs text-center sm:text-right">{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
