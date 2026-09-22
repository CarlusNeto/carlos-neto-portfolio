import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'Estratégia de IA / ML', level: 95 },
  { name: 'Arquitetura de Dados', level: 90 },
  { name: 'Integração ERP / CRM', level: 88 },
  { name: 'Microsoft Azure', level: 85 },
  { name: 'Python / JavaScript', level: 80 },
  { name: 'Automação (RPA)', level: 82 },
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

export default function SkillsSection() {
  return (
    <section className="relative w-full bg-black px-6 sm:px-12 md:px-16 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0 }}
        >
          Competências
        </motion.p>

        <motion.h2
          className="text-white font-light text-[clamp(32px,7vw,64px)] leading-[0.95] tracking-[-0.03em] mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0 }}
        >
          Stack e
          <br />
          especialidades
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
          {/* Skill bars */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.1 }}
          >
            {SKILLS.map((s, i) => (
              <div key={s.name}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-white/80 text-[13px] sm:text-[14px]">{s.name}</span>
                  <span className="text-white/30 text-[12px]">{s.level}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white/70 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.0, delay: 0.15 + i * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Technologies + certifications */}
          <div className="flex flex-col gap-14">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, delay: 0.2 }}
            >
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-5">
                Tecnologias
              </p>
              <div className="flex flex-wrap gap-2.5">
                {TECHNOLOGIES.map((t) => (
                  <span
                    key={t}
                    className="text-[12px] sm:text-[13px] text-white/70 border border-white/15 rounded-full px-4 py-2"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, delay: 0.3 }}
            >
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-5">
                Certificações
              </p>
              <ul className="flex flex-col gap-3">
                {CERTIFICATIONS.map((c) => (
                  <li
                    key={c}
                    className="text-[13px] sm:text-[14px] text-white/60 leading-relaxed flex gap-3"
                  >
                    <span className="text-white/25">—</span>
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
