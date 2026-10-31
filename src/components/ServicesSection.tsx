/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StackCarousel } from './StackCarousel';
import { TEXTS, SERVICES, ServiceItem } from '../data/site';
import { ShoppingCart, Wrench, ShieldCheck, HelpCircle } from 'lucide-react';

interface ServicesSectionProps {
  lang: 'pt' | 'en';
  isLite: boolean;
}

const iconMap = {
  ShoppingCart,
  Wrench,
  ShieldCheck,
  HelpCircle,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, isLite }) => {
  const t = TEXTS[lang].services;

  return (
    <section
      id="servicos"
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

        {/* 3D Stack Carousel with 4 Core Services */}
        <StackCarousel<ServiceItem>
          items={SERVICES}
          ariaLabel="Carrossel de serviços Quifiltro"
          isLite={isLite}
          lang={lang}
          itemKey={(s) => s.id}
          renderItem={(service) => {
            const Icon = iconMap[service.iconName];

            return (
              <div className="glass-panel h-full p-8 sm:p-10 flex flex-col items-center text-center justify-center min-h-[360px] border border-[#0A4BB5]/20 dark:border-[#00B4F0]/40 transition-all duration-300">
                {/* Icon Box with high contrast */}
                <div className="p-4 rounded-2xl bg-[#0A4BB5]/10 dark:bg-[#00B4F0]/15 text-[#0A4BB5] dark:text-[#00B4F0] border border-[#0A4BB5]/20 dark:border-[#00B4F0]/30 shadow-[0_0_20px_rgba(0,180,240,0.3)] mb-6">
                  <Icon className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-bold text-[#062E73] dark:text-white mb-3">
                  {service.title[lang]}
                </h3>

                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed max-w-xs font-medium">
                  {service.description[lang]}
                </p>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
};
