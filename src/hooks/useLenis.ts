import { useEffect } from 'react';
import Lenis from 'lenis';
import { registerLenis } from '../lib/scroll';

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // `anchors` makes every <a href="#section"> glide instead of jumping.
    const lenis = new Lenis({ anchors: true });
    registerLenis(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);
}
