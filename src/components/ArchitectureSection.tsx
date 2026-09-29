import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { EASE } from '../lib/scroll';

const MILESTONES = [
  { period: '2025 – 2026', name: 'MBA AI Business Leadership', icon: 'bi-mortarboard-fill' },
  { period: '2024', name: 'Graduação em Data Science', icon: 'bi-bar-chart-line-fill' },
  { period: '5 credenciais', name: 'Certificações técnicas', icon: 'bi-award-fill' },
];

export default function ArchitectureSection() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 55%'] });

  return (
    <section id="formacao" className="relative bg-black px-5 sm:px-8 py-28 sm:py-40 overflow-hidden">
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[1100px] h-[1100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(193,71,255,0.22), rgba(255,77,141,0.08) 35%, transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-[760px]">
        <motion.div
          className="text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <p className="text-gradient text-[14px] sm:text-[17px] font-semibold mb-3">Formação</p>
          <h2 className="text-white font-semibold tracking-[-0.045em] leading-[1] text-[clamp(40px,7vw,80px)] mb-6">
            Base acadêmica contínua.
          </h2>
          <p className="text-white/60 text-[15px] sm:text-[19px] leading-relaxed max-w-xl mx-auto">
            FIAP, com reforço constante em IA, dados e automação — incluindo certificações Microsoft
            Azure AI, Machine Learning, Blockchain e Linux.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative pl-12 sm:pl-16">
          <div className="absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-[2px] rounded-full bg-white/10" />
          <motion.div
            className="absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-[2px] rounded-full origin-top bg-gradient-to-b from-[#ff4d8d] via-[#c147ff] to-[#5b8cff]"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="flex flex-col gap-8 sm:gap-10">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.name}
                className="relative"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
              >
                <span className="absolute -left-12 sm:-left-16 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black border border-white/15 flex items-center justify-center">
                  <i className={`bi ${m.icon} text-[13px] sm:text-[18px] text-gradient`} />
                </span>
                <SpotlightCard tilt={4} className="rounded-[24px] bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8">
                  <p className="text-white/45 text-[12px] sm:text-[13px] font-medium tracking-[0.12em] uppercase mb-2">
                    {m.period}
                  </p>
                  <h3 className="text-white text-[22px] sm:text-[28px] font-semibold tracking-[-0.03em]">{m.name}</h3>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
