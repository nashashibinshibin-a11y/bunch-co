'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { CURRENT_POLICY_TERMS, COD_TERMS } from '@/data/policy';
import {
  RotateCcw,
  ShieldCheck,
  MessageCircle,
  Banknote,
  HelpCircle,
  ArrowRight,
  Clock,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

export default function ReturnsAndRefundsPage() {
  const { t, language } = useLanguage();

  // WhatsApp click-to-chat URL with pre-filled support message
  const prefilledMessage =
    language === 'ml'
      ? 'Hi BUNCH & CO.! എനിക്ക് ഒരു റിട്ടേൺ അല്ലെങ്കിൽ റീഫണ്ട് സഹായം ആവശ്യമുണ്ട്.'
      : language === 'hi'
      ? 'Hi BUNCH & CO.! मुझे रिटर्न या रिफंड के संबंध में सहायता चाहिए।'
      : CURRENT_POLICY_TERMS.defaultWhatsAppMessage;

  const whatsappUrl = `https://wa.me/${CURRENT_POLICY_TERMS.supportWhatsAppNumber}?text=${encodeURIComponent(
    prefilledMessage
  )}`;

  return (
    <div className="bg-brand-ivory min-h-screen py-8 sm:py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 sm:mb-8">
          <Link href="/" className="hover:text-brand-navy transition-colors">
            {t.misc?.home || 'Home'}
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-700 font-bold">
            {t.returnsPolicy?.pageTitle || 'Returns & Refund Policy'}
          </span>
        </nav>

        {/* Page Header */}
        <div className="bg-brand-navy rounded-3xl p-6 sm:p-10 text-white mb-8 sm:mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-brand-orange/20 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-blue-200 text-xs font-semibold px-3.5 py-1 rounded-full mb-4">
              <ShieldCheck size={14} className="text-brand-orange" />
              <span>{t.returnsPolicy?.heroBadge || 'Customer Protection'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 tracking-tight">
              {t.returnsPolicy?.pageTitle || 'Returns & Refund Policy'}
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl">
              {t.returnsPolicy?.pageSubtitle ||
                'Transparent assistance for product returns and refund requests.'}
            </p>
          </div>
        </div>

        {/* Core Neutral Policy Statement Banner */}
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-5 sm:p-6 mb-8 text-amber-950 flex items-start gap-3.5 shadow-xs">
          <RotateCcw size={22} className="text-brand-orange flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-amber-900 mb-1">
              {t.trust?.bannerBadge || 'Easy Returns & Refunds Available'}
            </h2>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              {t.returnsPolicy?.neutralStatement ||
                'Returns and refunds are available. Please contact BUNCH & CO. through WhatsApp for assistance with your return or refund request and to confirm the applicable conditions.'}
            </p>
          </div>
        </div>

        {/* WhatsApp Support CTA Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100 mb-8 sm:mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 flex-shrink-0 mx-auto sm:mx-0">
              <MessageCircle size={28} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                {t.contact?.whatsapp || 'Chat on WhatsApp'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                +91 89212 67174 • {t.contact?.businessHours || 'Mon – Sat, 9 AM – 7 PM'}
              </p>
            </div>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-md text-sm sm:text-base"
          >
            <MessageCircle size={18} />
            <span>{t.returnsPolicy?.whatsappCta || 'Contact WhatsApp Support'}</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Policy Explanations Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-card border border-gray-100 space-y-8 mb-8 sm:mb-10">
          {/* 1. How to Request a Return */}
          <div className="border-b border-gray-100 pb-6 sm:pb-8">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-50 text-brand-navy flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {t.returnsPolicy?.howToReturnTitle || 'How to Request a Return'}
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-10.5">
              {t.returnsPolicy?.howToReturnDesc ||
                'If you wish to return a product you received, reach out to our team directly on WhatsApp. Share your order information, product details, and the reason for your request. Our support team will guide you through the process.'}
            </p>
          </div>

          {/* 2. How to Contact BUNCH & CO. */}
          <div className="border-b border-gray-100 pb-6 sm:pb-8">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-8 h-8 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {t.returnsPolicy?.contactTitle || 'How to Contact BUNCH & CO.'}
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-10.5">
              {t.returnsPolicy?.contactDesc ||
                'You can contact us via WhatsApp at +91 89212 67174 (Monday to Saturday, 9 AM to 7 PM IST). We provide personal, one-on-one assistance directly in your chat.'}
            </p>
          </div>

          {/* 3. How Refund Requests are Handled */}
          <div className="border-b border-gray-100 pb-6 sm:pb-8">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {t.returnsPolicy?.refundHandlingTitle || 'How Refund Requests are Handled'}
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-10.5">
              {t.returnsPolicy?.refundHandlingDesc ||
                'Once you get in touch with us regarding a refund, our team reviews your request details, confirms the applicable conditions with you, and coordinates the next steps directly through WhatsApp.'}
            </p>
          </div>

          {/* 4. How You Receive Updates */}
          <div className="border-b border-gray-100 pb-6 sm:pb-8">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
                4
              </span>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {t.returnsPolicy?.updatesTitle || 'How You Receive Updates'}
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-10.5">
              {t.returnsPolicy?.updatesDesc ||
                'All updates regarding your return or refund request are communicated directly to you via WhatsApp, so you never have to check external portals or wait for automated emails.'}
            </p>
          </div>

          {/* 5. Cash on Delivery (COD) Returns */}
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                <Banknote size={16} />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {t.returnsPolicy?.codTitle || 'Cash on Delivery (COD) Orders'}
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-10.5">
              {t.returnsPolicy?.codDesc ||
                'For orders placed with Cash on Delivery, our support team will guide you on the return process and coordinate refund arrangements directly with you upon confirmation of your request.'}
            </p>
          </div>
        </div>

        {/* Store Terms Configuration Callout (Editable by Admin) */}
        <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-200/80 text-xs text-gray-500 mb-8 sm:mb-10">
          <div className="flex items-start gap-2.5">
            <AlertCircle size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-gray-700 mb-0.5">
                {t.returnsPolicy?.configNotice || 'Official Terms Configuration'}
              </p>
              <p className="leading-relaxed">
                {t.returnsPolicy?.configNoticeDesc ||
                  'Specific terms such as exact return windows, inspection criteria, and processing schedules can be confirmed directly with our support team.'}
              </p>
            </div>
          </div>
        </div>

        {/* Back Link to Shop */}
        <div className="text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors"
          >
            <span>{t.misc?.backToShop || 'Back to Shop'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
