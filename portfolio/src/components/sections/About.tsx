import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { profile } from '../../data/resume';
import { useCountUp } from '../../hooks/useCountUp';

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="relative py-28">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="section-eyebrow">About</div>
          <h2 className="section-title">
            Engineering with <span className="text-gradient">intent</span>.
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <p className="text-lg leading-relaxed text-zinc-300">{profile.summary}</p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value={2} suffix="+" label="Years building" enabled={inView} />
            <Stat value={6} suffix="%" label="Efficiency lift" enabled={inView} />
            <Stat value={50} suffix="L+" label="₹ Saved" enabled={inView} />
            <Stat value={20} suffix="%" label="Perf boost" enabled={inView} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  enabled,
}: {
  value: number;
  suffix?: string;
  label: string;
  enabled: boolean;
}) {
  const n = useCountUp(value, 1400, enabled);
  return (
    <div className="card text-center">
      <div className="font-display text-3xl font-bold text-white">
        {Math.round(n)}
        {suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-zinc-400">{label}</div>
    </div>
  );
}
