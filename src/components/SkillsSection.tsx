import { useId } from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import CountUp from './CountUp';
import { EASE } from '../lib/scroll';

const SKILLS = [
  { name: 'Estratégia de IA / ML', level: 95 },
  { name: 'Arquitetura de Dados', level: 90 },
  { name: 'Integração ERP / CRM', level: 88 },
  { name: 'Microsoft Azure', level: 85 },
  { name: 'Automação (RPA)', level: 82 },
  { name: 'Python / JavaScript', level: 80 },
  { name: 'Linux / Segurança', level: 78 },
];

const TECHNOLOGIES = [
  'Machine Learning',
  'Azure AI',
  'REST / SOAP',
  'Data-Driven',
  'Agile',
  'Blockchain',
  'HTML / CSS',
  'Governança',
  'Cloud',
  'LGPD',
];

const CERTIFICATIONS = [
  'Microsoft Certified: Azure AI Fundamentals',
  'Fundamentos de Machine Learning — FIAP',
  'Operações com Blockchain — DIO',
  'Linux Fundamentos — FIAP',
  'Lógica de Programação com JavaScript — Alura',
];

function Ring({ level, size, stroke }: { level: number; size: number; stroke: number }) {
  const gradientId = useId();
  const r = (size - stroke) / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 shrink-0">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff4d8d" />
          <stop offset="55%" stopColor="#c147ff" />
          <stop offset="100%" stopColor="#5b8cff" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: level / 100 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.8, ease: EASE }}
      />
    </svg>
  );
}

const tileMotion = (i: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, ease: EASE, delay: (i % 4) * 0.08 },
});

export default function SkillsSection() {
  const [lead, ...rest] = SKILLS;

  return (
    <section id="competencias" className="relative bg-black px-4 sm:px-8 py-28 sm:py-40">
      <div className="mx-auto max-w-[1100px]">
        <motion.div className="text-center mb-14 sm:mb-20" {...tileMotion(0)}>
          <p className="text-gradient text-[14px] sm:text-[17px] font-semibold mb-3">Competências</p>
          <h2 className="text-white font-semibold tracking-[-0.045em] leading-[1] text-[clamp(40px,7vw,88px)]">
            Stack e especialidades.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Lead skill: big tile */}
          <motion.div className="col-span-2 row-span-2" {...tileMotion(0)}>
            <SpotlightCard className="h-full rounded-[28px] bg-[#0d0d10] p-7 sm:p-10 flex flex-col justify-between gap-8">
              <div>
                <p className="text-white/50 text-[13px] sm:text-[14px] font-medium mb-2">Especialidade principal</p>
                <h3 className="text-white text-[26px] sm:text-[34px] font-semibold tracking-[-0.03em] leading-[1.1]">
                  {lead.name}
                </h3>
              </div>
              <div className="relative self-center">
                <Ring level={lead.level} size={220} stroke={14} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gradient text-[56px] font-semibold tracking-[-0.05em]">
                    <CountUp to={lead.level} suffix="%" />
                  </span>
                </div>
              </div>
              <p className="text-white/55 text-[14px] sm:text-[15px] leading-relaxed">
                Desenho e implantação de IA aplicada ao negócio, do diagnóstico à operação.
              </p>
            </SpotlightCard>
          </motion.div>

          {rest.map((s, i) => (
            <motion.div key={s.name} {...tileMotion(i + 1)}>
              <SpotlightCard className="h-full rounded-[24px] bg-[#0d0d10] p-5 sm:p-6 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <Ring level={s.level} size={52} stroke={5} />
                  <span className="text-white text-[26px] sm:text-[32px] font-semibold tracking-[-0.04em]">
                    <CountUp to={s.level} suffix="%" />
                  </span>
                </div>
                <p className="text-white/75 text-[13px] sm:text-[15px] font-medium leading-snug">{s.name}</p>
              </SpotlightCard>
            </motion.div>
          ))}

          {/* Certifications */}
          <motion.div className="col-span-2 row-span-2" {...tileMotion(1)}>
            <SpotlightCard className="h-full rounded-[28px] bg-[#0d0d10] p-7 sm:p-10">
              <p className="text-white/50 text-[13px] sm:text-[14px] font-medium mb-2">Certificações</p>
              <h3 className="text-white text-[26px] sm:text-[30px] font-semibold tracking-[-0.03em] leading-[1.1] mb-8">
                Aprendizado contínuo, <span className="text-gradient">comprovado.</span>
              </h3>
              <ul className="flex flex-col gap-4">
                {CERTIFICATIONS.map((c, i) => (
                  <motion.li
                    key={c}
                    className="flex items-start gap-3 text-white/75 text-[14px] sm:text-[15px] leading-snug"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.08 }}
                  >
                    <i className="bi bi-patch-check-fill text-[#ff4d8d] text-[16px] mt-px" />
                    {c}
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>

          {/* Technologies marquee */}
          <motion.div className="col-span-2" {...tileMotion(2)}>
            <SpotlightCard className="h-full rounded-[28px] bg-[#0d0d10] py-7 sm:py-9 flex flex-col justify-center gap-3">
              <p className="text-white/50 text-[13px] sm:text-[14px] font-medium mb-2 px-7 sm:px-10">Tecnologias</p>
              {[false, true].map((reverse) => (
                <div key={String(reverse)} className="marquee-mask overflow-hidden">
                  <div className={`marquee ${reverse ? 'marquee-reverse' : ''}`}>
                    {[...TECHNOLOGIES, ...TECHNOLOGIES].map((t, i) => (
                      <span
                        key={i}
                        aria-hidden={i >= TECHNOLOGIES.length}
                        className="shrink-0 text-[13px] sm:text-[14px] text-white/80 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 mr-2.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
