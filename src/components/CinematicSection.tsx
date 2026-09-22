import { useRef } from 'react';
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'framer-motion';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';

export default function CinematicSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 15, damping: 32, mass: 1.8 });
  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120]);
  const opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const transform = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  return (
    <section ref={sectionRef} className="relative h-screen h-[100dvh] w-full overflow-hidden">
      <video
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        className="brand-media absolute inset-0 z-0 w-full h-full object-cover"
      />

      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: 180,
          background: 'linear-gradient(to bottom, #010103, transparent)',
        }}
      />

      <div
        className="relative z-[1] h-full flex items-center justify-center"
        style={{ perspective: 400 }}
      >
        <motion.p
          className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center max-w-5xl"
          style={{ transform, opacity }}
        >
          Líder de Tecnologia e Estrategista em Inteligência Artificial com sólida trajetória na
          condução de projetos de transformação digital, arquitetura de dados e integração de
          sistemas corporativos complexos. Especialista em traduzir desafios de negócio em
          soluções tecnológicas escaláveis, promovendo automação inteligente de processos e
          otimização da jornada comercial.
        </motion.p>
      </div>
    </section>
  );
}
