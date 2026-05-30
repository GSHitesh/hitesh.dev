import { motion } from 'framer-motion';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import HeroScene from '../HeroScene';
import BootTerminal from '../BootTerminal';
import { profile } from '../../data/resume';
import { useMagnetic } from '../../hooks/useMagnetic';

export default function Hero() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden pt-28">
      {/* Background 3D scene */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
        <HeroScene />
      </div>

      {/* Grid + noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[size:38px_38px] bg-grid-fade opacity-30 mask-fade-b"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-50" />

      <div className="container-x relative grid items-center gap-12 pb-24 pt-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-eyebrow"
          >
            <Sparkles size={12} className="text-accent-cyan" />
            <span className="inline-flex items-center gap-1.5">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              uptime · 99.97% · open to roles
            </span>
          </motion.div>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="block"
            >
              I run systems
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block text-gradient"
            >
              that run themselves.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 max-w-xl text-base text-zinc-300 sm:text-lg"
          >
            Hi, I'm <span className="text-white">Sai Hitesh</span> — a{' '}
            <span className="font-mono text-accent-cyan">backend system engineer.</span>
            <br />
            I design APIs, CI/CD pipelines, and observability stacks that keep
            bare-metal and containers humming across <span className="text-white">RHEL</span>,{' '}
            <span className="text-white">Rocky</span>, and <span className="text-white">SLES</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a ref={ctaRef} href="#contact" className="btn-primary" data-cursor="hover">
              Let's build something
              <ArrowDown size={16} className="-rotate-45" />
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              data-cursor="hover"
            >
              <Download size={16} />
              View résumé
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {profile.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur"
              >
                <dt className="text-[11px] uppercase tracking-wider text-zinc-400">{h.label}</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-white">{h.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative hidden lg:col-span-5 lg:block"
        >
          <BootTerminal />
          <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-2xl bg-gradient-to-br from-violet-500/40 to-cyan-400/40 blur-2xl" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-xs text-zinc-400"
        >
          <ArrowDown size={14} />
          scroll
        </motion.div>
      </div>
    </section>
  );
}
