import { transform, useTransform, type MotionValue } from 'framer-motion';
import type Lenis from 'lenis';

export const EASE = [0.22, 1, 0.36, 1] as const;

let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

/**
 * Scroll-linked range mapping computed in JS. framer-motion hands plain
 * `useTransform(progress, input, output)` opacity to the browser's native
 * ViewTimeline, which mis-maps ranges on sticky sections — a function
 * transformer opts out of that acceleration.
 */
export function useScrollRange(progress: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(progress, (v) => transform(v, input, output));
}
