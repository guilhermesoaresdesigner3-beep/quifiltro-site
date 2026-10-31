/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StackCarousel } from './StackCarousel';
import { TEXTS, PRODUCTS, ProductItem } from '../data/site';
import { Check, Plus } from 'lucide-react';

interface BestsellersSectionProps {
  lang: 'pt' | 'en';
  isLite: boolean;
  selectedProductIds: string[];
  onToggleProduct: (product: ProductItem) => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({
  lang,
  isLite,
  selectedProductIds,
  onToggleProduct,
}) => {
  const t = TEXTS[lang].bestsellers;
  const pText = TEXTS[lang].products;

  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  return (
    <section
      id="mais-vendidos"
      aria-label={t.tag}
      className="relative py-16 sm:py-24 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0A4BB5] dark:text-[#00B4F0]">
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062E73] dark:text-white">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-[#CFE6FF] leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* 3D Stack Carousel for Featured / Bestseller Products */}
        <StackCarousel<ProductItem>
          items={featuredProducts}
          ariaLabel="Carrossel de produtos mais vendidos"
          isLite={isLite}
          lang={lang}
          itemKey={(p) => p.id}
          renderItem={(product) => {
            const isSelected = selectedProductIds.includes(product.id);

            return (
              <div className="glass-panel h-full p-6 flex flex-col justify-between min-h-[420px] transition-all border border-[#0A4BB5]/20 dark:border-[#00B4F0]/40">
                {/* Image Area with Radial Halo */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center p-4 bg-slate-100/50 dark:bg-white/5">
                  {!isLite && (
                    <div
                      className="absolute inset-4 rounded-full product-halo pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                  <img
                    src={isLite ? product.imageSm : product.image}
                    alt={product.name}
                    width={400}
                    height={360}
                    className="relative z-10 w-full h-full object-contain filter drop-shadow-md"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Info */}
                <div className="mt-4 mb-4 text-center space-y-1">
                  <span className="text-xs font-semibold text-[#0A4BB5] dark:text-[#00B4F0]">
                    {product.categoryLabel[lang]}
                  </span>
                  <h3 className="text-lg font-bold text-[#062E73] dark:text-white truncate">
                    {product.name}
                  </h3>
                </div>

                {/* Quote Button (Filled) */}
                <button
                  type="button"
                  onClick={() => onToggleProduct(product)}
                  aria-pressed={isSelected}
                  className={`btn-primary w-full py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0] ${
                    isSelected
                      ? '!bg-emerald-600 hover:!bg-emerald-500 !text-white shadow-[0_2px_12px_rgba(16,185,129,0.35)]'
                      : ''
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{pText.addedToQuote}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>{pText.addToQuote}</span>
                    </>
                  )}
                </button>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
};
