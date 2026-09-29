import { useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { EASE, useScrollRange } from '../lib/scroll';

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}videos/hero.mp4`;
// Horizontal mouse travel across the full window width scrubs this fraction of the video.
const SENSITIVITY = 0.8;
// Touch devices have no cursor: there the video follows the scroll instead,
// playing fully over this portion of the section.
const SCRUB_END = 0.7;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const prevXRef = useRef<number | null>(null);
  const hasPointerRef = useRef(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  // Only one seek in flight at a time; when it lands, chase the latest target.
  const seek = () => {
    const video = videoRef.current;
    if (!video || !video.duration || isSeekingRef.current) return;
    if (Math.abs(video.currentTime - targetTimeRef.current) < 0.01) return;
    isSeekingRef.current = true;
    video.currentTime = targetTimeRef.current;
  };

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const video = videoRef.current;
    if (hasPointerRef.current || !video || !video.duration) return;
    targetTimeRef.current = Math.min(p / SCRUB_END, 1) * (video.duration - 0.05);
    seek();
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    hasPointerRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const handleSeeked = () => {
      isSeekingRef.current = false;
      seek();
    };

    // Moving right plays the video forward, moving left rewinds it.
    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }
      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;
      if (!video.duration) return;
      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.max(0, Math.min(video.duration - 0.05, targetTimeRef.current + offset));
      seek();
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const frameScale = useTransform(scrollYProgress, [0.55, 1], [1, 0.84]);
  const frameRadius = useTransform(scrollYProgress, [0.55, 1], [0, 40]);
  const introOpacity = useScrollRange(scrollYProgress, [0, 0.2], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  const taglineOpacity = useScrollRange(scrollYProgress, [0.28, 0.45], [0, 1]);
  const taglineY = useTransform(scrollYProgress, [0.28, 0.45], [80, 0]);
  const hintOpacity = useScrollRange(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section ref={sectionRef} id="topo" className="relative h-[260vh] bg-black">
      <div className="sticky top-0 h-screen h-[100dvh] overflow-hidden">
        <motion.div
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={{ scale: frameScale, borderRadius: frameRadius }}
        >
          <video
            ref={videoRef}
            src={HERO_VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.55) 45%, transparent 80%)' }}
          />
        </motion.div>

        {/* Stage 1: name + intro */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 px-5 sm:px-10 pb-16 sm:pb-20"
          style={{ opacity: introOpacity, y: introY }}
        >
          <div className="mx-auto max-w-[1200px]">
            <motion.p
              className="text-gradient text-[14px] sm:text-[17px] font-semibold mb-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              Tech Lead &amp; AI Strategist
            </motion.p>
            <h1 className="text-white font-semibold tracking-[-0.045em] leading-[0.92] text-[clamp(52px,11vw,150px)]">
              <RevealText text="Carlos Augusto" delay={0.3} />
              <br />
              <RevealText text="Neto." delay={0.5} />
            </h1>

            <div className="mt-6 sm:mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <motion.p
                className="max-w-md text-[15px] sm:text-[17px] text-white/75 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.9 }}
              >
                Traduzo desafios de negócio em arquitetura de dados, automação inteligente e sistemas
                corporativos que escalam.
              </motion.p>
              <motion.div
                className="flex flex-wrap items-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 1.05 }}
              >
                <MagneticButton
                  href="#contato"
                  className="bg-white text-black text-[15px] font-medium px-6 py-3 hover:bg-white/90"
                >
                  Fale comigo
                </MagneticButton>
                <a href="#perfil" className="group text-[#2997ff] text-[15px] hover:underline">
                  Conheça a trajetória
                  <i className="bi bi-chevron-right text-[11px] ml-1 inline-block transition-transform group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stage 2: tagline over the shrinking frame */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-6 pb-[16vh] pointer-events-none"
          style={{ opacity: taglineOpacity, y: taglineY }}
        >
          <p className="text-center font-semibold tracking-[-0.04em] leading-[0.98] text-[clamp(40px,8vw,110px)]">
            <span className="text-white">Dados. Automação.</span>
            <br />
            <span className="text-gradient">Inteligência.</span>
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50 text-[11px] tracking-[0.2em] uppercase pointer-events-none"
          style={{ opacity: hintOpacity }}
        >
          <motion.i
            className="bi bi-chevron-down text-[14px]"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
