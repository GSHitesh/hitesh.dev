import { motion } from 'framer-motion';
import { skillGroups } from '../../data/resume';

const marqueeItems = [
  'Python',
  'Django',
  'Docker',
  'Jenkins',
  'JFrog Artifactory',
  'Grafana',
  'Prometheus',
  'Loki',
  'Zabbix',
  'iLO',
  'HPCM',
  'Hypervisors',
  'Bare-metal',
  'RHEL',
  'Rocky',
  'SLES',
  'Shell',
  'Bash',
  'SQLite',
  'PostgreSQL',
  'REST',
  'SOAP',
  'CI/CD',
  'Microservices',
  'Git',
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <div className="section-eyebrow">Skills</div>
          <h2 className="section-title">
            My <span className="text-gradient">toolbox</span>.
          </h2>
          <p className="mt-3 text-zinc-400">
            A focused stack I reach for daily — backend-first, automation-friendly, cloud-native.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card group"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-white ring-1 ring-white/10">
                  <Icon size={18} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{g.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="relative mt-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-5 mask-fade-x">
          <div className="flex w-max animate-marquee gap-10 px-6 font-mono text-sm text-zinc-300">
            {[...marqueeItems, ...marqueeItems].map((m, i) => (
              <span key={i} className="opacity-80">
                <span className="mr-2 text-accent-cyan">⌁</span>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .mask-fade-x {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
        }
      `}</style>
    </section>
  );
}
