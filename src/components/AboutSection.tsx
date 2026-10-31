/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TEXTS } from '../data/site';
import { ShieldCheck, Droplet } from 'lucide-react';

interface AboutSectionProps {
  lang: 'pt' | 'en';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = TEXTS[lang].about;

  return (
    <section
      id="quem-somos"
      aria-label={t.tag}
      className="relative py-16 sm:py-24 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Short Glass Panel with Photo and Text (No Gallery) */}
        <div className="glass-panel p-6 sm:p-10 lg:p-12 border border-[#0A4BB5]/20 dark:border-[#00B4F0]/35 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Photo Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200 dark:border-white/15 shadow-xl">
                <img
                  src="/about/installation.webp"
                  alt={t.altPhoto}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Prose Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0A4BB5] dark:text-[#00B4F0]">
                  {t.tag}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062E73] dark:text-white mt-2">
                  {t.title}
                </h2>
              </div>

              <p className="text-base sm:text-lg text-slate-800 dark:text-[#CFE6FF] leading-relaxed font-medium">
                {t.text}
              </p>

              {/* Key Trust Signals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10">
                  <Droplet className="w-5 h-5 text-[#0A4BB5] dark:text-[#00B4F0] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-[#062E73] dark:text-white">
                      {lang === 'pt' ? 'Água Pura e Segura' : 'Pure & Safe Water'}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      {lang === 'pt' ? 'Certificação e eficiência comprovada' : 'Proven certified efficiency'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10">
                  <ShieldCheck className="w-5 h-5 text-[#0A4BB5] dark:text-[#00B4F0] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-[#062E73] dark:text-white">
                      {lang === 'pt' ? 'Garantia Técnica' : 'Technical Warranty'}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      {lang === 'pt' ? 'Assistência técnica em Angola' : 'Direct technical support'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
