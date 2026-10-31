/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  startTime: number;
  duration: number; // 1400ms
  maxRadius: number; // ~240px
}

interface WaterBackgroundProps {
  isDark: boolean;
  isLite: boolean;
}

export const WaterBackground: React.FC<WaterBackgroundProps> = ({ isDark, isLite }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // 1. Interactive Ripple Pointerdown Detection
  useEffect(() => {
    if (isLite) return;

    const handlePointerDown = (e: PointerEvent) => {
      // Ignore right clicks
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Verify if target or any ancestor is an interactive control or inside drawer/carousel
      const isInteractive = target.closest(
        'button, a, input, textarea, select, [role="button"], .interactive-control, .carousel-card, .drawer-panel, [data-interactive="true"]'
      );

      if (isInteractive) return;

      const newRipple: Ripple = {
        x: e.clientX,
        y: e.clientY,
        startTime: performance.now(),
        duration: 1400,
        maxRadius: 240,
      };

      // Keep max 6 active ripples
      ripplesRef.current = [...ripplesRef.current.slice(-5), newRipple];
    };

    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isLite]);

  // 2. Waves and Canvas Rendering
  useEffect(() => {
    if (isLite) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;
    const targetFps = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFps;

    const updateCanvasSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let isDocumentVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = (now: number) => {
      if (!isDocumentVisible) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = now - lastTimeRef.current;
      if (elapsed < frameInterval) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }
      lastTimeRef.current = now - (elapsed % frameInterval);

      // Filter active ripples
      ripplesRef.current = ripplesRef.current.filter((r) => now - r.startTime < r.duration);

      // Clear transparent canvas so underwater image shines through
      ctx.clearRect(0, 0, width, height);

      // Draw active ripples over the underwater background image
      for (const rip of ripplesRef.current) {
        const progress = (now - rip.startTime) / rip.duration;
        const currentRadius = progress * rip.maxRadius;
        const opacity = Math.max(0, (1 - progress) * 0.65);
        const lineWidth = Math.max(0.5, 3 - progress * 2.5);

        // Subtle center radial glow
        const glowRad = ctx.createRadialGradient(rip.x, rip.y, 0, rip.x, rip.y, currentRadius * 0.4);
        if (isDark) {
          glowRad.addColorStop(0, `rgba(0, 210, 255, ${opacity * 0.7})`);
          glowRad.addColorStop(1, 'rgba(0, 180, 240, 0)');
        } else {
          glowRad.addColorStop(0, `rgba(10, 75, 181, ${opacity * 0.5})`);
          glowRad.addColorStop(1, 'rgba(10, 75, 181, 0)');
        }
        ctx.fillStyle = glowRad;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, currentRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // 3 concentric rings
        const ringFractions = [1, 0.72, 0.45];
        for (let i = 0; i < ringFractions.length; i++) {
          const r = currentRadius * ringFractions[i];
          if (r > 2) {
            ctx.beginPath();
            ctx.arc(rip.x, rip.y, r, 0, Math.PI * 2);
            ctx.lineWidth = lineWidth * (1 - i * 0.2);
            ctx.strokeStyle = isDark
              ? `rgba(0, 220, 255, ${opacity * (1 - i * 0.2)})`
              : `rgba(10, 75, 181, ${opacity * (1 - i * 0.2)})`;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', updateCanvasSize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isDark, isLite]);

  return (
    <>
      {/* Fundo Subaquático Fixo */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020B24]">
        <img
          src="/assets/aistudio/Abstrato_Subaqu_tico_em_Azul_Profundo_0f4e4097.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center select-none"
          loading="eager"
          decoding="async"
        />
        {/* Camada sutil de contraste para legibilidade do texto e modo claro/escuro */}
        <div
          className={`absolute inset-0 transition-colors duration-200 ${
            isDark
              ? 'bg-gradient-to-b from-[#020B24]/30 via-transparent to-[#020B24]/60'
              : 'bg-[#EAF2FF]/85 backdrop-blur-[3px]'
          }`}
          aria-hidden="true"
        />
      </div>

      {/* Canvas transparente de Ondulações Interativas (Pointerdown Ripples) */}
      {!isLite && (
        <canvas
          id="water-canvas"
          ref={canvasRef}
          aria-hidden="true"
          className="fixed inset-0 w-full h-full pointer-events-none z-0"
        />
      )}
    </>
  );
};
