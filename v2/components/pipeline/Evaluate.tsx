'use client';

import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { achievements, metrics, skills, type Metric } from '@/lib/data';
import { StageHeader } from './StageHeader';

function Counter({ to, suffix = '', prefix = '', start }: { to: number; suffix?: string; prefix?: string; start: boolean }) {
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduce) return setN(to);
    const controls = animate(0, to, { duration: 1.4, ease: [0.2, 0.7, 0.2, 1], onUpdate: v => setN(v) });
    return () => controls.stop();
  }, [start, to, reduce]);
  return (
    <>
      {prefix}
      {Math.round(n)}
      {suffix}
    </>
  );
}

function Row({ m, i, start }: { m: Metric; i: number; start: boolean }) {
  const color = m.direction === 'down' ? '#a3e635' : m.direction === 'abs' ? '#22d3ee' : '#fbbf24';
  const prefix = m.direction === 'up' ? '+' : m.direction === 'down' ? '−' : '';
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-b border-line py-5 last:border-0 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_72px]">
      <div>
        <div className="font-medium">{m.label}</div>
        <div className="mt-0.5 text-[13px] text-faint">{m.context}</div>
      </div>
      <div className="col-span-2 row-start-2 h-2 overflow-hidden rounded-full bg-line sm:col-span-1 sm:row-start-auto">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}33, ${color})`, boxShadow: `0 0 18px ${color}66` }}
          initial={{ width: 0 }}
          animate={{ width: start ? `${m.value}%` : 0 }}
          transition={{ duration: 1.2, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
        />
      </div>
      <div className="text-right font-mono text-lg font-semibold tabular-nums sm:text-xl" style={{ color }}>
        <Counter to={m.value} prefix={prefix} suffix="%" start={start} />
      </div>
    </div>
  );
}

export function Evaluate() {
  const table = useRef<HTMLDivElement>(null);
  const inView = useInView(table, { once: true, margin: '-15% 0px' });

  return (
    <section id="evaluate" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
      <StageHeader index={4} stage="Evaluate" accent="#a3e635" title={<>What the work measured.</>}>
        Results from projects I’ve been part of, each against its own baseline. Nearly all of it was team work,
        with colleagues and mentors who taught me a lot.
      </StageHeader>

      <div ref={table} className="reveal rounded-3xl border border-line bg-surface/70 px-5 sm:px-8">
        <div className="hidden grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_72px] gap-x-6 border-b border-line py-3 font-mono text-[10.5px] uppercase tracking-wider text-faint sm:grid">
          <span>metric</span>
          <span>Δ vs baseline</span>
          <span className="text-right">result</span>
        </div>
        {metrics.map((m, i) => (
          <Row key={m.label} m={m} i={i} start={inView} />
        ))}
      </div>

      <h3 className="reveal mb-6 mt-24 font-mono text-xs uppercase tracking-[0.25em] text-lime">Along the way</h3>
      <ul className="reveal divide-y divide-line border-y border-line">
        {achievements.map(a => (
          <li key={a.title} className="grid gap-1 py-4 sm:grid-cols-[280px_1fr] sm:gap-8">
            <span className="font-medium">{a.title}</span>
            <span className="text-muted">{a.detail}</span>
          </li>
        ))}
      </ul>

      <h3 className="reveal mb-8 mt-24 font-mono text-xs uppercase tracking-[0.25em] text-lime">Dependencies</h3>
      <div className="reveal overflow-hidden rounded-3xl border border-line bg-surface/70 font-mono text-[13px]">
        <div className="border-b border-line px-5 py-2.5 text-[10.5px] uppercase tracking-wider text-faint">requirements.txt</div>
        <div className="divide-y divide-line">
          {skills.map(s => (
            <div key={s.group} className="grid gap-2 px-5 py-4 sm:grid-cols-[200px_1fr]">
              <span className="text-faint"># {s.group.toLowerCase()}</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {s.items.map(item => (
                  <span key={item} className="text-fg/90 transition-colors hover:text-lime">
                    {item.toLowerCase().replace(/\s+/g, '-')}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
