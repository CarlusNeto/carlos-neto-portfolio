import { useState } from 'react';
import { motion } from 'framer-motion';
import SynapseXLogo from './SynapseXLogo';
import SquashHamburger from './SquashHamburger';
import ScrambleText from './ScrambleText';

interface NavbarProps {
  entranceComplete: boolean;
}

const NAV_LINKS = [
  { label: 'Perfil', target: () => window.innerHeight },
  { label: 'Experiência', target: () => window.innerHeight * 2 },
  { label: 'Contato', target: () => document.body.scrollHeight },
];

export default function Navbar({ entranceComplete }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [downloadHovered, setDownloadHovered] = useState(false);

  const scrollTo = (top: number) => {
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 h-20 w-full px-4 sm:px-6 md:px-8 flex items-center justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop */}
      <div className="hidden sm:flex items-center gap-2">
        <motion.a
          href="/"
          className={`h-12 px-5 flex items-center gap-2.5 bg-white/15 backdrop-blur-md rounded-[14px] text-white ${
            menuOpen ? 'hidden md:flex' : 'flex'
          }`}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
          whileTap={{ scale: 0.98 }}
        >
          <SynapseXLogo size={18} />
          <span className="text-[16px] font-medium tracking-tight">Carlos Neto</span>
        </motion.a>

        <motion.div
          className="h-12 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
          animate={{ width: menuOpen ? 290 : 48 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className={`flex items-center justify-center text-white shrink-0 transition-colors ${
              menuOpen
                ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5'
                : 'w-12 h-12 rounded-[14px]'
            }`}
          >
            <SquashHamburger open={menuOpen} size="desktop" />
          </button>

          <motion.nav
            aria-label="Desktop navigation"
            className="flex items-center gap-6 pl-5 pr-6 whitespace-nowrap"
            initial={false}
            animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 15 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.target());
                  setMenuOpen(false);
                }}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-[16px] font-normal text-white/85 hover:text-white"
              >
                <ScrambleText text={link.label} isHovered={hoveredLink === link.label} />
              </a>
            ))}
          </motion.nav>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden items-center gap-2 flex-1">
        <motion.a
          href="/"
          className="h-9 flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-[10px] text-white overflow-hidden shrink-0"
          animate={{ width: menuOpen ? 0 : 'auto', paddingLeft: menuOpen ? 0 : 14, paddingRight: menuOpen ? 0 : 14, opacity: menuOpen ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <SynapseXLogo size={14} className="shrink-0" />
          <span className="text-[13px] font-medium tracking-tight">Carlos Neto</span>
        </motion.a>

        <motion.div
          className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
          animate={{ width: menuOpen ? '100%' : 36 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className={`flex items-center justify-center text-white shrink-0 transition-colors ${
              menuOpen ? 'w-7 h-7 rounded-[9px] bg-white/10 hover:bg-white/20 ml-1' : 'w-9 h-9 rounded-[10px]'
            }`}
          >
            <SquashHamburger open={menuOpen} size="mobile" />
          </button>

          <motion.nav
            aria-label="Mobile navigation"
            className="flex items-center gap-5 pl-4 pr-4 whitespace-nowrap"
            initial={false}
            animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 15 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.target());
                  setMenuOpen(false);
                }}
                className="text-[13px] font-normal text-white/85 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        </motion.div>
      </div>

      {/* Contact button */}
      <motion.a
        href="mailto:carlosaugnet@gmail.com"
        onMouseEnter={() => setDownloadHovered(true)}
        onMouseLeave={() => setDownloadHovered(false)}
        className="h-9 sm:h-12 px-3.5 sm:px-6 bg-white rounded-full text-black flex items-center gap-2 shrink-0"
        whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
        whileTap={{ scale: 0.97 }}
      >
        <i className="bi bi-envelope-fill text-[14px] sm:text-[16px]" />
        <span className="text-[13px] sm:text-[16px]">
          <ScrambleText text="Contato" isHovered={downloadHovered} />
        </span>
      </motion.a>
    </motion.header>
  );
}
