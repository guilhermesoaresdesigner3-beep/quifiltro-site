/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { CONTACT_INFO, TEXTS } from '../data/site';

interface FloatingActionsProps {
  quoteCount: number;
  onOpenDrawer: () => void;
  lang: 'pt' | 'en';
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  quoteCount,
  onOpenDrawer,
  lang,
}) => {
  const t = TEXTS[lang].drawer;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating Quote List Button (when items selected) - Positioned safely above WhatsApp */}
      {quoteCount > 0 && (
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label={`${t.floatingBtn} (${quoteCount})`}
          className="pointer-events-auto group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#00B4F0] to-[#1E7BFF] text-white font-bold text-sm shadow-[0_8px_25px_rgba(0,180,240,0.55)] border border-white/25 hover:brightness-110 active:scale-95 transition-all animate-in slide-in-from-bottom-3 duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00B4F0]"
        >
          <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="whitespace-nowrap">{t.floatingBtn}</span>
          <span className="w-6 h-6 rounded-full bg-white text-[#0A4BB5] font-extrabold text-xs flex items-center justify-center shrink-0">
            {quoteCount}
          </span>
        </button>
      )}

      {/* Floating WhatsApp Action Button */}
      <a
        href={CONTACT_INFO.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp com a Quifiltro"
        title="Falar no WhatsApp"
        className="pointer-events-auto p-3.5 rounded-full bg-[#25D366] hover:bg-[#22c55e] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] active:scale-95 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
};
