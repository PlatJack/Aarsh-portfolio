'use client';

import { useInView, useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '@/lib/data';
import { StageHeader } from './StageHeader';

type Doc = { title: string; sub: string; href: string; keys: string };

const index: Doc[] = [
  { title: profile.email, sub: 'Email · the fastest way to reach me', href: `mailto:${profile.email}`, keys: 'email mail contact reach hire talk message hello collaborate job role opportunity' },
  { title: 'linkedin.com/in/aarsh-desai', sub: 'LinkedIn · career history & network', href: profile.socials[1].url, keys: 'linkedin connect network career recruiter hire contact reach job' },
  { title: 'github.com/PlatJack', sub: 'GitHub · code, projects & experiments', href: profile.socials[0].url, keys: 'github code repo projects open source hackathon build' },
  { title: 'Aarsh_Desai_Resume.pdf', sub: 'Résumé · one-page PDF', href: profile.resume, keys: 'resume cv pdf experience download hire recruiter job' },
  { title: 'Publications', sub: '4 peer-reviewed papers with collaborators at IIT Bombay & NIT', href: '#embed', keys: 'papers research publications tale t4e indiscon ieee diarization whisper emotion lung academic' },
  { title: 'Experience', sub: 'Nanonets, IIT Madras, IIT Bombay, Vocab.Ai, NIT Puducherry', href: '#extract', keys: 'experience work nanonets iit bombay madras vocab jobs internship document ai vlm agents' },
  { title: 'Results & recognition', sub: 'Measured project outcomes, competitions and awards', href: '#evaluate', keys: 'awards honours medal codechef leetcode competitive programming metrics results benchmarks' },
];

function search(q: string) {
  const terms = q.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  return index
    .map((d, i) => {
      const hay = `${d.title} ${d.sub} ${d.keys}`.toLowerCase();
      const hits = terms.filter(t => t.length > 1 && hay.includes(t)).length;
      // Pseudo-similarity: lexical overlap plus a small prior favouring contact channels
      const score = Math.min(0.99, 0.52 + hits * 0.14 + (index.length - i) * 0.012);
      return { d, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

const demoQuery = 'how do i reach aarsh?';

export function Retrieve() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [query, setQuery] = useState('');
  const [typing, setTyping] = useState(true);

  // Type out a demo query the first time the section appears
  useEffect(() => {
    if (!inView || !typing) return;
    if (reduce) {
      setQuery(demoQuery);
      setTyping(false);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setQuery(demoQuery.slice(0, i));
      if (i >= demoQuery.length) {
        clearInterval(id);
        setTyping(false);
      }
    }, 55);
    return () => clearInterval(id);
  }, [inView, typing, reduce]);

  const results = useMemo(() => search(query), [query]);
  const t0 = useMemo(() => (8 + (query.length % 7)).toString(), [query]);

  return (
    <section id="retrieve" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 pb-20 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[600px] -translate-x-1/2 rounded-full bg-rose/[0.07] blur-[140px]" aria-hidden />
      <StageHeader index={5} stage="Retrieve" accent="#fb7185" title={<>Query the index.</>}>
        Everything above is indexed. Ask anything, or just say hello.
      </StageHeader>

      <div ref={ref} className="reveal mx-auto max-w-3xl">
        <label className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-4 shadow-[0_0_80px_-30px_#fb7185] focus-within:border-rose/50">
          <span className="font-mono text-rose">›</span>
          <input
            value={query}
            onChange={e => {
              setTyping(false);
              setQuery(e.target.value);
            }}
            placeholder="search papers, experience, contact…"
            className={`w-full bg-transparent text-lg outline-none placeholder:text-faint ${typing ? 'caret' : ''}`}
            aria-label="Search the portfolio"
          />
          <span className="hidden whitespace-nowrap font-mono text-[10.5px] text-faint sm:block">top-k=4 · {t0}ms</span>
        </label>

        <ul className="mt-4 space-y-2" aria-live="polite">
          {results.map(({ d, score }, i) => (
            <li key={d.title}>
              <a
                href={d.href}
                {...(d.href.startsWith('http') || d.href.endsWith('.pdf') ? { target: '_blank', rel: 'noreferrer' } : {})}
                className={`spot group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-xl border px-5 py-4 transition-colors ${i === 0 ? 'border-rose/40 bg-rose/[0.06]' : 'border-line bg-surface/60 hover:border-fg/20'}`}
              >
                <span className="font-mono text-xs text-faint">#{i + 1}</span>
                <span className="min-w-0">
                  <span className={`block truncate font-medium ${i === 0 ? 'text-lg' : ''}`}>{d.title}</span>
                  <span className="block truncate text-sm text-muted">{d.sub}</span>
                </span>
                <span className="text-right font-mono text-xs">
                  <span className={i === 0 ? 'text-rose' : 'text-faint'}>{score.toFixed(2)}</span>
                  <span className="mt-1 block h-1 w-14 overflow-hidden rounded-full bg-line">
                    <span className="block h-full rounded-full bg-rose transition-[width] duration-500" style={{ width: `${score * 100}%` }} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-32 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 font-mono text-[11px] text-faint sm:flex-row sm:items-center">
        <span>
          <span className="text-lime">✓</span> pipeline complete · 5/5 stages · © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="flex gap-5">
          {profile.socials.map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="hover:text-fg">
              {s.label.toLowerCase()}
            </a>
          ))}
          <a href="/resume/" className="hover:text-fg">
            résumé mode
          </a>
        </span>
      </footer>
    </section>
  );
}
