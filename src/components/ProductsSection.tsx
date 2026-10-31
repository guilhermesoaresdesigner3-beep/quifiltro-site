/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TEXTS, CATEGORIES, PRODUCTS, ProductItem } from '../data/site';
import { Check, Plus } from 'lucide-react';

interface ProductsSectionProps {
  lang: 'pt' | 'en';
  isLite: boolean;
  selectedProductIds: string[];
  onToggleProduct: (product: ProductItem) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  lang,
  isLite,
  selectedProductIds,
  onToggleProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const t = TEXTS[lang].products;

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'todos') return true;
    return p.category === activeCategory;
  });

  return (
    <section
      id="produtos"
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

        {/* Category Filters (Clean segmented button controls) */}
        <div className="flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl glass-panel max-w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00B4F0] to-[#1E7BFF] text-white shadow-[0_2px_12px_rgba(0,180,240,0.45)]'
                      : 'text-[#062E73] dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/10'
                  }`}
                >
                  {cat.label[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isSelected = selectedProductIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="glass-panel p-5 flex flex-col justify-between group hover:border-[#00B4F0]/60 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,180,240,0.2)]"
              >
                {/* Product Image Area with Light Radial Glow */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center p-4 bg-slate-100/50 dark:bg-white/5">
                  {!isLite && (
                    <div
                      className="absolute inset-2 rounded-full product-halo pointer-events-none"
                      aria-hidden="true"
                    />
                  )}

                  <img
                    src={isLite ? product.imageSm : product.image}
                    alt={product.name}
                    width={400}
                    height={360}
                    className="relative z-10 w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Product Information */}
                <div className="mt-4 mb-5 space-y-1">
                  <p className="text-xs font-semibold text-[#0A4BB5] dark:text-[#00B4F0]">
                    {product.categoryLabel[lang]}
                  </p>
                  <h3 className="text-base sm:text-lg font-bold text-[#062E73] dark:text-white">
                    {product.name}
                  </h3>
                </div>

                {/* Toggle Quote Action Button (Filled) */}
                <button
                  type="button"
                  onClick={() => onToggleProduct(product)}
                  aria-pressed={isSelected}
                  className={`btn-primary w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0] ${
                    isSelected
                      ? '!bg-emerald-600 hover:!bg-emerald-500 !text-white shadow-[0_2px_12px_rgba(16,185,129,0.35)]'
                      : ''
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.addedToQuote}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>{t.addToQuote}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
