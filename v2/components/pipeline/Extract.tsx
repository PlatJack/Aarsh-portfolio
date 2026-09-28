'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useRef, useState } from 'react';
import { experience, education, leadership, type Job } from '@/lib/data';
import { Json } from './Json';
import { StageHeader } from './StageHeader';

function toRecord(job: Job) {
  return {
    org: job.company,
    roles: job.roles.map(r => `${r.title} (${r.period.replace(' — ', '–')})`),
    location: job.location,
    entities: job.tags,
  };
}

function Record({ job, index, mode }: { job: Job; index: number; mode: 'rendered' | 'json' }) {
  const current = job.roles[0].period.includes('Present');
  return (
    <li className="reveal relative pl-10 sm:pl-14">
      {/* Timeline node */}
      <span
        className={`absolute left-[7px] top-6 size-[15px] rounded-full border-2 sm:left-[15px] ${current ? 'border-cyan bg-cyan/30 shadow-[0_0_20px_#22d3ee]' : 'border-faint bg-bg'}`}
        aria-hidden
      />
      <article className="spot overflow-hidden rounded-2xl border border-line bg-surface/80">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-black/20 px-5 py-2.5 font-mono text-[10.5px] uppercase tracking-wider text-faint">
          <span>
            record_{String(index + 1).padStart(2, '0')} · <span className="text-cyan">employment</span>
            {current && <span className="ml-2 rounded bg-cyan/15 px-1.5 py-0.5 text-cyan">live</span>}
          </span>
          <span>{job.roles.map(r => r.period).join(' · ')}</span>
        </div>

        {mode === 'json' ? (
          <div className="p-5">
            <Json value={{ ...toRecord(job), highlights: job.points.length }} />
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noreferrer" className="hover:text-cyan">
                    {job.company} ↗
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <span className="font-mono text-xs text-faint">{job.location}</span>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {job.roles.map((r, i) => (
                <span key={r.title} className={i === 0 ? 'text-fg' : 'text-faint'}>
                  {r.title}
                  {i > 0 && <span className="text-faint"> (prev.)</span>}
                </span>
              ))}
            </div>
            <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-muted">
              {job.points.map(p => (
                <li key={p} className="grid grid-cols-[14px_1fr] gap-2">
                  <span className="mt-[9px] h-px w-2.5 bg-cyan/60" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {job.tags.map(t => (
                <span key={t} className="rounded-md border border-cyan/20 bg-cyan/[0.06] px-2 py-0.5 font-mono text-[11px] text-cyan/90">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </li>
  );
}

export function Extract() {
  const [mode, setMode] = useState<'rendered' | 'json'>('rendered');
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="extract" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
      <StageHeader index={2} stage="Extract" accent="#fbbf24" title={<>Structured from five labs &amp; teams.</>} />

      <div className="mb-8 flex justify-end">
        <div role="tablist" aria-label="View mode" className="inline-flex rounded-full border border-line bg-surface p-1 font-mono text-xs">
          {(['rendered', 'json'] as const).map(m => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`rounded-full px-3.5 py-1.5 transition-colors ${mode === m ? 'bg-fg text-bg' : 'text-muted hover:text-fg'}`}
            >
              {m === 'json' ? '{ } json' : 'rendered'}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-[14px] top-0 w-px bg-line sm:left-[22px]" aria-hidden />
        <motion.div
          className="absolute left-[14px] top-0 w-px origin-top bg-gradient-to-b from-cyan via-amber to-rose sm:left-[22px]"
          style={{ scaleY: progress, height: '100%' }}
          aria-hidden
        />
        <ol ref={listRef} className="space-y-8">
          {experience.map((job, i) => (
            <Record key={job.company} job={job} index={i} mode={mode} />
          ))}
        </ol>
      </div>

      <div className="reveal mt-16 grid gap-4 sm:grid-cols-2">
        {education.map(e => (
          <div key={e.school} className="spot rounded-2xl border border-line bg-surface/60 p-5">
            <div className="font-mono text-[10.5px] uppercase tracking-wider text-faint">
              <span className="text-amber">education</span> · {e.period}
            </div>
            <div className="mt-2 font-medium">{e.school}</div>
            <div className="mt-1 text-sm text-muted">
              {e.degree} · <span className="text-fg">{e.detail}</span>
            </div>
          </div>
        ))}
        {leadership.map(l => (
          <div key={l.org} className="spot rounded-2xl border border-line bg-surface/60 p-5">
            <div className="font-mono text-[10.5px] uppercase tracking-wider text-faint">
              <span className="text-amber">leadership</span> · {l.period}
            </div>
            <div className="mt-2 font-medium">{l.role}</div>
            <div className="mt-1 text-sm text-muted">{l.org}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
