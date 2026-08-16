'use client';

import { useEffect, useRef, useState } from 'react';

/** Change this whenever you know the line. */
export const HERO_BRIDGE_MESSAGE = 'The in-between is the story.';

const TYPE_MS = 70;
const HOLD_MS = 1100;

/**
 * Typewriter line between the two heroes — types forward, then back.
 */
export default function HeroBridgeType() {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(0);
  const inView = useRef(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduceMotion) {
      setCount(HERO_BRIDGE_MESSAGE.length);
      return;
    }

    let i = 0;
    let dir: 1 | -1 = 1;
    let timeout = 0;

    const step = () => {
      if (!inView.current) {
        timeout = window.setTimeout(step, 200);
        return;
      }
      i += dir;
      if (i >= HERO_BRIDGE_MESSAGE.length) {
        i = HERO_BRIDGE_MESSAGE.length;
        setCount(i);
        dir = -1;
        timeout = window.setTimeout(step, HOLD_MS);
        return;
      }
      if (i <= 0) {
        i = 0;
        setCount(0);
        dir = 1;
        timeout = window.setTimeout(step, HOLD_MS);
        return;
      }
      setCount(i);
      timeout = window.setTimeout(step, TYPE_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        inView.current = visible;
        if (visible && timeout === 0) step();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <p
      ref={rootRef}
      className="mx-auto max-w-5xl min-h-[1.15em] text-center font-display text-2xl leading-none text-ink sm:text-4xl md:text-5xl"
      aria-label={HERO_BRIDGE_MESSAGE}
    >
      <span aria-hidden>{HERO_BRIDGE_MESSAGE.slice(0, count)}</span>
    </p>
  );
}
