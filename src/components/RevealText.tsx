import { motion } from 'framer-motion';
import { EASE } from '../lib/scroll';

interface RevealTextProps {
  text: string;
  delay?: number;
  className?: string;
}

/** Words rise out of a mask, one after another — the Apple keynote headline reveal. */
export default function RevealText({ text, delay = 0, className = '' }: RevealTextProps) {
  const words = text.split(' ');
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span
              className="inline-block"
              initial={{ y: '115%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.09 }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}
