import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  open: boolean;
  size?: 'desktop' | 'mobile';
  className?: string;
}

const DIMENSIONS = {
  desktop: { width: 18, height: 12, bar: 1.5 },
  mobile: { width: 15, height: 10, bar: 1.2 },
};

const spring = { type: 'spring' as const, stiffness: 300, damping: 20 };

export default function SquashHamburger({ open, size = 'desktop', className = '' }: SquashHamburgerProps) {
  const { width, height, bar } = DIMENSIONS[size];
  const mid = (height - bar) / 2;
  const bottom = height - bar;

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <motion.span
        className="absolute left-0 bg-current rounded-full"
        style={{ width, height: bar }}
        animate={open ? { top: mid, rotate: 45 } : { top: 0, rotate: 0 }}
        transition={spring}
      />
      <motion.span
        className="absolute left-0 bg-current rounded-full"
        style={{ width, height: bar, top: mid }}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={spring}
      />
      <motion.span
        className="absolute left-0 bg-current rounded-full"
        style={{ width, height: bar }}
        animate={open ? { top: mid, rotate: -45 } : { top: bottom, rotate: 0 }}
        transition={spring}
      />
    </div>
  );
}
