'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      <div className="space-y-3">
        {/* Main Image */}
        <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden group">
          <Image
            src={images[activeIdx]}
            alt={`${productName} - image ${activeIdx + 1}`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={activeIdx === 0}
          />
          {/* Zoom Button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Zoom image"
          >
            <ZoomIn size={16} className="text-gray-600" />
          </button>

          {/* Nav arrows (shown when >1 image) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-xl shadow-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} className="text-gray-700" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-xl shadow-sm"
                aria-label="Next image"
              >
                <ChevronRight size={18} className="text-gray-700" />
              </button>
            </>
          )}

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeIdx ? 'bg-brand-navy w-5' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-150 ${
                  i === activeIdx
                    ? 'border-brand-navy shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={src}
                  alt={`${productName} thumbnail ${i + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] aspect-square" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[activeIdx]}
              alt={`${productName} - full size`}
              fill
              className="object-contain"
              sizes="90vw"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl"
            >
              ✕
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
