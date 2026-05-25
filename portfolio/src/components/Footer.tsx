import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/resume';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/20 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-zinc-400">
          © {new Date().getFullYear()} {profile.name}. Crafted with React, Three.js & Framer Motion.
        </p>
        <div className="flex items-center gap-2">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300 hover:text-white"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300 hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={profile.socials.email}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300 hover:text-white"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
