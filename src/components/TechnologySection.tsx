import { motion } from 'framer-motion';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4';

const FEATURES = [
  {
    title: 'Estratégia de IA e Automação',
    desc: 'Liderança no desenho e implantação de projetos de IA aplicada ao negócio, automatizando fluxos comerciais e operacionais, elevando a velocidade de atendimento e produtividade.',
  },
  {
    title: 'Arquitetura e Integração',
    desc: 'Gestão da unificação de sistemas corporativos (ERP, CRM e plataformas proprietárias), estabelecendo arquitetura de dados coesa e elevando os padrões de governança.',
  },
  {
    title: 'Otimização Operacional (ROI)',
    desc: 'Condução de iniciativas de reestruturação de processos internos, entregando redução significativa e mensurável nos custos operacionais anuais.',
  },
  {
    title: 'Segurança e Governança',
    desc: 'Definição de políticas de segurança da informação e governança de acessos, garantindo integridade dos dados e conformidade com as melhores práticas.',
  },
];

export default function TechnologySection() {
  return (
    <section className="relative h-screen h-[100dvh] w-full overflow-hidden">
      <video
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        className="brand-media absolute inset-0 z-0 w-full h-full object-cover"
      />

      <div className="relative z-[1] h-full flex flex-col px-8 sm:px-12 md:px-16 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <div>
            <motion.p
              className="text-white/40 text-[12px] sm:text-[13px] tracking-[0.2em] uppercase mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0 }}
            >
              Alloy MiT · Tech Lead & AI Strategist · Jan 2021 — Atual
            </motion.p>
          <motion.h2
            className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
          >
            Pilares
            <br />
            de Atuação
          </motion.h2>
          </div>

          <motion.p
            className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            Cada projeto começa mapeando o negócio a fundo. A partir daí, tecnologia, dados e
            pessoas são orquestrados para entregar resultado mensurável.
          </motion.p>
        </div>

        <div className="flex-1" />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.3 }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
                {f.title}
              </div>
              <div className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
                {f.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
