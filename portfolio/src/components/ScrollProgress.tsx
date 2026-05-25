import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ScrollProgress() {
  const p = useScrollProgress();
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
        style={{ width: `${p * 100}%`, transition: 'width 80ms linear' }}
      />
    </div>
  );
}
