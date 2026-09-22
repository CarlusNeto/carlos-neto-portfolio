import { useEffect, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export default function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const revealCount = Math.floor(frame / 4);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === ' ') {
          out += ' ';
        } else if (i < revealCount) {
          out += ch;
        } else {
          out += randomChar();
        }
      }
      setDisplay(out);
      if (revealCount >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span className={className}>{display}</span>;
}
