/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StackCarousel } from './StackCarousel';
import { STATS, PROVINCES, TEXTS, StatItem } from '../data/site';
import { MapPin, CheckCircle, Award } from 'lucide-react';

interface StatsMapSectionProps {
  lang: 'pt' | 'en';
  isLite: boolean;
}

// Counting hook for active cards
function AnimatedNumber({ value, prefix = '', suffix = '', isActive, isLite }: {
  value: number;
  prefix?: string;
  suffix?: string;
  isActive: boolean;
  isLite: boolean;
}) {
  const [displayVal, setDisplayVal] = useState(isLite ? value : 0);

  useEffect(() => {
    if (isLite) {
      setDisplayVal(value);
      return;
    }

    if (!isActive) {
      setDisplayVal(Math.floor(value * 0.7));
      return;
    }

    const duration = 900;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const current = Math.floor(progress === 1 ? value : value * (1 - Math.pow(2, -10 * progress)));
      setDisplayVal(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayVal(value);
      }
    };

    requestAnimationFrame(step);
  }, [value, isActive, isLite]);

  return (
    <span className="tabular-nums font-extrabold tracking-tight">
      {prefix}
      {displayVal.toLocaleString()}
      {suffix}
    </span>
  );
}

export const StatsMapSection: React.FC<StatsMapSectionProps> = ({ lang, isLite }) => {
  const t = TEXTS[lang].stats;

  return (
    <section
      id="estatisticas"
      aria-label={t.tag}
      className="relative py-16 sm:py-24 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0A4BB5] dark:text-[#00B4F0]">
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062E73] dark:text-white">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-[#CFE6FF]">
            {t.subtitle}
          </p>
        </div>

        {/* 3D Stack Carousel with 4 Key Metrics */}
        <StackCarousel<StatItem>
          items={STATS}
          ariaLabel="Estatísticas da Quifiltro"
          isLite={isLite}
          lang={lang}
          itemKey={(item) => item.id}
          renderItem={(stat, isActive) => (
            <div className="glass-panel h-full p-8 sm:p-10 text-center flex flex-col items-center justify-center min-h-[340px] border border-[#0A4BB5]/20 dark:border-[#00B4F0]/40 transition-all duration-300">
              <div className="p-3 rounded-2xl bg-[#0A4BB5]/10 dark:bg-[#00B4F0]/15 text-[#0A4BB5] dark:text-[#00B4F0] mb-5 border border-[#0A4BB5]/20 dark:border-[#00B4F0]/30 shadow-[0_0_15px_rgba(0,180,240,0.25)]">
                <Award className="w-8 h-8" />
              </div>

              {/* Animated Stat Value */}
              <div className="text-5xl sm:text-6xl font-black text-[#062E73] dark:text-white mb-3">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isActive={isActive}
                  isLite={isLite}
                />
              </div>

              {/* Label */}
              <h3 className="text-lg sm:text-xl font-bold text-[#0A4BB5] dark:text-[#00B4F0] mb-2">
                {stat.label[lang]}
              </h3>

              {/* Sublabel */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xs font-medium">
                {stat.sublabel[lang]}
              </p>
            </div>
          )}
        />

        {/* Glass Panel with Angola SVG Map and the 21 Provinces */}
        <div className="glass-panel p-6 sm:p-10 border border-[#0A4BB5]/20 dark:border-[#00B4F0]/30 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A4BB5] dark:text-[#00B4F0]">
                {t.mapTag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#062E73] dark:text-white mt-1">
                {t.mapTitle}
              </h3>
              <p className="text-sm text-slate-700 dark:text-[#CFE6FF] mt-1.5 max-w-xl font-medium">
                {t.mapSubtitle}
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-[#0A4BB5]/10 dark:bg-[#00B4F0]/15 border border-[#0A4BB5]/20 dark:border-[#00B4F0]/40 text-[#0A4BB5] dark:text-[#00B4F0] font-bold text-sm flex items-center gap-2 shrink-0">
              <MapPin className="w-4 h-4" />
              <span>{t.provincesBadge}</span>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full max-w-3xl mx-auto aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center p-2">
            <img
              src="/src/assets/angola-21.svg"
              alt="Mapa de Angola com as 21 províncias atendidas pela Quifiltro"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_30px_rgba(0,180,240,0.25)]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* 21 Provinces Chips */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3 text-center sm:text-left">
              {lang === 'pt' ? 'Províncias com cobertura logística e técnica' : 'Provinces with logistics & technical coverage'}
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {PROVINCES.map((prov) => (
                <div
                  key={prov}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-xs font-semibold text-[#062E73] dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#0A4BB5] dark:text-[#00B4F0]" />
                  <span>{prov}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
