import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4';

const FEATURES = [
  {
    icon: 'bi-cpu',
    title: 'Estratégia de IA e Automação',
    desc: 'Liderança no desenho e implantação de projetos de IA aplicada ao negócio, automatizando fluxos comerciais e operacionais, elevando a velocidade de atendimento e produtividade.',
  },
  {
    icon: 'bi-diagram-3',
    title: 'Arquitetura e Integração',
    desc: 'Gestão da unificação de sistemas corporativos (ERP, CRM e plataformas proprietárias), estabelecendo arquitetura de dados coesa e elevando os padrões de governança.',
  },
  {
    icon: 'bi-graph-up-arrow',
    title: 'Otimização Operacional (ROI)',
    desc: 'Condução de iniciativas de reestruturação de processos internos, entregando redução significativa e mensurável nos custos operacionais anuais.',
  },
  {
    icon: 'bi-shield-lock',
    title: 'Segurança e Governança',
    desc: 'Definição de políticas de segurança da informação e governança de acessos, garantindo integridade dos dados e conformidade com as melhores práticas.',
  },
];

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState(0);
  const distanceMV = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  // Vertical scroll drives the track sideways, exactly as far as it overflows.
  const x = useTransform(() => -scrollYProgress.get() * distanceMV.get());

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance(d);
      distanceMV.set(d);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [distanceMV]);

  return (
    <section
      ref={sectionRef}
      id="pilares"
      className="relative bg-black"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 h-screen h-[100dvh] overflow-hidden flex flex-col justify-center">
        <video
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #000, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 70%, #000)' }}
        />

        <motion.div
          ref={trackRef}
          className="relative z-10 flex items-stretch gap-5 sm:gap-6 w-max px-6 sm:px-[max(40px,calc((100vw-1100px)/2))]"
          style={{ x }}
        >
          <div className="w-[min(84vw,460px)] shrink-0 flex flex-col justify-center pr-4">
            <p className="text-gradient text-[14px] sm:text-[17px] font-semibold mb-4">
              Alloy MiT · Jan 2021 — Atual
            </p>
            <h2 className="text-white font-semibold tracking-[-0.045em] leading-[0.95] text-[clamp(44px,7vw,88px)]">
              Pilares
              <br />
              de atuação.
            </h2>
            <p className="text-white/60 text-[15px] sm:text-[17px] leading-relaxed mt-6 max-w-sm">
              Cada projeto começa mapeando o negócio a fundo. A partir daí, tecnologia, dados e
              pessoas são orquestrados para entregar resultado mensurável.
            </p>
            <p className="text-white/40 text-[13px] mt-8 flex items-center gap-2">
              Continue rolando <i className="bi bi-arrow-right" />
            </p>
          </div>

          {FEATURES.map((f, i) => (
            <SpotlightCard
              key={f.title}
              tilt={8}
              className="w-[min(80vw,380px)] h-[min(64vh,520px)] shrink-0 rounded-[28px] bg-white/[0.06] backdrop-blur-2xl p-7 sm:p-9 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-accent-gradient flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(255,77,141,0.7)]">
                  <i className={`bi ${f.icon} text-white text-[24px]`} />
                </div>
                <span className="text-white/25 text-[15px] font-semibold tabular-nums">0{i + 1}</span>
              </div>
              <div>
                <h3 className="text-white text-[24px] sm:text-[28px] font-semibold tracking-[-0.03em] leading-[1.1] mb-4">
                  {f.title}
                </h3>
                <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed">{f.desc}</p>
              </div>
            </SpotlightCard>
          ))}
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-40 h-[3px] rounded-full bg-white/15 overflow-hidden">
          <motion.div className="h-full origin-left bg-accent-gradient" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}
