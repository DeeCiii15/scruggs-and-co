'use client';

import { useEffect, type RefObject } from 'react';

type ScrollOpenOptions = {
  /**
   * `sticky` — progress only while the section is pinned (legacy).
   * `visible` — progress starts as soon as the section enters the viewport.
   */
  trigger?: 'sticky' | 'visible';
};

/**
 * Maps a tall sticky section's scroll range to 0–1 and calls `onOpen`.
 */
export function useScrollOpen(
  sectionRef: RefObject<HTMLElement | null>,
  onOpen: (open: number) => void,
  options: ScrollOpenOptions = {},
) {
  const trigger = options.trigger ?? 'sticky';

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion) {
      onOpen(1);
      return;
    }

    let raf: number | null = null;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = Math.max(rect.height - vh, 1);

      let open: number;
      if (trigger === 'visible') {
        // 0 when the section first peeks into view; 1 at end of sticky scrub
        const rangeStart = vh * 0.92;
        const rangeEnd = -scrollable;
        open = (rangeStart - rect.top) / (rangeStart - rangeEnd);
      } else {
        open = -rect.top / scrollable;
      }

      onOpen(Math.min(1, Math.max(0, open)));
    };

    const onScroll = () => {
      if (raf != null) return;
      raf = window.requestAnimationFrame(() => {
        update();
        raf = null;
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('scroll', onScroll, true);
      if (raf != null) window.cancelAnimationFrame(raf);
    };
  }, [sectionRef, onOpen, trigger]);
}

export function smoothstep(t: number) {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
}
