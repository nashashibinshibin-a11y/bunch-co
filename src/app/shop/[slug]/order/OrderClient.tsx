'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  getProductBySlug,
  getLocalizedProduct,
  KERALA_DISTRICTS,
  INDIAN_STATES,
  INDIAN_UNION_TERRITORIES,
  generateWhatsAppOrderLink,
  OrderFormData,
} from '@/data/products';
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  AlertCircle,
  ChevronDown,
  Search,
  Check,
  X,
  MapPin,
} from 'lucide-react';

interface Props {
  slug: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
  district?: string;
  state?: string;
  pincode?: string;
  general?: string;
}

export default function OrderClient({ slug }: Props) {
  const { t, language } = useLanguage();
  const rawProduct = getProductBySlug(slug);

  if (!rawProduct) {
    notFound();
  }

  const product = getLocalizedProduct(rawProduct, language);
  const localizedCategory = t.categories?.[product.category] || product.category;

  // Form State — NEVER persisted to localStorage or logged to console (Strict Privacy)
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('Ernakulam');
  const [customDistrict, setCustomDistrict] = useState('');
  const [selectedState, setSelectedState] = useState<string>('Kerala');
  const [pincode, setPincode] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlTooLongWarning, setUrlTooLongWarning] = useState(false);

  // State Searchable Dropdown state
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [stateSearchQuery, setStateSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setStateDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (stateDropdownOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setStateSearchQuery('');
    }
  }, [stateDropdownOpen]);

  // Derived values
  const totalAmount = product.price * quantity;
  const isKerala = selectedState === 'Kerala';
  const effectiveDistrict = isKerala
    ? district === 'Other (Outside Kerala)'
      ? customDistrict.trim()
      : district
    : district.trim();

  // Filtered states and UTs based on search query
  const query = stateSearchQuery.trim().toLowerCase();
  const filteredStates = INDIAN_STATES.filter((s) =>
    s.toLowerCase().includes(query)
  );
  const filteredUTs = INDIAN_UNION_TERRITORIES.filter((u) =>
    u.toLowerCase().includes(query)
  );
  const totalMatches = filteredStates.length + filteredUTs.length;

  // Quantity handlers
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 50) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= 50) {
      setQuantity(val);
    } else if (e.target.value === '') {
      setQuantity(1);
    }
  };

  // State selection handler
  const handleSelectState = (stateName: string) => {
    setSelectedState(stateName);
    setStateDropdownOpen(false);
    if (errors.state) {
      setErrors((prev) => ({ ...prev, state: undefined }));
    }
    // If switching to a non-Kerala state, set district placeholder / clear if it was Kerala district
    if (stateName !== 'Kerala') {
      if (KERALA_DISTRICTS.includes(district as (typeof KERALA_DISTRICTS)[number])) {
        setDistrict('');
      }
    } else {
      setDistrict('Ernakulam');
    }
  };

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full Name
    if (!fullName.trim()) {
      newErrors.fullName = t.orderForm.errors.nameRequired;
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = t.orderForm.errors.nameMin;
    }

    // 2. Contact Number (Valid 10-digit Indian Mobile Number)
    const cleanedPhone = phone.replace(/^(\+91|0)/, '').replace(/[\s-]/g, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!cleanedPhone) {
      newErrors.phone = t.orderForm.errors.phoneInvalid;
    } else if (!phoneRegex.test(cleanedPhone)) {
      newErrors.phone = t.orderForm.errors.phoneInvalid;
    }

    // 3. Complete Delivery Address
    if (!address.trim()) {
      newErrors.address = t.orderForm.errors.addressRequired;
    } else if (address.trim().length < 8) {
      newErrors.address = t.orderForm.errors.addressMin;
    }

    // 4. District
    if (!effectiveDistrict) {
      newErrors.district = t.orderForm.errors.districtRequired;
    }

    // 5. State / Union Territory (Mandatory)
    if (!selectedState.trim()) {
      newErrors.state = t.orderForm.errors.stateRequired;
    }

    // 6. PIN Code (Exactly 6 digits)
    const cleanedPincode = pincode.replace(/\s/g, '');
    const pincodeRegex = /^\d{6}$/;
    if (!cleanedPincode) {
      newErrors.pincode = t.orderForm.errors.pincodeInvalid;
    } else if (!pincodeRegex.test(cleanedPincode)) {
      newErrors.pincode = t.orderForm.errors.pincodeInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission -> Generates WhatsApp Click-to-Chat URL in selected language
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUrlTooLongWarning(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const cleanedPhone = phone.replace(/^(\+91|0)/, '').replace(/[\s-]/g, '');
    const cleanedPincode = pincode.replace(/\s/g, '');

    const formData: OrderFormData = {
      fullName: fullName.trim(),
      phone: cleanedPhone,
      address: address.trim(),
      district: effectiveDistrict,
      state: selectedState.trim(),
      pincode: cleanedPincode,
      quantity,
    };

    // Generates message in active language (en, ml, or hi)
    const { url, isTooLong } = generateWhatsAppOrderLink(rawProduct, formData, language);

    if (isTooLong) {
      setUrlTooLongWarning(true);
      setIsSubmitting(false);
      return;
    }

    // Open WhatsApp in a new window/tab. Customer will manually press Send.
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={`/shop/${product.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-orange transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{t.orderForm.backToProduct}</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={14} className="text-green-600" />
            <span>Direct WhatsApp Order</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy mb-2">
            {t.orderForm.title}
          </h1>
          <p className="text-sm text-gray-600">
            {t.orderForm.subtitle}
          </p>
        </div>

        {/* Form & Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Customer Information Form (Desktop 7 cols)        */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 shadow-card border border-gray-100">
            <div className="flex items-center justify-between pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-gray-100">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {t.orderForm.customerInfo}
              </h2>
              <span className="text-[11px] sm:text-xs text-brand-orange font-semibold uppercase tracking-wider">
                {t.orderForm.requiredNotice}
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
                >
                  {t.orderForm.fullName}{' '}
                  <span className="text-brand-orange">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }
                  }}
                  placeholder={t.orderForm.fullNamePlaceholder}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-gray-200 focus:border-brand-navy focus:ring-blue-100'
                  }`}
                  autoComplete="name"
                  required
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
                >
                  {t.orderForm.phone}{' '}
                  <span className="text-brand-orange">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) {
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                      }
                    }}
                    placeholder={t.orderForm.phonePlaceholder}
                    maxLength={13}
                    className={`w-full pl-14 pr-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-200 focus:border-brand-navy focus:ring-blue-100'
                    }`}
                    autoComplete="tel"
                    required
                  />
                </div>
                {errors.phone ? (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.phone}
                  </p>
                ) : (
                  <p className="mt-1.5 text-[11px] text-gray-400 leading-normal">
                    {t.orderForm.phoneHelper}
                  </p>
                )}
              </div>

              {/* Complete Delivery Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
                >
                  {t.orderForm.address}{' '}
                  <span className="text-brand-orange">*</span>
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) {
                      setErrors((prev) => ({ ...prev, address: undefined }));
                    }
                  }}
                  placeholder={t.orderForm.addressPlaceholder}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.address
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-gray-200 focus:border-brand-navy focus:ring-blue-100'
                  }`}
                  autoComplete="street-address"
                  required
                />
                {errors.address && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.address}
                  </p>
                )}
              </div>

              {/* ============================================================ */}
              {/* Delivery Details: District, State / UT, PIN Code             */}
              {/* (Order: District -> State / UT -> PIN Code)                 */}
              {/* ============================================================ */}
              <div className="space-y-4">
                {/* 1. District */}
                <div>
                  <label
                    htmlFor="district"
                    className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
                  >
                    {t.orderForm.district}{' '}
                    <span className="text-brand-orange">*</span>
                  </label>
                  {isKerala ? (
                    <>
                      <select
                        id="district"
                        value={district}
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          if (errors.district) {
                            setErrors((prev) => ({ ...prev, district: undefined }));
                          }
                        }}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.district
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-gray-200 focus:border-brand-navy focus:ring-blue-100'
                        }`}
                        required
                      >
                        {KERALA_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>

                      {district === 'Other (Outside Kerala)' && (
                        <input
                          type="text"
                          value={customDistrict}
                          onChange={(e) => {
                            setCustomDistrict(e.target.value);
                            if (errors.district) {
                              setErrors((prev) => ({ ...prev, district: undefined }));
                            }
                          }}
                          placeholder={t.orderForm.customDistrictPlaceholder}
                          className="mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-brand-navy"
                          required
                        />
                      )}
                    </>
                  ) : (
                    <input
                      id="district"
                      type="text"
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        if (errors.district) {
                          setErrors((prev) => ({ ...prev, district: undefined }));
                        }
                      }}
                      placeholder={t.orderForm.districtPlaceholder}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.district
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-gray-200 focus:border-brand-navy focus:ring-blue-100'
                      }`}
                      required
                    />
                  )}

                  {errors.district && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.district}
                    </p>
                  )}
                </div>

                {/* 2. State / Union Territory — Searchable Dropdown (Placed between District & PIN Code) */}
                <div className="relative" ref={dropdownRef}>
                  <label
                    htmlFor="state-selector"
                    className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
                  >
                    {t.orderForm.state}{' '}
                    <span className="text-brand-orange">*</span>
                  </label>

                  {/* Dropdown Trigger Button */}
                  <button
                    id="state-selector"
                    type="button"
                    onClick={() => setStateDropdownOpen((prev) => !prev)}
                    className={`w-full px-4 py-3 rounded-xl border text-left text-sm flex items-center justify-between transition-all ${
                      errors.state
                        ? 'border-red-400 bg-red-50/30'
                        : stateDropdownOpen
                        ? 'border-brand-navy ring-2 ring-blue-100 bg-white'
                        : 'border-gray-200 bg-gray-50/50 hover:bg-white'
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={stateDropdownOpen}
                  >
                    <span
                      className={`flex items-center gap-2 ${
                        selectedState ? 'text-gray-900 font-semibold' : 'text-gray-400'
                      }`}
                    >
                      <MapPin size={15} className="text-brand-orange flex-shrink-0" />
                      {selectedState || t.orderForm.statePlaceholder}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform duration-200 ${
                        stateDropdownOpen ? 'rotate-180 text-brand-navy' : ''
                      }`}
                    />
                  </button>

                  {errors.state && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.state}
                    </p>
                  )}

                  {/* Searchable Dropdown Popover */}
                  {stateDropdownOpen && (
                    <div className="absolute z-40 left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in">
                      {/* Search Input Bar */}
                      <div className="p-3 border-b border-gray-100 bg-gray-50/70">
                        <div className="relative">
                          <Search
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            ref={searchInputRef}
                            type="text"
                            value={stateSearchQuery}
                            onChange={(e) => setStateSearchQuery(e.target.value)}
                            placeholder={t.orderForm.searchPlaceholder}
                            className="w-full pl-10 pr-9 py-2 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                          />
                          {stateSearchQuery && (
                            <button
                              type="button"
                              onClick={() => setStateSearchQuery('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              aria-label="Clear search"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* States and UTs List */}
                      <div className="max-h-60 overflow-y-auto divide-y divide-gray-50 py-1">
                        {totalMatches === 0 ? (
                          <div className="py-6 text-center text-xs text-gray-400 px-4">
                            {t.orderForm.noMatches} &ldquo;{stateSearchQuery}&rdquo;
                          </div>
                        ) : (
                          <>
                            {/* States Section */}
                            {filteredStates.length > 0 && (
                              <div>
                                <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/80 sticky top-0">
                                  {t.orderForm.statesHeader} ({filteredStates.length})
                                </div>
                                {filteredStates.map((s) => {
                                  const isSelected = selectedState === s;
                                  return (
                                    <button
                                      key={s}
                                      type="button"
                                      onClick={() => handleSelectState(s)}
                                      className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                                        isSelected
                                          ? 'bg-blue-50 text-brand-navy font-bold'
                                          : 'text-gray-700 hover:bg-gray-50'
                                      }`}
                                    >
                                      <span>{s}</span>
                                      {isSelected && (
                                        <Check size={15} className="text-brand-orange" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {/* Union Territories Section */}
                            {filteredUTs.length > 0 && (
                              <div>
                                <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/80 sticky top-0">
                                  {t.orderForm.utsHeader} ({filteredUTs.length})
                                </div>
                                {filteredUTs.map((ut) => {
                                  const isSelected = selectedState === ut;
                                  return (
                                    <button
                                      key={ut}
                                      type="button"
                                      onClick={() => handleSelectState(ut)}
                                      className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                                        isSelected
                                          ? 'bg-blue-50 text-brand-navy font-bold'
                                          : 'text-gray-700 hover:bg-gray-50'
                                      }`}
                                    >
                                      <span>{ut}</span>
                                      {isSelected && (
                                        <Check size={15} className="text-brand-orange" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. PIN Code */}
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
                  >
                    {t.orderForm.pincode}{' '}
                    <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setPincode(val);
                      if (errors.pincode) {
                        setErrors((prev) => ({ ...prev, pincode: undefined }));
                      }
                    }}
                    placeholder={t.orderForm.pincodePlaceholder}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.pincode
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-200 focus:border-brand-navy focus:ring-blue-100'
                    }`}
                    autoComplete="postal-code"
                    required
                  />
                  {errors.pincode && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              {/* URL Too Long Warning Alert */}
              {urlTooLongWarning && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-0.5">Message Length Warning</p>
                    <p>{t.orderForm.tooLongWarning}</p>
                  </div>
                </div>
              )}

              {/* Privacy Note */}
              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-brand-cream border border-orange-100/60 text-xs text-gray-600 flex items-start gap-2.5">
                  <ShieldCheck size={18} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {t.orderForm.privacyNote}
                  </p>
                </div>
              </div>

              {/* Submit Button for Mobile View */}
              <div className="lg:hidden pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-md text-base"
                >
                  <MessageCircle size={20} />
                  <span>
                    {t.orderForm.continueToWhatsApp}
                  </span>
                </button>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                  {t.orderForm.totalAmount}: ₹{totalAmount} ({quantity}{' '}
                  {product.packSize && product.packSize > 1
                    ? `${quantity === 1 ? 'pack' : 'packs'} • ${quantity * product.packSize} filter bags`
                    : quantity === 1
                    ? 'unit'
                    : 'units'}
                  )
                </p>
              </div>
            </form>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Order Summary (Desktop 5 cols, Sticky)          */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-gray-100">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 pb-3 sm:pb-4 mb-4 sm:mb-5 border-b border-gray-100">
                {t.orderForm.orderSummary}
              </h2>

              {/* Selected Product Card */}
              <div className="flex gap-4 items-center pb-4 sm:pb-5 border-b border-gray-100">
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                    {product.brand}
                  </p>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {localizedCategory}
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    {t.orderForm.quantity}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    ₹{product.price}{' '}
                    {product.packSize && product.packSize > 1
                      ? language === 'ml'
                        ? `/ പായ്ക്ക് (${product.packSize} ഫിൽട്ടർ ബാഗുകൾ)`
                        : language === 'hi'
                        ? `/ पैक (${product.packSize} फ़िल्टर बैग)`
                        : `/ pack (${product.packSize} filter bags)`
                      : language === 'ml'
                      ? '/ എണ്ണം'
                      : language === 'hi'
                      ? '/ इकाई'
                      : '/ unit'}
                  </p>
                  {product.packSize && product.packSize > 1 && (
                    <p className="text-[10px] text-brand-orange font-semibold mt-1">
                      {quantity}{' '}
                      {quantity === 1
                        ? language === 'ml'
                          ? 'പായ്ക്ക്'
                          : language === 'hi'
                          ? 'पैक'
                          : 'pack'
                        : language === 'ml'
                        ? 'പായ്ക്കുകൾ'
                        : language === 'hi'
                        ? 'पैक'
                        : 'packs'}{' '}
                      ={' '}
                      <strong className="text-brand-navy">
                        {quantity * product.packSize}{' '}
                        {language === 'ml'
                          ? 'ഫിൽട്ടർ ബാഗുകൾ'
                          : language === 'hi'
                          ? 'फ़िल्टर बैग'
                          : 'filter bags'}
                      </strong>
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 border border-gray-200 rounded-xl px-2 py-1 bg-gray-50/50">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-8 sm:w-10 text-center font-bold text-sm bg-transparent text-gray-900 focus:outline-none"
                    aria-label="Quantity"
                  />
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={quantity >= 50}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Price Calculations */}
              <div className="py-4 border-b border-gray-100 space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{t.orderForm.unitPrice}</span>
                  <span className="font-semibold text-gray-900">₹{product.price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t.orderForm.quantity}</span>
                  <span className="font-semibold text-gray-900">
                    × {quantity}{' '}
                    {product.packSize && product.packSize > 1
                      ? quantity === 1
                        ? language === 'ml'
                          ? 'പായ്ക്ക്'
                          : language === 'hi'
                          ? 'पैक'
                          : 'pack'
                        : language === 'ml'
                        ? 'പായ്ക്കുകൾ'
                        : language === 'hi'
                        ? 'पैक'
                        : 'packs'
                      : quantity === 1
                      ? language === 'ml'
                        ? 'എണ്ണം'
                        : language === 'hi'
                        ? 'इकाई'
                        : 'unit'
                      : language === 'ml'
                      ? 'എണ്ണം'
                      : language === 'hi'
                      ? 'इकाइयाँ'
                      : 'units'}
                  </span>
                </div>
                {product.packSize && product.packSize > 1 && (
                  <div className="flex justify-between text-xs text-brand-navy bg-blue-50/70 px-3 py-1.5 rounded-lg font-medium">
                    <span>
                      {language === 'ml'
                        ? 'ആകെ ഫിൽട്ടർ ബാഗുകൾ:'
                        : language === 'hi'
                        ? 'कुल फ़िल्टर बैग:'
                        : 'Total Filter Bags:'}
                    </span>
                    <span className="font-bold">
                      {quantity * product.packSize}{' '}
                      {language === 'ml'
                        ? 'ഫിൽട്ടർ ബാഗുകൾ'
                        : language === 'hi'
                        ? 'फ़िल्टर बैग'
                        : 'filter bags'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>{t.orderForm.deliveryDestination}</span>
                  <span className="text-xs font-semibold text-brand-navy bg-blue-50 px-2 py-0.5 rounded-full max-w-[150px] truncate">
                    {selectedState}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t.orderForm.deliveryCharges}</span>
                  <span className="text-xs font-semibold text-brand-orange bg-orange-50 px-2 py-0.5 rounded-full">
                    {t.orderForm.confirmedOnWhatsApp}
                  </span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-4 pb-5 sm:pb-6 flex items-baseline justify-between">
                <div>
                  <span className="text-base font-bold text-gray-900 block">
                    {t.orderForm.totalAmount}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {t.orderForm.subtotalNote}
                  </span>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-brand-navy">
                  ₹{totalAmount}
                </span>
              </div>

              {/* Desktop Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="hidden lg:flex w-full items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-md text-base group"
              >
                <MessageCircle size={20} className="transition-transform group-hover:scale-110" />
                <span>
                  {t.orderForm.continueToWhatsApp}
                </span>
              </button>

              {/* Disclaimer */}
              <p className="mt-4 text-[11px] text-gray-400 leading-relaxed text-center">
                {t.orderForm.disclaimer}
              </p>
            </div>

            {/* Delivery Transparency Card */}
            <div className="bg-blue-50/70 border border-blue-100 rounded-3xl p-5 text-xs text-gray-700 flex items-start gap-3">
              <Truck size={18} className="text-brand-navy flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-brand-navy mb-1">
                  {t.orderForm.coverageTitle}
                </h4>
                <p className="leading-relaxed text-gray-600 text-[11px]">
                  {t.orderForm.coverageText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
