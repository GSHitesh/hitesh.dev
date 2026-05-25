import { motion } from 'framer-motion';
import {
  GitCommit,
  Hammer,
  TestTube2,
  Package,
  Rocket,
  Activity,
  type LucideIcon,
} from 'lucide-react';

type Stage = { label: string; icon: LucideIcon };

const stages: Stage[] = [
  { label: 'Commit', icon: GitCommit },
  { label: 'Build', icon: Hammer },
  { label: 'Test', icon: TestTube2 },
  { label: 'Package', icon: Package },
  { label: 'Deploy', icon: Rocket },
  { label: 'Observe', icon: Activity },
];

export default function Pipeline() {
  return (
    <section aria-label="CI/CD pipeline" className="py-10">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
          {/* Header */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-zinc-400">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              pipeline · prod · all green
            </div>
            <div className="font-mono text-[11px] text-zinc-500">build #2,841 · 1m 42s</div>
          </div>

          {/* Track */}
          <div className="relative">
            {/* Base rail */}
            <div className="absolute left-5 right-5 top-1/2 h-px -translate-y-1/2 bg-white/10" />
            {/* Animated flowing rail */}
            <motion.div
              aria-hidden
              initial={{ x: '-30%' }}
              animate={{ x: '120%' }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 h-[2px] w-1/3 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
            />

            <ol className="relative grid grid-cols-3 gap-y-6 sm:grid-cols-6">
              {stages.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.label} className="flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 18 }}
                      className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur"
                    >
                      <Icon size={18} className="text-white" />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: i * 0.25,
                        }}
                        className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                      />
                    </motion.div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      {s.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
