import { useEffect, useRef, useState } from 'react';
import ServerLEDs from './ServerLEDs';

type Line = { kind: 'cmd' | 'log' | 'ok' | 'warn' | 'info'; text: string };

const SCRIPT: Line[] = [
  { kind: 'cmd', text: 'ssh hitesh@prod-node-01' },
  { kind: 'info', text: 'Last login: a few moments ago' },
  { kind: 'cmd', text: 'systemctl status engineer.service' },
  { kind: 'ok', text: '● engineer.service — Sai Hitesh' },
  { kind: 'log', text: '   Loaded:  loaded (enabled, vendor preset: enabled)' },
  { kind: 'log', text: '   Active:  active (running) · uptime 2y 4m' },
  { kind: 'log', text: '   Memory:  curiosity=high  caffeine=stable' },
  { kind: 'cmd', text: 'jenkins build --target prod' },
  { kind: 'ok',  text: '[✓] lint           passed' },
  { kind: 'ok',  text: '[✓] unit-tests     passed (124/124)' },
  { kind: 'ok',  text: '[✓] docker build   pushed → jfrog/artifactory' },
  { kind: 'ok',  text: '[✓] deploy         rocky-09 · sles-15 · rhel-9' },
  { kind: 'info',text: '⌁ slack notified · grafana dashboards green' },
  { kind: 'cmd', text: 'ready --for "your next challenge"' },
];

const colorMap: Record<Line['kind'], string> = {
  cmd: 'text-zinc-100',
  log: 'text-zinc-300',
  ok: 'text-emerald-300',
  warn: 'text-amber-300',
  info: 'text-cyan-300',
};

const PROMPT = (
  <>
    <span className="text-emerald-400">hitesh</span>
    <span className="text-zinc-500">@</span>
    <span className="text-cyan-400">prod</span>
    <span className="text-zinc-500">:~$</span>{' '}
  </>
);

export default function BootTerminal() {
  const [rendered, setRendered] = useState<Line[]>([]);
  const [typing, setTyping] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = SCRIPT[lineIdx % SCRIPT.length];
    const isCmd = line.kind === 'cmd';
    const delay = isCmd ? 45 : 12;

    if (charIdx < line.text.length) {
      const id = setTimeout(() => {
        setTyping(line.text.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, delay);
      return () => clearTimeout(id);
    }

    const hold = isCmd ? 350 : 120;
    const id = setTimeout(() => {
      setRendered((r) => {
        const next = [...r, line];
        // Keep buffer trimmed so it doesn't grow forever.
        return next.length > 12 ? next.slice(next.length - 12) : next;
      });
      setTyping('');
      setCharIdx(0);
      setLineIdx((i) => i + 1);
    }, hold);
    return () => clearTimeout(id);
  }, [charIdx, lineIdx]);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [rendered, typing]);

  const activeKind = SCRIPT[lineIdx % SCRIPT.length].kind;

  return (
    <div className="glass glow-ring relative overflow-hidden rounded-2xl">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-[11px] text-zinc-400">
            ~/sai-hitesh — zsh — 80×24
          </span>
        </div>
        <ServerLEDs rows={2} cols={6} className="hidden sm:grid" />
      </div>

      {/* Terminal body */}
      <div
        ref={boxRef}
        className="term h-[320px] overflow-hidden px-5 py-4 text-[12.5px] leading-relaxed"
      >
        {rendered.map((l, i) => (
          <div key={i} className={`whitespace-pre ${colorMap[l.kind]}`}>
            {l.kind === 'cmd' && PROMPT}
            {l.text}
          </div>
        ))}
        <div className={`whitespace-pre ${colorMap[activeKind]}`}>
          {activeKind === 'cmd' && PROMPT}
          {typing}
          <span className="ml-[1px] inline-block h-3 w-[7px] translate-y-[1px] animate-pulse bg-cyan-300" />
        </div>
      </div>
    </div>
  );
}
