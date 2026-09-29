import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useScrollRange } from '../lib/scroll';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';

const TEXT =
  'Líder de Tecnologia e Estrategista em Inteligência Artificial com sólida trajetória na condução de projetos de transformação digital, arquitetura de dados e integração de sistemas corporativos complexos. Especialista em traduzir desafios de negócio em soluções tecnológicas escaláveis, promovendo automação inteligente de processos e otimização da jornada comercial.';

const HIGHLIGHTS = new Set([
  'Inteligência',
  'Artificial',
  'transformação',
  'digital,',
  'escaláveis,',
  'automação',
  'inteligente',
]);

const WORDS = TEXT.split(' ');

function Word({
  word,
  index,
  progress,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
}) {
  // Words light up in sequence between 5% and 85% of the section's scroll.
  const step = 0.8 / WORDS.length;
  const start = 0.05 + index * step;
  const opacity = useScrollRange(progress, [start, start + step * 3], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={HIGHLIGHTS.has(word) ? 'text-gradient' : undefined}>
      {word}{' '}
    </motion.span>
  );
}

export default function CinematicSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const videoOpacity = useScrollRange(scrollYProgress, [0, 0.15, 0.9, 1], [0, 0.45, 0.45, 0.2]);

  return (
    <section ref={sectionRef} id="perfil" className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen h-[100dvh] overflow-hidden flex items-center">
        <motion.video
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: videoScale, opacity: videoOpacity }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35), #000 85%)' }}
        />

        <div className="relative z-10 mx-auto max-w-[1100px] px-6 sm:px-10">
          <p className="text-gradient text-[14px] sm:text-[17px] font-semibold mb-6">Perfil</p>
          <p className="text-white font-semibold tracking-[-0.03em] leading-[1.18] text-[clamp(26px,4.4vw,58px)]">
            {WORDS.map((word, i) => (
              <Word key={i} word={word} index={i} progress={scrollYProgress} />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
