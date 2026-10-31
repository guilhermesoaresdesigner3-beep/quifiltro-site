/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TEXTS, CONTACT_INFO } from '../data/site';
import { MessageCircle, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

interface ContactsSectionProps {
  lang: 'pt' | 'en';
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({ lang }) => {
  const t = TEXTS[lang].contacts;

  return (
    <section
      id="contactos"
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

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* WhatsApp Card (Primary, Highlighted) */}
          <div className="glass-panel p-6 sm:p-8 flex flex-col justify-between border-2 border-[#00B4F0] shadow-[0_0_30px_rgba(0,180,240,0.3)] relative overflow-hidden group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#062E73] dark:text-white">
                  {t.whatsappTitle}
                </h3>
                <p className="text-xl font-extrabold text-[#0A4BB5] dark:text-[#00B4F0] mt-1 tabular-nums">
                  {CONTACT_INFO.whatsappDisplay}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {lang === 'pt' ? 'Resposta rápida a qualquer hora' : 'Fast response for inquiries'}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={CONTACT_INFO.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00B4F0] to-[#1E7BFF] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,180,240,0.45)] hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t.whatsappBtn}</span>
              </a>
            </div>
          </div>

          {/* Calls & Email Card */}
          <div className="glass-panel p-6 sm:p-8 flex flex-col justify-between border border-[#0A4BB5]/20 dark:border-[#00B4F0]/30 space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A4BB5]/10 dark:bg-[#00B4F0]/15 text-[#0A4BB5] dark:text-[#00B4F0] border border-[#0A4BB5]/20 dark:border-[#00B4F0]/30 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#062E73] dark:text-white">
                  {t.phoneTitle}
                </h3>
                <a
                  href={`tel:${CONTACT_INFO.callsRaw}`}
                  className="text-lg font-extrabold text-[#0A4BB5] dark:text-[#00B4F0] hover:underline block mt-1 tabular-nums"
                >
                  {CONTACT_INFO.callsDisplay}
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 text-[#0A4BB5] dark:text-[#00B4F0]" />
                <span>{t.emailTitle}</span>
              </div>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-sm font-semibold text-[#062E73] dark:text-white hover:text-[#00B4F0] transition-colors break-all"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

            <div>
              <a
                href={`tel:${CONTACT_INFO.callsRaw}`}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00B4F0] to-[#1E7BFF] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,180,240,0.45)] hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>{t.phoneBtn}</span>
              </a>
            </div>
          </div>

          {/* Location & Hours Card */}
          <div className="glass-panel p-6 sm:p-8 flex flex-col justify-between border border-[#0A4BB5]/20 dark:border-[#00B4F0]/30 space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A4BB5]/10 dark:bg-[#00B4F0]/15 text-[#0A4BB5] dark:text-[#00B4F0] border border-[#0A4BB5]/20 dark:border-[#00B4F0]/30 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#062E73] dark:text-white">
                  {t.locationTitle}
                </h3>
                <p className="text-base font-bold text-[#0A4BB5] dark:text-[#00B4F0] mt-1">
                  {CONTACT_INFO.locationDisplay}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {t.visitText}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Clock className="w-4 h-4 text-[#0A4BB5] dark:text-[#00B4F0]" />
                <span>{t.hoursTitle}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                {CONTACT_INFO.hours[lang]}
              </p>
            </div>

            <div>
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00B4F0] to-[#1E7BFF] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,180,240,0.45)] hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.directionsBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
