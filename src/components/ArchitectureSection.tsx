import { motion } from 'framer-motion';

const LAYERS = [
  { layer: '2025 – 2026', name: 'MBA AI Business Leadership' },
  { layer: '2024', name: 'Graduação em Data Science' },
  { layer: '5 CREDENCIAIS', name: 'Certificações Técnicas' },
];

export default function ArchitectureSection() {
  return (
    <section className="relative min-h-screen w-full bg-black flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
            Formação
          </p>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
            Base acadêmica contínua.
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            FIAP, com reforço constante em IA, dados e automação — incluindo certificações Microsoft
            Azure AI, Machine Learning, Blockchain e Linux.
          </p>
        </motion.div>

        <motion.div
          className="mt-20 flex flex-col items-center gap-4 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {LAYERS.map((l) => (
            <div
              key={l.layer}
              className="max-w-md w-full h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6"
            >
              <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">
                {l.layer}
              </span>
              <span className="text-white text-[16px] sm:text-[18px] font-light">{l.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
