import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';
import { profile } from '../data/resume';
import ThemeToggle from './ThemeToggle';
import clsx from 'clsx';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const active = useActiveSection(links.map((l) => l.id));
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-3 z-50">
      <nav className="container-x">
        <div className="glass glow-ring flex items-center justify-between rounded-full px-3 py-2 sm:px-5">
          <a
            href="#home"
            className="flex items-center gap-2 px-2"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 font-display text-sm font-bold text-white shadow-lg">
              H
            </span>
            <span className="hidden font-display text-sm font-semibold text-white sm:block">
              Sai <span className="text-gradient">Hitesh</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={clsx(
                    'relative rounded-full px-3 py-1.5 text-sm transition-colors',
                    active === l.id
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-zinc-100'
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-1.5 md:flex">
            <ThemeToggle />
            <IconLink href={profile.socials.github} label="GitHub">
              <Github size={16} />
            </IconLink>
            <IconLink href={profile.socials.linkedin} label="LinkedIn">
              <Linkedin size={16} />
            </IconLink>
            <IconLink href={profile.socials.email} label="Email">
              <Mail size={16} />
            </IconLink>
          </div>

          <div className="flex items-center gap-1.5 md:hidden">
            <ThemeToggle />
            <button
              className="rounded-full border border-white/10 bg-white/5 p-2"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass mt-2 overflow-hidden rounded-2xl p-2 md:hidden"
            >
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    'block rounded-xl px-4 py-2.5 text-sm',
                    active === l.id
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-300 hover:bg-white/5'
                  )}
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      aria-label={label}
      className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  );
}
