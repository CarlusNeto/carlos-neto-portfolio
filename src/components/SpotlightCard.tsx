import type { PointerEvent, ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees; 0 disables the 3D effect. */
  tilt?: number;
}

export default function SpotlightCard({ children, className = '', tilt = 0 }: SpotlightCardProps) {
  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--x', `${px * 100}%`);
    el.style.setProperty('--y', `${py * 100}%`);
    if (tilt) {
      el.style.setProperty('--rx', `${(0.5 - py) * tilt}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * tilt}deg`);
    }
  };

  const handleLeave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`spotlight relative overflow-hidden border border-white/10 ${className}`}
    >
      {children}
    </div>
  );
}
