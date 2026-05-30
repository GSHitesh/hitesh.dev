import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Command,
  Search,
  ArrowRight,
  Mail,
  FileText,
  Github,
  Linkedin,
  Sun,
  Moon,
  Printer,
  Copy,
  CheckCircle2,
  Home,
  User,
  Briefcase,
  FolderGit2,
  Wrench,
  GraduationCap,
  Send,
  HelpCircle,
} from 'lucide-react';
import { profile } from '../data/resume';
import { useTheme } from '../hooks/useTheme';

type Action = {
  id: string;
  label: string;
  hint?: string;
  group: 'Navigate' | 'Resume' | 'Links' | 'Theme' | 'Misc';
  icon: React.ReactNode;
  shortcut?: string;
  run: () => void | Promise<void>;
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggle: toggleTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }, []);

  const actions: Action[] = useMemo(
    () => [
      // Navigate
      { id: 'nav-home', label: 'Go to Home', group: 'Navigate', icon: <Home size={16} />, shortcut: 'g h', run: () => scrollToId('home') },
      { id: 'nav-about', label: 'Go to About', group: 'Navigate', icon: <User size={16} />, shortcut: 'g a', run: () => scrollToId('about') },
      { id: 'nav-exp', label: 'Go to Experience', group: 'Navigate', icon: <Briefcase size={16} />, shortcut: 'g e', run: () => scrollToId('experience') },
      { id: 'nav-proj', label: 'Go to Projects', group: 'Navigate', icon: <FolderGit2 size={16} />, shortcut: 'g p', run: () => scrollToId('projects') },
      { id: 'nav-skills', label: 'Go to Skills', group: 'Navigate', icon: <Wrench size={16} />, shortcut: 'g s', run: () => scrollToId('skills') },
      { id: 'nav-edu', label: 'Go to Education', group: 'Navigate', icon: <GraduationCap size={16} />, shortcut: 'g d', run: () => scrollToId('education') },
      { id: 'nav-contact', label: 'Go to Contact', group: 'Navigate', icon: <Send size={16} />, shortcut: 'g c', run: () => scrollToId('contact') },

      // Resume
      { id: 'resume-view', label: 'View résumé (PDF)', group: 'Resume', icon: <FileText size={16} />, run: () => { window.open(profile.resumeUrl, '_blank', 'noopener,noreferrer'); } },
      { id: 'resume-print', label: 'Print this page', group: 'Resume', icon: <Printer size={16} />, shortcut: 'Ctrl+P', run: () => window.print() },

      // Links
      { id: 'mail-copy', label: `Copy email · ${profile.email}`, group: 'Links', icon: copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />, run: copyEmail },
      { id: 'mail-open', label: 'Email me', group: 'Links', icon: <Mail size={16} />, run: () => { window.location.href = profile.socials.email; } },
      { id: 'github', label: 'Open GitHub', group: 'Links', icon: <Github size={16} />, run: () => { window.open(profile.socials.github, '_blank', 'noopener,noreferrer'); } },
      { id: 'linkedin', label: 'Open LinkedIn', group: 'Links', icon: <Linkedin size={16} />, run: () => { window.open(profile.socials.linkedin, '_blank', 'noopener,noreferrer'); } },

      // Theme
      { id: 'theme-toggle', label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode', group: 'Theme', icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />, shortcut: 't', run: toggleTheme },

      // Misc
      { id: 'help', label: 'Show keyboard shortcuts', group: 'Misc', icon: <HelpCircle size={16} />, shortcut: '?', run: () => setShowHelp(true) },
    ],
    [theme, toggleTheme, copyEmail, copied],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) =>
      [a.label, a.group, a.shortcut].filter(Boolean).join(' ').toLowerCase().includes(q),
    );
  }, [actions, query]);

  const grouped = useMemo(() => {
    const m = new Map<Action['group'], Action[]>();
    for (const a of filtered) {
      const arr = m.get(a.group) ?? [];
      arr.push(a);
      m.set(a.group, arr);
    }
    return Array.from(m.entries());
  }, [filtered]);

  const flat = filtered;

  // Open via ⌘K / Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === 'Escape') {
        if (showHelp) setShowHelp(false);
        else if (open) close();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, showHelp, close]);

  // Single-key + g-prefixed shortcuts (only when palette closed and no input focused)
  useEffect(() => {
    let pendingG = false;
    let timer: number | undefined;

    function isTypingTarget(t: EventTarget | null) {
      if (!(t instanceof HTMLElement)) return false;
      const tag = t.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || t.isContentEditable;
    }

    function onKey(e: KeyboardEvent) {
      if (open || showHelp) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      const k = e.key;

      if (k === '?') {
        e.preventDefault();
        setShowHelp(true);
        return;
      }
      if (k === 't') {
        e.preventDefault();
        toggleTheme();
        return;
      }

      if (pendingG) {
        const map: Record<string, string> = { h: 'home', a: 'about', e: 'experience', p: 'projects', s: 'skills', d: 'education', c: 'contact' };
        const id = map[k.toLowerCase()];
        if (id) {
          e.preventDefault();
          scrollToId(id);
        }
        pendingG = false;
        if (timer) window.clearTimeout(timer);
        return;
      }

      if (k === 'g') {
        pendingG = true;
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(() => { pendingG = false; }, 900);
      }
    }

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (timer) window.clearTimeout(timer);
    };
  }, [open, showHelp, toggleTheme]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function runIndex(i: number) {
    const a = flat[i];
    if (!a) return;
    a.run();
    if (a.id !== 'help' && a.id !== 'mail-copy' && a.id !== 'theme-toggle') close();
  }

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runIndex(activeIndex);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="palette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] grid place-items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-md print:hidden"
            onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <motion.div
              initial={{ y: -8, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -8, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg-elev)]/95 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl"
              onKeyDown={onListKey}
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <Search size={16} className="text-zinc-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-zinc-500"
                  autoComplete="off"
                  spellCheck={false}
                />
                <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 sm:inline-block">
                  Esc
                </kbd>
              </div>

              <div className="max-h-[55vh] overflow-y-auto py-2">
                {grouped.length === 0 && (
                  <div className="px-4 py-10 text-center text-sm text-zinc-500">No results.</div>
                )}
                {grouped.map(([group, items]) => (
                  <div key={group} className="mb-1">
                    <div className="px-3 pb-1 pt-2 text-[10px] uppercase tracking-wider text-zinc-500">{group}</div>
                    {items.map((a) => {
                      const idx = flat.indexOf(a);
                      const active = idx === activeIndex;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => runIndex(idx)}
                          className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                            active
                              ? 'bg-gradient-to-r from-violet-500/15 to-cyan-400/10 text-[var(--text)]'
                              : 'text-zinc-300 hover:bg-white/5'
                          }`}
                        >
                          <span className="grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-200">
                            {a.icon}
                          </span>
                          <span className="flex-1 truncate">{a.label}</span>
                          {a.shortcut && (
                            <span className="hidden gap-1 sm:flex">
                              {a.shortcut.split(' ').map((s, i) => (
                                <kbd key={i} className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                                  {s}
                                </kbd>
                              ))}
                            </span>
                          )}
                          {active && <ArrowRight size={14} className="text-zinc-400" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-3 py-2 text-[11px] text-zinc-500">
                <span className="inline-flex items-center gap-1.5">
                  <Command size={12} />
                  <span>Command palette</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono">↑↓</kbd>
                  <span>navigate</span>
                  <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono">↵</kbd>
                  <span>run</span>
                  <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono">?</kbd>
                  <span>help</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            key="help"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[101] grid place-items-center bg-black/50 p-4 backdrop-blur-md print:hidden"
            onMouseDown={(e) => { if (e.target === e.currentTarget) setShowHelp(false); }}
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
          >
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[var(--bg-elev)]/95 p-6 shadow-2xl backdrop-blur-xl"
            >
              <h3 className="mb-4 font-display text-lg font-semibold text-[var(--text)]">Keyboard shortcuts</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <ShortcutRow keys={['⌘', 'K']} label="Open command palette" />
                <ShortcutRow keys={['Ctrl', 'K']} label="Open command palette (Win/Linux)" />
                <ShortcutRow keys={['?']} label="Show this dialog" />
                <ShortcutRow keys={['t']} label="Toggle dark / light theme" />
                <ShortcutRow keys={['g', 'h']} label="Go to Home" />
                <ShortcutRow keys={['g', 'a']} label="Go to About" />
                <ShortcutRow keys={['g', 'e']} label="Go to Experience" />
                <ShortcutRow keys={['g', 'p']} label="Go to Projects" />
                <ShortcutRow keys={['g', 's']} label="Go to Skills" />
                <ShortcutRow keys={['g', 'd']} label="Go to Education" />
                <ShortcutRow keys={['g', 'c']} label="Go to Contact" />
                <ShortcutRow keys={['Esc']} label="Close dialog" />
              </ul>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="mt-5 w-full rounded-full border border-white/10 bg-white/5 py-2 text-xs text-zinc-300 transition-colors hover:bg-white/10"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ShortcutRow({ keys, label }: { keys: string[]; label: string }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span>{label}</span>
      <span className="flex gap-1">
        {keys.map((k, i) => (
          <kbd key={i} className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-zinc-200">
            {k}
          </kbd>
        ))}
      </span>
    </li>
  );
}
