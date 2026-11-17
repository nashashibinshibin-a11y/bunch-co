'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Language, languageNames } from '@/data/translations';
import { Menu, X, Globe } from 'lucide-react';

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/shop', label: t.nav.shop },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
    { href: '/#faq', label: t.nav.faq || 'FAQ' },
  ];

  const languages: Language[] = ['en', 'ml', 'hi'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-nav' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18 gap-2">
          {/* Logo on Light / White Header */}
          <Link href="/" className="flex items-center flex-shrink-0 group">
            <Image
              src="/images/logo/logo-navy.png"
              alt="BUNCH & CO."
              width={160}
              height={53}
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-opacity duration-150 group-hover:opacity-90"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-gray-700 hover:text-brand-navy rounded-lg hover:bg-gray-50 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Language Selector + Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Desktop & Tablet Segmented Language Selector — Visible at all times */}
            <div className="hidden sm:flex items-center bg-gray-100/90 p-1 rounded-xl border border-gray-200/80 gap-0.5 shadow-2xs">
              <Globe size={13} className="text-brand-orange ml-1.5 mr-1 flex-shrink-0" />
              {languages.map((lang) => {
                const isActive = language === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all duration-150 ${
                      isActive
                        ? 'bg-brand-navy text-white shadow-xs'
                        : 'text-gray-600 hover:text-brand-navy hover:bg-white/60'
                    }`}
                    aria-pressed={isActive}
                  >
                    {languageNames[lang]}
                  </button>
                );
              })}
            </div>

            {/* Mobile Header Language Selector — Compact Visible Native Switcher */}
            <div className="flex sm:hidden items-center bg-gray-100/90 p-0.5 rounded-lg border border-gray-200/80 gap-0.5">
              {languages.map((lang) => {
                const isActive = language === lang;
                const shortLabel = lang === 'en' ? 'EN' : lang === 'ml' ? 'മല' : 'हि';
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`px-1.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                      isActive
                        ? 'bg-brand-navy text-white shadow-xs'
                        : 'text-gray-600 hover:text-brand-navy'
                    }`}
                    title={languageNames[lang]}
                    aria-pressed={isActive}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in max-h-[85vh] overflow-y-auto">
          {/* Mobile Brand Banner */}
          <div className="px-4 pt-3.5 pb-2.5 border-b border-gray-50 flex items-center justify-between">
            <Image
              src="/images/logo/logo-navy.png"
              alt="BUNCH & CO."
              width={120}
              height={40}
              className="h-6 w-auto object-contain"
            />
            <span className="text-[11px] text-gray-400 italic line-clamp-1">
              {t.hero?.tagline || 'Good finds for everyday life'}
            </span>
          </div>

          <nav className="px-3 py-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-brand-navy hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Language Selector (Full Native Scripts) */}
          <div className="px-3 pb-4 pt-1">
            <div className="border-t border-gray-100 pt-3">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                Choose Language / ഭാഷ തിരഞ്ഞെടുക്കുക / भाषा चुनें
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setLanguage(lang);
                      setMobileOpen(false);
                    }}
                    className={`py-2.5 px-2 text-xs rounded-xl font-bold transition-all text-center ${
                      language === lang
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {languageNames[lang]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
