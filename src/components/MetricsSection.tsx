import { motion } from 'framer-motion';

const IMAGE_SRC = '/images/metrics-character.png';

const METRICS = [
  { value: '5+', label: 'Anos de Liderança em Tech' },
  { value: '5', label: 'Certificações Técnicas' },
  { value: '4', label: 'Áreas de Especialização' },
];

export default function MetricsSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <img
        src={IMAGE_SRC}
        alt=""
        className="brand-media absolute inset-0 z-0 w-full h-full object-cover"
      />

      <div className="relative z-[1] flex flex-col items-center pt-32 pb-32 px-6">
        <div className="max-w-6xl w-full">
          <motion.p
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
          >
            Destaques da Carreira
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                className="text-center"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <div className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                  {m.value}
                </div>
                <div className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
