/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId } from 'react';
import { Pause, Play } from 'lucide-react';

interface StackCarouselProps<T> {
  items: T[];
  renderItem: (item: T, isActive: boolean, index: number) => React.ReactNode;
  ariaLabel: string;
  isLite?: boolean;
  itemKey?: (item: T, index: number) => string;
  autoPlayInterval?: number;
  className?: string;
  onActiveChange?: (index: number) => void;
  lang?: 'pt' | 'en';
}

export function StackCarousel<T>({
  items,
  renderItem,
  ariaLabel,
  isLite = false,
  itemKey,
  className = '',
  lang = 'pt',
}: StackCarouselProps<T>) {
  const [isPaused, setIsPaused] = useState(false);
  const baseId = useId();

  // Create duplicates so the marquee loops seamlessly without any jump
  // Half A and Half B are completely identical. When Half A finishes scrolling
  // by -50%, Half B is at 0, making the loop mathematically seamless.
  const repeatCount = items.length <= 4 ? 2 : 1;
  const halfItems: T[] = [];
  for (let r = 0; r < repeatCount; r++) {
    halfItems.push(...items);
  }

  // Marquee duration proportional to item count for consistent, smooth velocity
  const duration = Math.max(26, halfItems.length * 4.2);

  const pauseLabel = lang === 'pt' ? 'Pausar movimento' : 'Pause movement';
  const playLabel = lang === 'pt' ? 'Continuar movimento' : 'Resume movement';
  const motionStatusLabel = isPaused
    ? (lang === 'pt' ? 'Movimento em pausa' : 'Movement paused')
    : (lang === 'pt' ? 'Movimento contínuo ativo' : 'Continuous movement active');

  // LITE MODE LAYOUT: Static horizontal scroll-snap list without continuous animation
  if (isLite) {
    return (
      <div className={`w-full py-4 ${className}`} aria-label={ariaLabel}>
        <div className="flex gap-6 overflow-x-auto pb-4 pt-2 px-4 snap-x snap-mandatory focus:outline-none">
          {items.map((item, idx) => (
            <div
              key={itemKey ? itemKey(item, idx) : `${baseId}-lite-${idx}`}
              className="snap-center shrink-0 w-[280px] sm:w-[320px] md:w-[350px]"
            >
              {renderItem(item, true, idx)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // CONTINUOUS ROW MARQUEE (Right-to-Left infinite movement)
  return (
    <div
      className={`relative w-full select-none py-4 overflow-hidden ${className}`}
      aria-label={ariaLabel}
      role="region"
      aria-roledescription="carousel"
    >
      {/* Outer wrapper with soft edge masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_28px,black_calc(100%-28px),transparent)]">
        {/* Track with 2 identical halves */}
        <div
          className="flex w-max animate-marquee-row"
          style={{
            animationPlayState: isPaused ? 'paused' : undefined,
            animationDuration: `${duration}s`,
          }}
        >
          {/* First Half */}
          <div className="flex shrink-0 items-stretch gap-6 pr-6">
            {halfItems.map((item, idx) => (
              <div
                key={itemKey ? `${itemKey(item, idx % items.length)}-1-${idx}` : `${baseId}-h1-${idx}`}
                className="shrink-0 w-[280px] sm:w-[320px] md:w-[350px] flex flex-col justify-stretch transition-transform duration-200 hover:scale-[1.02]"
              >
                {renderItem(item, true, idx % items.length)}
              </div>
            ))}
          </div>

          {/* Second Identical Half for seamless infinite right-to-left loop */}
          <div
            className="flex shrink-0 items-stretch gap-6 pr-6"
            aria-hidden="true"
            inert={true as unknown as undefined}
          >
            {halfItems.map((item, idx) => (
              <div
                key={itemKey ? `${itemKey(item, idx % items.length)}-2-${idx}` : `${baseId}-h2-${idx}`}
                className="shrink-0 w-[280px] sm:w-[320px] md:w-[350px] flex flex-col justify-stretch transition-transform duration-200 hover:scale-[1.02]"
                tabIndex={-1}
              >
                {renderItem(item, true, idx % items.length)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Control Bar (Pause / Resume continuous movement) */}
      <div className="flex items-center justify-center gap-3 mt-6 z-20 relative px-4">
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? playLabel : pauseLabel}
          title={isPaused ? playLabel : pauseLabel}
          className="interactive-control flex items-center gap-2 py-2 px-4 rounded-full text-xs font-semibold text-[#062E73] dark:text-white/80 hover:text-black dark:hover:text-white bg-slate-100/90 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-[#00B4F0]/20 border border-slate-300 dark:border-white/15 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4F0] shadow-sm"
        >
          {isPaused ? (
            <>
              <Play className="w-3.5 h-3.5 fill-current text-[#0A4BB5] dark:text-[#00B4F0]" />
              <span>{playLabel}</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 fill-current text-[#0A4BB5] dark:text-[#00B4F0]" />
              <span>{pauseLabel}</span>
            </>
          )}
        </button>

        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline-block">
          {motionStatusLabel}
        </span>
      </div>
    </div>
  );
}
