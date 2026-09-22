import { useEffect, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface ScrambleInProps {
  text: string;
  delay?: number;
  triggered: boolean;
}

export default function ScrambleIn({ text, delay = 0, triggered }: ScrambleInProps) {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!triggered) return;
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [triggered, delay]);

  useEffect(() => {
    if (!started) return;
    let cursor = 0;
    const interval = setInterval(() => {
      cursor += 0.5;
      const revealCount = Math.floor(cursor);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === ' ') {
          out += ' ';
        } else if (i < revealCount) {
          out += ch;
        } else if (i < revealCount + 3) {
          out += randomChar();
        } else {
          out += '';
        }
      }
      setDisplay(out);
      if (revealCount >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [started, text]);

  if (!started) {
    return <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />;
  }

  return <span>{display || ' '}</span>;
}
