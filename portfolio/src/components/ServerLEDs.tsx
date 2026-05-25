import { useEffect, useState } from 'react';

/**
 * Server-rack style indicator LEDs. Pure visual flair, hints at "operations".
 */
export default function ServerLEDs({
  rows = 3,
  cols = 8,
  className = '',
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  const total = rows * cols;
  const [states, setStates] = useState<number[]>(() =>
    Array.from({ length: total }, () => Math.floor(Math.random() * 3))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setStates((s) => {
        const next = [...s];
        const flips = Math.max(1, Math.floor(total * 0.15));
        for (let i = 0; i < flips; i++) {
          const idx = Math.floor(Math.random() * total);
          next[idx] = Math.floor(Math.random() * 4); // 0..3
        }
        return next;
      });
    }, 700);
    return () => clearInterval(id);
  }, [total]);

  const colors = ['bg-zinc-700', 'bg-emerald-400', 'bg-cyan-400', 'bg-amber-400'];
  const glows = [
    '',
    'shadow-[0_0_8px_rgba(52,211,153,0.7)]',
    'shadow-[0_0_8px_rgba(34,211,238,0.7)]',
    'shadow-[0_0_8px_rgba(251,191,36,0.7)]',
  ];

  return (
    <div
      className={`grid gap-1.5 rounded-xl border border-white/10 bg-black/40 p-2 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      aria-hidden
    >
      {states.map((s, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${colors[s]} ${glows[s]}`}
        />
      ))}
    </div>
  );
}
