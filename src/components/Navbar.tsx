import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import SynapseXLogo from './SynapseXLogo';
import SquashHamburger from './SquashHamburger';
import { EASE, lockScroll } from '../lib/scroll';

const NAV_LINKS = [
  { label: 'Perfil', href: '#perfil' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Pilares', href: '#pilares' },
  { label: 'Competências', href: '#competencias' },
  { label: 'Formação', href: '#formacao' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    lockScroll(menuOpen);
  }, [menuOpen]);

  // Highlight the link of whichever section crosses the middle of the viewport.
  useEffect(() => {
    const ids = ['#topo', ...NAV_LINKS.map((l) => l.href), '#contato'];
    const sections = ids
      .map((id) => document.querySelector(id))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50"
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      >
        <div className="relative h-12 bg-black/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/[0.08]">
          <nav
            aria-label="Navegação principal"
            className="mx-auto max-w-[1100px] h-full px-4 sm:px-6 flex items-center justify-between"
          >
            <a href="#topo" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <SynapseXLogo size={16} />
              <span className="text-[13px] font-semibold tracking-tight">Carlos Neto</span>
            </a>

            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={`text-[12px] tracking-wide transition-colors ${
                      active === link.href ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-1/2 -ml-[2px] w-1 h-1 rounded-full bg-accent-gradient"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <motion.a
                href="#contato"
                className="rounded-full bg-white text-black text-[12px] font-medium px-3.5 py-1.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Fale comigo
              </motion.a>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menuOpen}
                className="md:hidden w-9 h-9 flex items-center justify-center text-white"
              >
                <SquashHamburger open={menuOpen} size="mobile" />
              </button>
            </div>
          </nav>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-accent-gradient"
            style={{ scaleX: progress }}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 top-12 z-40 bg-black/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="px-8 pt-10 flex flex-col gap-5">
              {[...NAV_LINKS, { label: 'Contato', href: '#contato' }].map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[28px] font-semibold tracking-tight text-white/90"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
