/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { WaterBackground } from './components/WaterBackground';
import { HeroSection } from './components/HeroSection';
import { StatsMapSection } from './components/StatsMapSection';
import { ProductsSection } from './components/ProductsSection';
import { BestsellersSection } from './components/BestsellersSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { QuoteDrawer } from './components/QuoteDrawer';
import { PrivacyModal } from './components/PrivacyModal';
import { FloatingActions } from './components/FloatingActions';
import { ProductItem, TEXTS } from './data/site';
import { Zap } from 'lucide-react';

export default function App() {
  // 1. Language State (PT default)
  const [lang, setLang] = useState<'pt' | 'en'>(() => {
    try {
      const saved = localStorage.getItem('quifiltro_lang');
      if (saved === 'en' || saved === 'pt') return saved;
    } catch {
      // fallback
    }
    return 'pt';
  });

  // Sync lang with HTML document attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('quifiltro_lang', lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  // 2. Theme State (Dark mode is default)
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('quifiltro_theme');
      if (saved !== null) return saved === 'dark';
      // System preference fallback if not specified
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return false;
      }
    } catch {
      // fallback
    }
    return true; // Default dark
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('quifiltro_theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // 3. Lite Mode & Reduced Motion State
  const [isLite, setIsLite] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('quifiltro_lite');
      if (saved !== null) return saved === 'true';

      // Auto-detect slow connection or save-data
      const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
        .connection;
      if (conn?.saveData || conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g') {
        return true;
      }
      // Prefers reduced motion check
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  });

  useEffect(() => {
    if (isLite) {
      document.documentElement.setAttribute('data-lite', 'true');
    } else {
      document.documentElement.removeAttribute('data-lite');
    }
    try {
      localStorage.setItem('quifiltro_lite', isLite ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isLite]);

  const toggleLite = () => {
    setIsLite((prev) => !prev);
  };

  // 4. Quote Request Cart State
  const [quoteProducts, setQuoteProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem('quifiltro_quote_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('quifiltro_quote_cart', JSON.stringify(quoteProducts));
    } catch {
      // ignore
    }
  }, [quoteProducts]);

  const handleToggleProduct = useCallback((product: ProductItem) => {
    setQuoteProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  }, []);

  const handleRemoveProduct = useCallback((productId: string) => {
    setQuoteProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const handleClearProducts = useCallback(() => {
    setQuoteProducts([]);
  }, []);

  // 5. Drawer and Privacy Modal States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Hash-based navigation for #privacidade
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#privacidade') {
        setIsPrivacyOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const selectedProductIds = quoteProducts.map((p) => p.id);

  return (
    <div className="relative min-h-screen text-[#062E73] dark:text-slate-100 selection:bg-[#00B4F0]/30 selection:text-white transition-colors duration-200">
      {/* 2D Water Waves and Bokeh Canvas Background (Fixed behind everything) */}
      <WaterBackground isDark={isDark} isLite={isLite} />

      {/* Lite Mode Banner when active */}
      {isLite && (
        <aside
          aria-label="Aviso de modo leve"
          className="relative z-50 bg-[#D6EAFF] dark:bg-[#0A3A8F] text-[#062E73] dark:text-white text-xs font-bold py-1.5 px-4 text-center border-b border-[#0A4BB5]/20 dark:border-[#00B4F0]/30 flex items-center justify-center gap-2"
        >
          <Zap className="w-3.5 h-3.5 text-[#00B4F0]" />
          <span>{TEXTS[lang].liteModeBanner}</span>
        </aside>
      )}

      {/* Fixed Header */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        isLite={isLite}
        onToggleLite={toggleLite}
      />

      {/* Main Single Page Sections in Strict Canonical Order */}
      <main id="conteudo-principal" className="relative z-10">
        {/* 1. Início */}
        <HeroSection lang={lang} isDark={isDark} isLite={isLite} />

        {/* 2. Estatísticas e Mapa de Angola (21 províncias) */}
        <StatsMapSection lang={lang} isLite={isLite} />

        {/* 3. Produtos */}
        <ProductsSection
          lang={lang}
          isLite={isLite}
          selectedProductIds={selectedProductIds}
          onToggleProduct={handleToggleProduct}
        />

        {/* 4. Mais vendidos */}
        <BestsellersSection
          lang={lang}
          isLite={isLite}
          selectedProductIds={selectedProductIds}
          onToggleProduct={handleToggleProduct}
        />

        {/* 5. Serviços */}
        <ServicesSection lang={lang} isLite={isLite} />

        {/* 6. Quem somos */}
        <AboutSection lang={lang} />

        {/* 7. Contactos */}
        <ContactsSection lang={lang} />
      </main>

      {/* 8. Rodapé */}
      <Footer
        lang={lang}
        isDark={isDark}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Floating Action Buttons: WhatsApp and Quote List (Non-overlapping) */}
      <FloatingActions
        quoteCount={quoteProducts.length}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        lang={lang}
      />

      {/* Side Drawer: Quote Request Form & Product Selection */}
      <QuoteDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedProducts={quoteProducts}
        onRemoveProduct={handleRemoveProduct}
        onClearProducts={handleClearProducts}
        lang={lang}
        onOpenPrivacy={() => {
          setIsDrawerOpen(false);
          setIsPrivacyOpen(true);
        }}
      />

      {/* Privacy Notice Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => {
          setIsPrivacyOpen(false);
          if (window.location.hash === '#privacidade') {
            history.replaceState(null, '', ' ');
          }
        }}
        lang={lang}
      />
    </div>
  );
}
