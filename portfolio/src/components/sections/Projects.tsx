import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { projects, type Project } from '../../data/resume';

const accentClasses: Record<Project['accent'], string> = {
  violet: 'from-violet-500/40 to-fuchsia-500/30',
  cyan: 'from-cyan-400/40 to-sky-500/30',
  pink: 'from-pink-500/40 to-rose-500/30',
  lime: 'from-lime-400/40 to-emerald-500/30',
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <div className="section-eyebrow">Projects</div>
          <h2 className="section-title">
            Things I've <span className="text-gradient">built</span>.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 backdrop-blur-xl"
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${accentClasses[p.accent]} blur-3xl transition-opacity duration-500 group-hover:opacity-80`}
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">{p.title}</h3>
                  <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-zinc-400">
                    <Calendar size={12} /> {p.date}
                  </div>
                </div>
                <a
                  href={p.href ?? '#'}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300 transition-all group-hover:bg-white/10 group-hover:text-white"
                  aria-label="Open project"
                  data-cursor="hover"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-300">{p.description}</p>

              <ul className="mt-4 space-y-1.5 text-sm text-zinc-400">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
