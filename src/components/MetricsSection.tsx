import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useScrollRange } from '../lib/scroll';

const IMAGE_SRC = `${import.meta.env.BASE_URL}images/metrics-character.webp`;

const METRICS = [
  { value: 5, suffix: '+', label: 'Anos de liderança em tecnologia' },
  { value: 5, suffix: '', label: 'Certificações técnicas' },
  { value: 4, suffix: '', label: 'Áreas de especialização' },
];

function Metric({
  metric,
  index,
  progress,
}: {
  metric: (typeof METRICS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.3 + index * 0.08;
  const count = useTransform(progress, [start, start + 0.25], [0, metric.value]);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${metric.suffix}`);
  const opacity = useScrollRange(progress, [start - 0.05, start + 0.05], [0, 1]);
  const y = useTransform(progress, [start - 0.05, start + 0.1], [40, 0]);

  return (
    <motion.div className="text-center" style={{ opacity, y }}>
      <motion.div className="text-gradient font-semibold tracking-[-0.05em] leading-none text-[clamp(72px,13vw,168px)]">
        {rounded}
      </motion.div>
      <div className="text-white/60 text-[15px] sm:text-[17px] mt-3">{metric.label}</div>
    </motion.div>
  );
}

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);
  const dim = useScrollRange(scrollYProgress, [0, 0.3], [0.1, 0.6]);
  const headingOpacity = useScrollRange(scrollYProgress, [0.05, 0.22], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.05, 0.22], [60, 0]);

  return (
    <section ref={sectionRef} id="resultados" className="relative h-[240vh] bg-black">
      <div className="sticky top-0 h-screen h-[100dvh] overflow-hidden flex items-center justify-center">
        <motion.img
          src={IMAGE_SRC}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: imageScale }}
        />
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: dim }} />

        <div className="relative z-10 w-full max-w-[1100px] px-6">
          <motion.div className="text-center mb-14 sm:mb-20" style={{ opacity: headingOpacity, y: headingY }}>
            <p className="text-white/70 text-[14px] sm:text-[17px] font-semibold mb-3">Destaques da carreira</p>
            <h2 className="text-white font-semibold tracking-[-0.04em] leading-[1] text-[clamp(38px,6.5vw,80px)]">
              Resultados que
              <br />
              falam por si.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
            {METRICS.map((m, i) => (
              <Metric key={m.label} metric={m} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
