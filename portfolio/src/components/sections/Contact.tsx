import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/resume';
import { useMagnetic } from '../../hooks/useMagnetic';
import ContactForm from '../ContactForm';

export default function Contact() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <section id="contact" className="relative py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="section-eyebrow">Contact</div>
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                Have an idea? <br />
                <span className="text-gradient">Let's ship it.</span>
              </h2>
              <p className="mt-5 max-w-lg text-zinc-300">
                I'm open to backend, platform, and automation roles — plus the occasional weekend
                build. Drop a line and I'll get back fast.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  ref={ctaRef}
                  href={profile.socials.email}
                  className="btn-primary"
                  data-cursor="hover"
                >
                  <Mail size={16} />
                  {profile.email}
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  data-cursor="hover"
                >
                  <Linkedin size={16} />
                  LinkedIn
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  data-cursor="hover"
                >
                  <Github size={16} />
                  GitHub
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid gap-3"
              >
                <InfoRow icon={<Mail size={16} />} label="Email" value={profile.email} href={profile.socials.email} />
                <InfoRow icon={<MapPin size={16} />} label="Based in" value={profile.location} />
              </motion.ul>
              <div className="mt-4">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-white/20">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-white ring-1 ring-white/10">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-zinc-400">{label}</div>
        <div className="truncate text-sm text-white">{value}</div>
      </div>
    </div>
  );
  return <li>{href ? <a href={href}>{inner}</a> : inner}</li>;
}
