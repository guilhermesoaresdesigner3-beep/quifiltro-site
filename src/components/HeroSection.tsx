/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { TEXTS, CONTACT_INFO } from '../data/site';

interface HeroSectionProps {
  lang: 'pt' | 'en';
  isDark: boolean;
  isLite: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, isDark, isLite }) => {
  const t = TEXTS[lang].hero;

  return (
    <section
      id="inicio"
      aria-label={t.tag}
      className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 flex items-center justify-center px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0A4BB5] dark:text-[#00B4F0]">
              {t.tag}
            </span>
          </div>

          {/* H1 Headline with Shimmer Gradient (and solid fallback) */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#062E73] dark:text-white">
            <span
              className={
                isLite
                  ? 'block text-[#062E73] dark:text-white'
                  : 'block shimmer-text bg-gradient-to-r from-[#062E73] via-[#0A4BB5] to-[#00B4F0] dark:from-white dark:via-[#00B4F0] dark:to-[#1E7BFF]'
              }
            >
              {t.titleLine1}
            </span>
            <span
              className={
                isLite
                  ? 'block text-[#0A4BB5] dark:text-[#00B4F0]'
                  : 'block shimmer-text bg-gradient-to-r from-[#0A4BB5] via-[#00B4F0] to-[#062E73] dark:from-[#00B4F0] dark:via-[#1E7BFF] dark:to-white'
              }
            >
              {t.titleLine2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl font-semibold text-[#0A4BB5] dark:text-[#00B4F0]">
            {t.subtitle}
          </p>

          {/* Description Prose */}
          <p className="text-base sm:text-lg text-slate-800 dark:text-[#CFE6FF] max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {t.text}
          </p>

          {/* Action Buttons: Both filled with gradient */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {/* Primary CTA (scrolls to #produtos) */}
            <a
              href="#produtos"
              className="btn-primary w-full sm:w-auto px-7 py-3.5 flex items-center justify-center gap-2 text-base font-bold shadow-[0_4px_24px_rgba(0,180,240,0.45)]"
            >
              <span>{t.ctaQuote}</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            {/* WhatsApp CTA (Filled like Conversar no WhatsApp) */}
            <a
              href={CONTACT_INFO.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto px-7 py-3.5 flex items-center justify-center gap-2 text-base font-bold shadow-[0_4px_24px_rgba(0,180,240,0.45)]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{t.ctaWhatsApp}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Hero Product Image inside Luminous Orbit Ring with Radial Glow */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            {/* Radial glow backdrop behind product */}
            {!isLite && (
              <div
                className="absolute inset-4 rounded-full product-halo blur-xl pointer-events-none"
                aria-hidden="true"
              />
            )}

            {/* Luminous Elliptical Orbit Ring */}
            {!isLite && <div className="orbit-ring" aria-hidden="true" />}

            {/* Hero Product Image */}
            <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center p-4">
              <img
                src={isLite ? '/products/sm/wf30-3-copos.webp' : '/products/wf30-3-copos.webp'}
                alt={t.altHeroImage}
                width={500}
                height={450}
                className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(0,180,240,0.35)] transition-transform duration-500 hover:scale-105"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
