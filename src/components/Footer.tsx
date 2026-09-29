import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SynapseXLogo from './SynapseXLogo';
import MagneticButton from './MagneticButton';
import { EASE } from '../lib/scroll';

const IMAGE_SRC = `${import.meta.env.BASE_URL}images/footer-character.webp`;

const CONTACT = [
  { icon: 'bi-telephone-fill', label: '(11) 99647-4737', href: 'tel:+5511996474737' },
  { icon: 'bi-envelope-fill', label: 'carlosaugnet@gmail.com', href: 'mailto:carlosaugnet@gmail.com' },
  {
    icon: 'bi-linkedin',
    label: 'linkedin.com/in/carlos-aug-neto',
    href: 'https://linkedin.com/in/carlos-aug-neto',
  },
  { icon: 'bi-geo-alt-fill', label: 'São Paulo — SP', href: undefined },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 1, ease: EASE, delay },
});

export default function Footer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end end'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <>
      <section
        ref={sectionRef}
        id="contato"
        className="relative min-h-screen min-h-[100dvh] bg-black overflow-hidden flex items-end md:items-center"
      >
        <div className="absolute inset-y-0 right-0 w-full md:w-[58%] overflow-hidden">
          <motion.img
            src={IMAGE_SRC}
            alt=""
            className="w-full h-full object-cover"
            style={{ scale: imageScale }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/85 to-black/40 md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent" />

        <div className="relative z-10 w-full mx-auto max-w-[1100px] px-6 sm:px-10 py-24 [&>*]:md:max-w-[52%]">
          <motion.p className="text-gradient text-[14px] sm:text-[17px] font-semibold mb-4" {...fadeUp(0)}>
            Contato
          </motion.p>
          <motion.h2
            className="text-white font-semibold tracking-[-0.045em] leading-[0.95] text-[clamp(44px,6.4vw,92px)] mb-6"
            {...fadeUp(0.1)}
          >
            Vamos criar
            <br />
            <span className="text-gradient">o que vem a seguir.</span>
          </motion.h2>
          <motion.p className="text-white/65 text-[15px] sm:text-[19px] leading-relaxed max-w-md mb-10" {...fadeUp(0.2)}>
            Estratégia de IA, arquitetura de dados ou o próximo projeto de transformação digital. Me
            conte o desafio.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-4 mb-14" {...fadeUp(0.3)}>
            <MagneticButton
              href="mailto:carlosaugnet@gmail.com"
              className="bg-accent-gradient text-white text-[16px] font-semibold px-7 py-3.5 shadow-[0_15px_50px_-12px_rgba(255,77,141,0.8)]"
            >
              <i className="bi bi-envelope-fill" /> Enviar e-mail
            </MagneticButton>
            <MagneticButton
              href="https://linkedin.com/in/carlos-aug-neto"
              external
              className="bg-white/10 backdrop-blur-xl border border-white/15 text-white text-[16px] font-medium px-7 py-3.5 hover:bg-white/15"
            >
              <i className="bi bi-linkedin" /> LinkedIn
            </MagneticButton>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 gap-x-10 gap-y-3.5 max-w-xl" {...fadeUp(0.4)}>
            {CONTACT.map((c) => {
              const content = (
                <>
                  <i className={`bi ${c.icon} text-[14px] text-white/40`} />
                  {c.label}
                </>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex items-center gap-3 text-white/70 hover:text-white text-[14px] transition-colors w-fit"
                >
                  {content}
                </a>
              ) : (
                <span key={c.label} className="flex items-center gap-3 text-white/70 text-[14px]">
                  {content}
                </span>
              );
            })}
          </motion.div>
        </div>
      </section>

      <footer className="bg-black border-t border-white/10">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/40">
          <div className="flex items-center gap-2">
            <SynapseXLogo size={14} className="text-white/50" />
            <span>Carlos Augusto Neto</span>
          </div>
          <p>© 2026 Carlos Augusto Neto. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
