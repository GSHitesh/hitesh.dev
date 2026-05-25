import { useEffect, useRef, useState } from 'react';

export function useCountUp(target: number, duration = 1400, enabled = true) {
  const [value, setValue] = useState(0);
  const startTs = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const tick = (ts: number) => {
      if (startTs.current === null) startTs.current = ts;
      const elapsed = ts - startTs.current;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, enabled]);

  return value;
}
