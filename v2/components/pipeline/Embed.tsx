'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { clusters, mapItems, projects, publications } from '@/lib/data';
import { StageHeader } from './StageHeader';

const EmbedMap = dynamic(() => import('./EmbedMap'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center font-mono text-xs text-faint">
      <span className="caret">projecting {mapItems.length} entities into latent space</span>
    </div>
  ),
});

const kindLabel = { paper: 'publication', project: 'project', work: 'experience', award: 'honour' } as const;

function highlightMe(authors: string) {
  return authors.split(/(Desai, A\.)/).map((part, i) =>
    part === 'Desai, A.' ? (
      <span key={i} className="font-medium text-fg">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function Embed() {
  const reduce = useReducedMotion() ?? false;
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);

  // Open a paper by default on larger screens
  useEffect(() => {
    if (window.innerWidth >= 640) setSelected('tale');
  }, []);

  // Load the WebGL scene only when it approaches the viewport, and pause it off-screen
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const item = mapItems.find(i => i.id === selected);
  const itemCluster = clusters.find(c => c.id === item?.cluster);

  return (
    <section id="embed" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
      <StageHeader index={3} stage="Embed" accent="#a78bfa" title={<>A map of everything I’ve worked on.</>} />

      <div ref={wrap} id="embed-map" className="reveal relative h-[64vh] min-h-[480px] sm:h-[78vh] sm:min-h-[520px] overflow-hidden rounded-3xl border border-line bg-[radial-gradient(ellipse_at_center,#0f1216_0%,#060708_70%)]">
        {mounted && (
          <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
            <EmbedMap selected={selected} focus={focus} onSelect={setSelected} reduce={reduce} active={inView} />
          </div>
        )}

        {/* Cluster legend */}
        <div className="absolute inset-x-3 top-3 z-[60] flex gap-1.5 overflow-x-auto [scrollbar-width:none] sm:inset-x-5 sm:top-5 sm:flex-wrap">
          <button
            onClick={() => setFocus(null)}
            className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10.5px] backdrop-blur transition-colors ${!focus ? 'border-fg/40 bg-fg/10 text-fg' : 'border-line bg-black/40 text-muted hover:text-fg'}`}
          >
            all
          </button>
          {clusters.map(c => (
            <button
              key={c.id}
              onClick={() => setFocus(f => (f === c.id ? null : c.id))}
              className="flex shrink-0 items-center gap-1.5 rounded-full border bg-black/40 px-2.5 py-1 font-mono text-[10.5px] backdrop-blur transition-colors"
              style={{ borderColor: focus === c.id ? c.color : 'var(--line)', color: focus === c.id ? c.color : 'var(--muted)' }}
            >
              <span className="size-1.5 rounded-full" style={{ background: c.color }} />
              {c.label}
            </button>
          ))}
        </div>

        {/* Selected node card */}
        <AnimatePresence mode="wait">
          {item && itemCluster && (
            <motion.div
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-3 bottom-3 z-[60] rounded-2xl border border-line bg-[#0a0c0e]/85 p-4 backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[340px]"
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
                <span style={{ color: item.gold ? '#fcd34d' : itemCluster.color }}>
                  {kindLabel[item.kind]} · {itemCluster.label}
                </span>
                <button onClick={() => setSelected(null)} aria-label="Close" className="text-faint hover:text-fg">
                  ✕
                </button>
              </div>
              <div className="mt-2 font-medium leading-snug">{item.label}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.detail}</p>
              {item.url && (
                <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-block font-mono text-xs text-cyan hover:underline">
                  open ↗
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pointer-events-none absolute bottom-5 left-5 hidden font-mono text-[10px] uppercase tracking-wider text-faint sm:block">
          ✦ paper · ◆ project · ● role · ★ honour
        </div>
      </div>

      {/* Publications: also the accessible, crawlable version of the map */}
      <div className="mt-24">
        <h3 className="reveal mb-8 flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.25em] text-violet">
          Publications <span className="text-faint">{publications.length} peer-reviewed</span>
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {publications.map(pub => {
            const Card = pub.url ? 'a' : 'div';
            return (
              <Card
                key={pub.title}
                {...(pub.url ? { href: pub.url, target: '_blank', rel: 'noreferrer' } : {})}
                className={`spot reveal group flex flex-col rounded-2xl border bg-surface/70 p-6 transition-transform border-line ${pub.url ? 'hover:-translate-y-1' : ''}`}
              >
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider">
                  <span className="rounded-md border border-line px-2 py-0.5 text-fg">{pub.venueShort}</span>
                  {pub.award && (
                    <span className="rounded-md border border-amber/30 px-2 py-0.5 text-amber/90">{pub.award}</span>
                  )}
                </div>
                <div className="mt-4 flex-1 text-lg font-medium leading-snug tracking-tight">
                  {pub.title}
                  {pub.url && <span className="ml-1 text-faint transition-colors group-hover:text-cyan">↗</span>}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-faint">{highlightMe(pub.authors)}</p>
                <p className="mt-1.5 font-serif text-[15px] italic text-muted">{pub.venue}</p>
                {pub.note && <p className="mt-1 font-mono text-[11px] text-faint">{pub.note}</p>}
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mt-24">
        <h3 className="reveal mb-8 font-mono text-xs uppercase tracking-[0.25em] text-violet">Project</h3>
        <div className="space-y-4">
          {projects.map(p => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="spot reveal group grid gap-6 rounded-2xl border border-line bg-surface/70 p-6 transition-transform hover:-translate-y-1 sm:p-8 md:grid-cols-[1fr_1.2fr]"
            >
              <div>
                <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-wider text-faint">
                  {p.date && <span>{p.date}</span>}
                  <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan">github ↗</span>
                </div>
                <div className="mt-3 text-2xl font-semibold leading-tight tracking-tight">{p.title}</div>
                <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map(t => (
                    <span key={t} className="rounded-md border border-violet/25 bg-violet/[0.06] px-2 py-0.5 font-mono text-[11px] text-violet/90">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {p.points && (
                <ul className="space-y-2.5 self-center text-[15px] leading-relaxed text-muted">
                  {p.points.map(pt => (
                    <li key={pt} className="grid grid-cols-[14px_1fr] gap-2">
                      <span className="mt-[9px] h-px w-2.5 bg-violet/60" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
