import { motion } from 'framer-motion';
import { Briefcase, MapPin, CalendarDays } from 'lucide-react';
import { experiences } from '../../data/resume';

export default function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <div className="section-eyebrow">Experience</div>
          <h2 className="section-title">
            Where I've <span className="text-gradient">shipped</span>.
          </h2>
          <p className="mt-3 text-zinc-400">
            A timeline of teams, problems, and the systems built to solve them.
          </p>
        </div>

        <ol className="relative">
          <div
            aria-hidden
            className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/50 via-fuchsia-500/30 to-cyan-400/40 md:left-1/2"
          />
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative mb-12 md:grid md:grid-cols-2 md:gap-12 ${
                i % 2 === 0 ? '' : 'md:[&>div:first-child]:order-2'
              }`}
            >
              {/* dot */}
              <span className="absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 shadow-[0_0_0_4px_rgba(139,92,246,0.18)] md:left-1/2" />

              {/* meta */}
              <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'}`}>
                <h3 className="font-display text-xl font-semibold text-white">{exp.company}</h3>
                <p className="text-sm text-zinc-300">{exp.role}</p>
                <div
                  className={`mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-400 ${
                    i % 2 === 0 ? 'md:justify-end' : ''
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={12} /> {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} /> {exp.location}
                  </span>
                </div>
              </div>

              {/* card */}
              <div className={`mt-4 pl-10 md:mt-0 md:pl-0 ${i % 2 === 0 ? 'md:pl-10' : 'md:pr-10'}`}>
                <div className="card group transition-colors hover:border-white/20">
                  <Briefcase size={18} className="mb-3 text-accent-cyan" />
                  <ul className="space-y-2 text-sm text-zinc-300">
                    {exp.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
