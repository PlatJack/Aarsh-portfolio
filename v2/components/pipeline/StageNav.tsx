'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export const stages = [
  { id: 'ingest', label: 'Ingest', color: '#22d3ee' },
  { id: 'extract', label: 'Extract', color: '#fbbf24' },
  { id: 'embed', label: 'Embed', color: '#a78bfa' },
  { id: 'evaluate', label: 'Evaluate', color: '#a3e635' },
  { id: 'retrieve', label: 'Retrieve', color: '#fb7185' },
];

export function StageNav() {
  const [active, setActive] = useState('ingest');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    stages.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const current = stages.find(s => s.id === active) ?? stages[0];
  const idx = stages.indexOf(current);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#060708]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#ingest" className="shrink-0 font-mono text-sm font-medium tracking-tight">
          aarsh<span style={{ color: current.color }}>.</span>desai
        </a>

        <nav aria-label="Pipeline stages" className="hidden items-center md:flex">
          {stages.map((s, i) => {
            const done = i < idx;
            const on = i === idx;
            return (
              <div key={s.id} className="flex items-center">
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-2 rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors"
                  style={{ color: on ? s.color : done ? 'var(--muted)' : 'var(--faint)', background: on ? `${s.color}14` : 'transparent' }}
                  aria-current={on ? 'step' : undefined}
                >
                  <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                  {done && <span className="text-lime">✓</span>}
                </a>
                {i < stages.length - 1 && <span className="mx-0.5 h-px w-4 bg-line" aria-hidden />}
              </div>
            );
          })}
        </nav>

        <span className="font-mono text-[11px] uppercase tracking-wider md:hidden" style={{ color: current.color }}>
          {String(idx + 1).padStart(2, '0')} · {current.label}
        </span>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event('open-palette'))}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:text-fg"
            aria-label="Open command palette"
          >
            <kbd>⌘K</kbd>
          </button>
          <a href="/resume/" className="hidden rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:text-fg sm:block">
            Résumé mode
          </a>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left"
        style={{ scaleX: progress, background: 'linear-gradient(90deg,#22d3ee,#fbbf24,#a78bfa,#a3e635,#fb7185)' }}
        aria-hidden
      />
    </header>
  );
}
