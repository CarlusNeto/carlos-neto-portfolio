import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from './ScrambleIn';

const HERO_VIDEO_SRC = '/videos/hero.mp4';
const SENSITIVITY = 0.8;

interface HeroSectionProps {
  entranceComplete: boolean;
}

export default function HeroSection({ entranceComplete }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
      targetTimeRef.current = 0;
    };

    const handleSeeked = () => {
      if (!video) return;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
        video.currentTime = targetTimeRef.current;
      } else {
        isSeekingRef.current = false;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);

    const updateTargetTime = (deltaX: number) => {
      if (!video || !video.duration || isNaN(video.duration)) return;
      const timeOffset = (deltaX / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset));
      if (!isSeekingRef.current && !video.seeking) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }
      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;
      updateTargetTime(delta);
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative h-screen h-[100dvh] w-full overflow-hidden">
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
        }}
      />

      {/* Bottom scrim for text legibility */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 55%)' }}
      />

      {/* Watermark */}
      <div
        className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none"
        style={{ transform: 'translateY(50px)' }}
      >
        <span
          className="uppercase font-normal"
          style={{
            fontFamily: '"Anton SC", sans-serif',
            fontSize: 'clamp(120px, 30vw, 521px)',
            letterSpacing: '-4px',
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          ESTRATÉGIA
        </span>
      </div>

      <motion.div
        className="relative z-10 h-full flex flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(36px,9vw,88px)]">
              <ScrambleIn text="Carlos Augusto" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="Neto" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              className="max-w-sm text-[13px] sm:text-[15px] text-white/70 leading-relaxed"
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
            >
              Líder de Tecnologia e Estrategista em Inteligência Artificial. Traduzo desafios de
              negócio em arquitetura de dados, automação inteligente e integração de sistemas
              corporativos escaláveis.
            </motion.p>
          </div>

          <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(36px,9vw,88px)] text-left md:text-right">
            <ScrambleIn text="Tech Lead" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="& AI Strategist" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  );
}
