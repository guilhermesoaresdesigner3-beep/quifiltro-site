/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TEXTS, CONTACT_INFO } from '../data/site';
import { MessageCircle } from 'lucide-react';

interface FooterProps {
  lang: 'pt' | 'en';
  isDark: boolean;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, isDark, onOpenPrivacy }) => {
  const t = TEXTS[lang].footer;
  const nav = TEXTS[lang].nav;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#03153d] dark:bg-[#03153d] text-white pt-16 pb-12 border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12">
          {/* Coluna 1 (Esquerda): Logótipo, Texto Institucional e Redes Sociais */}
          <div className="md:col-span-5 space-y-5">
            {/* Logótipo Quifiltro conforme imagem de referência */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00B4F0] flex items-center justify-center shadow-[0_0_15px_rgba(0,180,240,0.5)] shrink-0">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block leading-none">
                  QUI<span className="text-[#00B4F0]">FILTRO</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#00B4F0] block mt-1">
                  {lang === 'pt' ? 'PURIFICAÇÃO DE ÁGUA' : 'WATER PURIFICATION'}
                </span>
              </div>
            </div>

            {/* Texto Descritivo */}
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {lang === 'pt'
                ? 'Mais saúde para sua família. Sistemas de purificação de água, osmose reversa e bebedouros para todo o território angolano.'
                : 'More health for your family. Water purification systems, reverse osmosis, and water dispensers across Angola.'}
            </p>

            {/* Ícones Sociais (Quadrados Arredondados conforme imagem anexada) */}
            <div className="flex items-center gap-3 pt-1">
              {/* Facebook */}
              <a
                href={CONTACT_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Quifiltro"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#00B4F0] border border-white/15 hover:border-[#00B4F0] text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={CONTACT_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Quifiltro"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#00B4F0] border border-white/15 hover:border-[#00B4F0] text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={CONTACT_INFO.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Quifiltro"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#00B4F0] border border-white/15 hover:border-[#00B4F0] text-white flex items-center justify-center transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Coluna 2 (Centro): Navegação Vertical */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00B4F0]">
              {t.linksTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#inicio" className="text-slate-300 hover:text-[#00B4F0] transition-colors">
                  {nav.inicio}
                </a>
              </li>
              <li>
                <a href="#produtos" className="text-slate-300 hover:text-[#00B4F0] transition-colors">
                  {nav.produtos}
                </a>
              </li>
              <li>
                <a href="#mais-vendidos" className="text-slate-300 hover:text-[#00B4F0] transition-colors">
                  {nav.maisVendidos}
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-slate-300 hover:text-[#00B4F0] transition-colors">
                  {nav.servicos}
                </a>
              </li>
              <li>
                <a href="#quem-somos" className="text-slate-300 hover:text-[#00B4F0] transition-colors">
                  {nav.quemSomos}
                </a>
              </li>
              <li>
                <a href="#contactos" className="text-slate-300 hover:text-[#00B4F0] transition-colors">
                  {nav.contactos}
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 (Direita): Contactos Formatados com Rótulos a Negrito */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00B4F0]">
              {t.contactTitle}
            </h3>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex flex-wrap items-baseline gap-1.5">
                <strong className="font-bold text-white">WhatsApp:</strong>
                <a
                  href={CONTACT_INFO.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B4F0] transition-colors tabular-nums"
                >
                  {CONTACT_INFO.whatsappDisplay}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline gap-1.5">
                <strong className="font-bold text-white">Chamadas:</strong>
                <a
                  href={`tel:${CONTACT_INFO.callsRaw}`}
                  className="hover:text-[#00B4F0] transition-colors tabular-nums"
                >
                  {CONTACT_INFO.callsDisplay}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline gap-1.5">
                <strong className="font-bold text-white">Email:</strong>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-[#00B4F0] transition-colors break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline gap-1.5">
                <strong className="font-bold text-white">Localização:</strong>
                <span>{CONTACT_INFO.locationDisplay}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Divisória Horizontal e Barra Inferior */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} Quifiltro. {t.rightsReserved}
          </p>

          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-slate-400 hover:text-[#00B4F0] underline font-medium transition-colors focus:outline-none"
          >
            {t.privacyLink}
          </button>
        </div>
      </div>
    </footer>
  );
};
