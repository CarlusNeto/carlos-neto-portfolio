import SynapseXLogo from './SynapseXLogo';

const IMAGE_SRC = '/images/footer-character.png';

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

export default function Footer() {
  return (
    <footer id="contato" className="relative bg-black overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[440px]">
        <div className="w-full md:w-1/2 h-[300px] md:h-auto">
          <img src={IMAGE_SRC} alt="" className="brand-media w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-8">
              <SynapseXLogo size={18} className="text-white/70" />
              <span className="text-[15px] font-medium tracking-tight text-white/70">
                Carlos Augusto Neto
              </span>
            </div>
            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm mb-10">
              Vamos conversar sobre estratégia de IA, arquitetura de dados ou o próximo projeto de
              transformação digital.
            </p>

            <div className="flex flex-col gap-3.5">
              {CONTACT.map((c) =>
                c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex items-center gap-3 text-white/60 hover:text-white text-[13px] sm:text-[14px] transition-colors w-fit"
                  >
                    <i className={`bi ${c.icon} text-[14px]`} />
                    {c.label}
                  </a>
                ) : (
                  <span
                    key={c.label}
                    className="flex items-center gap-3 text-white/60 text-[13px] sm:text-[14px]"
                  >
                    <i className={`bi ${c.icon} text-[14px]`} />
                    {c.label}
                  </span>
                )
              )}
            </div>
          </div>

          <p className="text-white/25 text-[12px] mt-12">
            © 2026 Carlos Augusto Neto. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
