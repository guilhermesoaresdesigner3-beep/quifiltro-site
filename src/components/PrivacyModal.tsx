/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { TEXTS } from '../data/site';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'pt' | 'en';
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, lang }) => {
  const t = TEXTS[lang].privacyModal;

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto glass-panel p-6 sm:p-8 border border-[#0A4BB5]/30 dark:border-[#00B4F0]/40 shadow-[0_20px_50px_rgba(2,11,36,0.8)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0A4BB5]/10 dark:bg-[#00B4F0]/15 text-[#0A4BB5] dark:text-[#00B4F0] border border-[#0A4BB5]/20 dark:border-[#00B4F0]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 id="privacy-modal-title" className="text-xl sm:text-2xl font-bold text-[#062E73] dark:text-white">
              {t.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="p-2 rounded-lg text-slate-600 dark:text-white/70 hover:text-[#062E73] dark:hover:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content sections */}
        <div className="mt-6 space-y-6 text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
          <div>
            <h3 className="text-base font-semibold text-[#0A4BB5] dark:text-[#00B4F0] mb-1.5">{t.whoWeAreTitle}</h3>
            <p>{t.whoWeAreText}</p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#0A4BB5] dark:text-[#00B4F0] mb-1.5">{t.dataCollectedTitle}</h3>
            <p>{t.dataCollectedText}</p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#0A4BB5] dark:text-[#00B4F0] mb-1.5">{t.purposeTitle}</h3>
            <p>{t.purposeText}</p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#0A4BB5] dark:text-[#00B4F0] mb-1.5">{t.sharingTitle}</h3>
            <p>{t.sharingText}</p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#0A4BB5] dark:text-[#00B4F0] mb-1.5">{t.rightsTitle}</h3>
            <p>{t.rightsText}</p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#0A4BB5] dark:text-[#00B4F0] mb-1.5">{t.cookiesTitle}</h3>
            <p>{t.cookiesText}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-primary px-6 py-2.5 text-sm font-semibold rounded-xl"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
