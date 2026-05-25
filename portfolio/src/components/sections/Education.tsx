import { motion } from 'framer-motion';
import { GraduationCap, Award, MapPin, CalendarDays } from 'lucide-react';
import { education, certifications } from '../../data/resume';

export default function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <div>
          <div className="section-eyebrow">Education</div>
          <h2 className="section-title">
            Where I <span className="text-gradient">learned</span>.
          </h2>
          <div className="mt-8 space-y-4">
            {education.map((e, i) => (
              <motion.div
                key={e.school}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card flex gap-4"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-white ring-1 ring-white/10">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{e.school}</h3>
                  <p className="text-sm text-zinc-300">{e.degree}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={12} /> {e.period}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} /> {e.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="section-eyebrow">Certifications</div>
          <h2 className="section-title">
            And what I've <span className="text-gradient">earned</span>.
          </h2>
          <div className="mt-8 space-y-3">
            {certifications.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/20 text-white ring-1 ring-white/10">
                  <Award size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-white">{c.title}</h3>
                  <p className="text-xs text-zinc-400">{c.issuer}</p>
                </div>
                <span className="chip">{c.year}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
