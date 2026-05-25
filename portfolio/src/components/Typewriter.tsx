import { useEffect, useState } from 'react';

export type TypewriterProps = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  hold?: number;
  className?: string;
};

export default function Typewriter({
  words,
  typeSpeed = 70,
  deleteSpeed = 40,
  hold = 1400,
  className = '',
}: TypewriterProps) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx % words.length];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    } else {
      t = setTimeout(
        () => {
          setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, idx, words, typeSpeed, deleteSpeed, hold]);

  return <span className={`caret ${className}`}>{text}</span>;
}
