/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  TEXTS,
  PROVINCES,
  FORM_ENDPOINT,
  CONTACT_INFO,
  ProductItem,
  Province,
  ClientType,
} from '../data/site';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: ProductItem[];
  onRemoveProduct: (productId: string) => void;
  onClearProducts: () => void;
  lang: 'pt' | 'en';
  onOpenPrivacy: () => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  selectedProducts,
  onRemoveProduct,
  onClearProducts,
  lang,
  onOpenPrivacy,
}) => {
  const t = TEXTS[lang].drawer;
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState<Province | ''>('Luanda');
  const [clientType, setClientType] = useState<ClientType>('casa');
  const [message, setMessage] = useState('');

  // Validation & status
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Trap focus and handle Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = t.validationErrors.name;
    }

    if (!phone.trim() || phone.trim().length < 6) {
      newErrors.phone = t.validationErrors.phone;
    }

    if (!province) {
      newErrors.province = t.validationErrors.province;
    }

    if (!clientType) {
      newErrors.clientType = t.validationErrors.clientType;
    }

    if (selectedProducts.length === 0) {
      newErrors.products = t.validationErrors.emptyProducts;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const clientTypeDisplay =
      clientType === 'casa' ? 'Casa' : clientType === 'empresa' ? 'Empresa' : 'Indústria';

    const productsListText = selectedProducts
      .map((p) => `- ${p.name} (${p.categoryLabel.pt})`)
      .join('\n');

    let waMessage = `Olá, Quifiltro! Gostaria de um orçamento.\n`;
    waMessage += `Nome: ${name.trim()}\n`;
    waMessage += `Telefone: ${phone.trim()}\n`;
    waMessage += `Província: ${province}\n`;
    waMessage += `Tipo de cliente: ${clientTypeDisplay}\n`;
    waMessage += `Produtos:\n${productsListText}\n`;
    if (message.trim()) {
      waMessage += `Mensagem: ${message.trim()}\n`;
    }

    const waUrl = `https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(waMessage)}`;

    // Open WhatsApp in direct user event to prevent popup blocker
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // If FORM_ENDPOINT is set, send data by POST JSON
    const endpoint: string = FORM_ENDPOINT;
    if (endpoint && endpoint.trim().length > 0) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            province,
            clientType,
            products: selectedProducts.map((p) => p.name),
            message: message.trim(),
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn('Form endpoint post failed, proceed with WhatsApp quote:', err);
      }
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Slide-over panel */}
      <div
        ref={drawerRef}
        className="drawer-panel absolute inset-y-0 right-0 max-w-full w-full sm:w-[480px] bg-white dark:bg-[#04122E]/95 backdrop-blur-2xl border-l border-slate-200 dark:border-[#00B4F0]/30 shadow-2xl flex flex-col z-10"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 id="drawer-title" className="text-xl font-bold text-[#062E73] dark:text-white">
              {t.title}
            </h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#00B4F0] text-white">
              {selectedProducts.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar gaveta de orçamento"
            className="p-2 rounded-lg text-slate-500 dark:text-white/70 hover:text-[#062E73] dark:hover:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Success State */}
          {isSubmitted ? (
            <div className="py-12 px-4 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#062E73] dark:text-white">
                {t.successTitle}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t.successMessage}
              </p>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="btn-primary w-full py-3 text-sm font-semibold rounded-xl"
                >
                  Concluir e fechar
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Selected Products List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A4BB5] dark:text-[#00B4F0]">
                    {t.selectedProducts}
                  </h3>
                  {selectedProducts.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearProducts}
                      className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Limpar lista</span>
                    </button>
                  )}
                </div>

                {selectedProducts.length === 0 ? (
                  <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-white/15 text-center bg-slate-50 dark:bg-transparent">
                    <p className="text-sm font-semibold text-[#062E73] dark:text-white/80">
                      {t.emptyTitle}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.emptyText}</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {selectedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[#00B4F0]/40 transition-colors"
                      >
                        <img
                          src={prod.imageSm || prod.image}
                          alt={prod.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain rounded-lg bg-white p-1 border border-slate-200 dark:border-transparent shrink-0"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#062E73] dark:text-white truncate">
                            {prod.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {prod.categoryLabel[lang]}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveProduct(prod.id)}
                          aria-label={`${t.remove} ${prod.name}`}
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-500/10 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {errors.products && (
                  <p className="text-xs text-rose-500 dark:text-rose-400 mt-2 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.products}</span>
                  </p>
                )}
              </div>

              {/* Client Info Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A4BB5] dark:text-[#00B4F0]">
                  {t.formTitle}
                </h3>

                {/* Name Field */}
                <div>
                  <label htmlFor="quote-name" className="block text-xs font-semibold text-[#062E73] dark:text-slate-200 mb-1">
                    {t.nameLabel}
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder={t.namePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-[#062E73] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00B4F0] text-sm"
                  />
                  {errors.name && <p className="text-xs text-rose-500 dark:text-rose-400 mt-1 font-semibold">{errors.name}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="quote-phone" className="block text-xs font-semibold text-[#062E73] dark:text-slate-200 mb-1">
                    {t.phoneLabel}
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-[#062E73] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00B4F0] text-sm"
                  />
                  {errors.phone && <p className="text-xs text-rose-500 dark:text-rose-400 mt-1 font-semibold">{errors.phone}</p>}
                </div>

                {/* Province Select (21 Províncias de Angola) */}
                <div>
                  <label htmlFor="quote-province" className="block text-xs font-semibold text-[#062E73] dark:text-slate-200 mb-1">
                    {t.provinceLabel}
                  </label>
                  <select
                    id="quote-province"
                    required
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value as Province);
                      if (errors.province) setErrors((prev) => ({ ...prev, province: '' }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#061A4A] border border-slate-300 dark:border-white/20 text-[#062E73] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00B4F0] text-sm"
                  >
                    {PROVINCES.map((prov) => (
                      <option key={prov} value={prov} className="bg-white dark:bg-[#061A4A] text-[#062E73] dark:text-white">
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Client Type Segmented Control */}
                <div>
                  <label className="block text-xs font-semibold text-[#062E73] dark:text-slate-200 mb-1.5">
                    {t.clientTypeLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['casa', 'empresa', 'industria'] as ClientType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setClientType(type)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                          clientType === type
                            ? 'bg-[#00B4F0] text-white border-[#00B4F0] shadow-[0_0_12px_rgba(0,180,240,0.4)]'
                            : 'bg-slate-100 dark:bg-white/5 border-slate-300 dark:border-white/15 text-[#062E73] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                        }`}
                      >
                        {t.clientTypes[type]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Field (Optional) */}
                <div>
                  <label htmlFor="quote-message" className="block text-xs font-semibold text-[#062E73] dark:text-slate-200 mb-1">
                    {t.messageLabel}
                  </label>
                  <textarea
                    id="quote-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-[#062E73] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00B4F0] text-sm resize-none"
                  />
                </div>

                {/* Privacy Consent Notice */}
                <div className="pt-1">
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal font-medium">
                    {t.privacyConsent}{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="text-[#0A4BB5] dark:text-[#00B4F0] underline hover:opacity-80 font-bold inline"
                    >
                      {t.privacyLink}
                    </button>
                    .
                  </p>
                </div>

                {/* Submit Button (Filled) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || selectedProducts.length === 0}
                    className="btn-primary w-full py-3 px-4 text-sm font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(0,180,240,0.4)]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.submitting : t.submitBtn}</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
