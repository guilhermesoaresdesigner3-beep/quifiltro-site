/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TEXTS } from '../data/site';
import { Sun, Moon, Zap, ZapOff, ShieldAlert, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  lang: 'pt' | 'en';
  onToggleLang: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isLite: boolean;
  onToggleLite: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  isDark,
  onToggleTheme,
  isLite,
  onToggleLite,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TEXTS[lang].nav;

  const handleQuickExit = () => {
    // Immediate redirect for user privacy / quick exit
    window.location.replace('https://www.google.com');
  };

  const navLinks = [
    { href: '#inicio', label: t.inicio },
    { href: '#produtos', label: t.produtos },
    { href: '#mais-vendidos', label: t.maisVendidos },
    { href: '#servicos', label: t.servicos },
    { href: '#quem-somos', label: t.quemSomos },
    { href: '#contactos', label: t.contactos },
  ];

  return (
    <>
      {/* Skip to Content for Accessibility */}
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00B4F0] focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        {t.skipToContent}
      </a>

      {/* Fixed Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-2xl glass-panel">
          {/* Logo Brand */}
          <a
            href="#inicio"
            className="flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0] rounded-lg"
            aria-label="Quifiltro Home"
          >
            <img
              src={isDark ? '/logo-white.png' : '/logo.png'}
              alt="Quifiltro"
              width={160}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold"
            aria-label="Navegação Principal"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-[#00B4F0] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00B4F0] rounded text-[#062E73] dark:text-slate-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Toolbar: Language, Theme, Lite Mode, Quick Exit, Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Switch: PT | EN */}
            <button
              type="button"
              onClick={onToggleLang}
              aria-label={t.languageToggle}
              title={t.languageToggle}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-[#00B4F0]/20 border border-slate-300 dark:border-white/15 text-[#062E73] dark:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <span className={lang === 'pt' ? 'font-black text-[#0A4BB5] dark:text-[#00B4F0]' : 'opacity-60'}>PT</span>
              <span className="mx-1 opacity-40">|</span>
              <span className={lang === 'en' ? 'font-black text-[#0A4BB5] dark:text-[#00B4F0]' : 'opacity-60'}>EN</span>
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={t.themeToggle}
              title={t.themeToggle}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-[#00B4F0]/20 border border-slate-300 dark:border-white/15 text-[#062E73] dark:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#062E73]" />}
            </button>

            {/* Lite Mode Toggle */}
            <button
              type="button"
              onClick={onToggleLite}
              aria-label={t.liteModeToggle}
              title={t.liteModeToggle}
              className={`p-2.5 rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0] min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isLite
                  ? 'bg-[#00B4F0] text-white border-[#00B4F0] shadow-[0_0_12px_rgba(0,180,240,0.5)]'
                  : 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-[#00B4F0]/20 border-slate-300 dark:border-white/15 text-[#062E73] dark:text-white'
              }`}
            >
              {isLite ? <ZapOff className="w-4 h-4" /> : <Zap className="w-4 h-4 text-[#062E73] dark:text-white opacity-80" />}
            </button>

            {/* QUICK EXIT BUTTON (Always visible, icon-only, high-visibility red/accent) */}
            <button
              type="button"
              onClick={handleQuickExit}
              aria-label={t.quickExit}
              title={`${t.quickExit} (Redirecionamento imediato)`}
              className="px-2.5 py-2 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white font-bold border border-rose-400 shadow-[0_0_14px_rgba(225,29,72,0.4)] transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 min-h-[44px] min-w-[44px]"
            >
              <ShieldAlert className="w-5 h-5 text-white animate-pulse" />
              <span className="sr-only sm:not-sr-only text-xs uppercase tracking-wider font-bold">Sair</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? t.menuClose : t.menuOpen}
              className="lg:hidden p-2.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-[#062E73] dark:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#062E73] dark:text-white" /> : <Menu className="w-5 h-5 text-[#062E73] dark:text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl glass-panel p-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2" aria-label="Navegação Móvel">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-semibold text-[#062E73] dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-between transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70 text-[#062E73] dark:text-white" />
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
