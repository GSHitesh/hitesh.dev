import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { profile } from '../data/resume';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in name, email, and message.');
      return;
    }

    setStatus('sending');
    setErrorMsg(null);

    try {
      const endpoint = profile.contactEndpoint;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, message, _gotcha: honeypot }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Request failed (${res.status})`);
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      const fallback = `Couldn't send. Email me directly at ${profile.email}.`;
      setErrorMsg(err instanceof Error && err.message ? err.message : fallback);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      onSubmit={onSubmit}
      className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 print:hidden"
      noValidate
    >
      <div className="text-[11px] uppercase tracking-wider text-zinc-400">Send a message</div>

      {/* Honeypot — hidden from humans, bots will fill it */}
      <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        Leave this empty
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          id="cf-name"
          label="Name"
          value={name}
          onChange={setName}
          placeholder="Your name"
          autoComplete="name"
          disabled={status === 'sending'}
        />
        <Field
          id="cf-email"
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="you@domain.com"
          autoComplete="email"
          disabled={status === 'sending'}
        />
      </div>

      <label className="grid gap-1.5">
        <span className="text-[11px] uppercase tracking-wider text-zinc-400">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you building?"
          rows={4}
          disabled={status === 'sending'}
          className="resize-y rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20 disabled:opacity-60"
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
          data-cursor="hover"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send size={16} />
              Send message
            </>
          )}
        </button>

        {status === 'success' && (
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
            <CheckCircle2 size={14} />
            Thanks! I'll reply soon.
          </span>
        )}
        {status === 'error' && errorMsg && (
          <span className="inline-flex items-center gap-1.5 text-xs text-rose-400">
            <AlertCircle size={14} />
            {errorMsg}
          </span>
        )}
      </div>
    </motion.form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
}) {
  return (
    <label htmlFor={id} className="grid gap-1.5">
      <span className="text-[11px] uppercase tracking-wider text-zinc-400">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20 disabled:opacity-60"
      />
    </label>
  );
}
