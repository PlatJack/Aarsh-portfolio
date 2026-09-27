'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { Json, type JsonValue } from './Json';
import { profile } from '@/lib/data';

type Region = {
  id: string;
  label: string;
  conf: number;
  color: string;
  delay: number; // seconds, roughly when the scanline passes it
  extract: JsonValue;
};

const regions: Record<string, Region> = {
  title: {
    id: 'title',
    label: 'TITLE',
    conf: 0.99,
    color: '#22d3ee',
    delay: 0.7,
    extract: { name: 'Aarsh Desai', role: 'Deep Learning Engineer', org: 'Nanonets', based_in: 'Bengaluru, IN' },
  },
  table: {
    id: 'table',
    label: 'TABLE',
    conf: 0.97,
    color: '#fbbf24',
    delay: 1.2,
    extract: {
      records: 5,
      current: 'DL Engineer @ Nanonets',
      research: ['IIT Bombay', 'IIT Madras', 'NIT PY'],
    },
  },
  list: {
    id: 'list',
    label: 'LIST',
    conf: 0.96,
    color: '#a3e635',
    delay: 1.65,
    extract: { publications: 4, years: '2024–25', venues: ['TALE', 'T4E', 'INDISCON'] },
  },
  text: {
    id: 'text',
    label: 'TEXT',
    conf: 0.94,
    color: '#fb7185',
    delay: 2.0,
    extract: { hobbies: ['competitive programming', 'hackathons'], platforms: 'CodeChef, LeetCode' },
  },
  stamp: {
    id: 'stamp',
    label: 'STAMP',
    conf: 0.92,
    color: '#a78bfa',
    delay: 2.3,
    extract: { institution: 'IIIT Dharwad', degree: 'BTech, Data Science & AI', year: 2025 },
  },
  sig: {
    id: 'sig',
    label: 'SIGNATURE',
    conf: 0.91,
    color: '#22d3ee',
    delay: 2.5,
    extract: { signed: true, status: 'open to interesting problems', contact: profile.email },
  },
};

const order = ['title', 'table', 'list', 'text', 'stamp', 'sig'];

function Box({ r }: { r: Region }) {
  return (
    <span className="det" style={{ '--c': r.color, '--d': `${r.delay}s` } as React.CSSProperties} aria-hidden>
      <span className="det-label">
        {r.label} {r.conf.toFixed(2)}
      </span>
    </span>
  );
}

function Region({
  id,
  active,
  onHover,
  className = '',
  children,
}: {
  id: string;
  active: string;
  onHover: (id: string | null) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`region relative ${className}`}
      data-active={active === id}
      onPointerEnter={() => onHover(id)}
      onPointerLeave={() => onHover(null)}
    >
      <Box r={regions[id]} />
      {children}
    </div>
  );
}

const bar = (w: string) => <span className="block h-[5px] rounded-full bg-ink/15" style={{ width: w }} />;

function Paper({ active, onHover }: { active: string; onHover: (id: string | null) => void }) {
  return (
    <div className="paper relative w-full overflow-visible rounded-[3px] px-7 pb-7 pt-8 sm:px-9">
      <div className="scanline" style={{ '--scan-h': '660px' } as React.CSSProperties} aria-hidden />

      <Region id="title" active={active} onHover={onHover} className="mb-6 text-center">
        <div className="font-serif text-[34px] leading-none tracking-tight">Aarsh Desai</div>
        <div className="mt-2 font-mono text-[9px] tracking-wide text-ink/60">
          desaiaarsh4@gmail.com · github/PlatJack · Bengaluru
        </div>
      </Region>

      <div className="mb-1.5 border-b border-ink/30 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/70">
        Experience
      </div>
      <Region id="table" active={active} onHover={onHover} className="mb-5">
        <table className="w-full text-left text-[10px] leading-[1.7]">
          <tbody>
            {[
              ['Nanonets', 'Deep Learning Engineer', '2025 –'],
              ['IIT Madras · RBCDSAI', 'Research Intern', '2024'],
              ['IIT Bombay · CET', 'Research Intern', '2023–24'],
              ['Vocab.Ai', 'MLOps Intern', '2023–24'],
              ['NIT Puducherry', 'DL Intern', '2023–24'],
            ].map(row => (
              <tr key={row[0]} className="border-b border-dashed border-ink/15 last:border-0">
                <td className="pr-2 font-semibold">{row[0]}</td>
                <td className="pr-2 italic text-ink/70">{row[1]}</td>
                <td className="text-right font-mono text-[9px] text-ink/60">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Region>

      <div className="mb-1.5 border-b border-ink/30 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/70">
        Publications
      </div>
      <Region id="list" active={active} onHover={onHover} className="mb-5">
        <ul className="space-y-1 text-[9.5px] leading-snug text-ink/80">
          <li>• Speaker Diarization with Whisper, <b>IEEE TALE ’24 · Best Paper</b></li>
          <li>• Triggers of SSMR in Collaborative Problem-Solving, T4E ’24</li>
          <li>• Energy-Efficient Depthwise CNNs for Lung Nodules, INDISCON ’25</li>
          <li>• Emotional Trajectories via Valence & Arousal, T4E ’25</li>
        </ul>
      </Region>

      <div className="grid grid-cols-[1fr_auto] items-end gap-5">
        <div>
          <div className="mb-1.5 border-b border-ink/30 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/70">
            Beyond work
          </div>
          <Region id="text" active={active} onHover={onHover}>
            <p className="text-[9.5px] leading-snug text-ink/80">
              Competitive programming on CodeChef and LeetCode. Hackathons too, including a win at Ganglia Tech.
            </p>
            <div className="mt-2 space-y-1.5">
              {bar('92%')}
              {bar('78%')}
            </div>
          </Region>
          <Region id="sig" active={active} onHover={onHover} className="mt-6 w-fit">
            <svg viewBox="0 0 160 44" className="h-9 w-32 text-ink/80" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M4 32c8-18 14-26 18-24s-6 26-2 26 10-22 16-22-2 18 4 18 8-14 14-14 0 12 6 12 10-10 16-10 2 8 8 8c8 0 14-6 22-8 10-2 20 0 30-2" />
            </svg>
          </Region>
        </div>
        <Region id="stamp" active={active} onHover={onHover} className="-rotate-12">
          <div className="grid size-[84px] place-items-center rounded-full border-[2.5px] border-double border-[#6d3fc9]/70 text-center text-[#6d3fc9]/80">
            <div className="font-mono text-[7px] font-bold uppercase leading-tight tracking-wider">
              IIIT
              <br />
              <span className="text-[11px]">Dharwad</span>
              <br />
              BTech · 2025
            </div>
          </div>
        </Region>
      </div>
    </div>
  );
}

const logLines = [
  { t: '$ pipeline run aarsh_desai.pdf', c: 'text-fg' },
  { t: '✓ layout_det    6 regions       42ms', c: 'text-muted' },
  { t: '✓ ocr           1,204 tokens    88ms', c: 'text-muted' },
  { t: '✓ vlm_extract   schema=portfolio.v2  conf=0.97', c: 'text-muted' },
  { t: '✓ embed         18 entities → latent space', c: 'text-muted' },
  { t: '→ scroll to run the pipeline ↓', c: 'text-cyan' },
];

export function Ingest() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [cycle, setCycle] = useState(0);

  // After the scan finishes, auto-cycle through regions until the visitor hovers one
  useEffect(() => {
    if (hovered) return;
    const start = setTimeout(() => {
      setCycle(c => c + 1);
    }, reduce ? 0 : 3000);
    return () => clearTimeout(start);
  }, [hovered, reduce, cycle]);

  const active = hovered ?? order[cycle % order.length];
  const region = regions[active];

  // Pointer-driven 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section id="ingest" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28">
      {/* Backdrop: grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_70%_at_60%_40%,#000_30%,transparent_100%)]" />
        <div className="absolute right-[5%] top-[10%] size-[520px] rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute bottom-0 left-[10%] size-[380px] rounded-full bg-violet/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="fade-up">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 font-mono text-[11px] text-muted backdrop-blur">
            <span className="relative flex size-2">
              <span className="ping absolute inline-flex size-full rounded-full bg-cyan opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan" />
            </span>
            stage 01 · ingest · aarsh_desai.pdf
          </div>
          <h1 className="text-6xl font-semibold leading-[0.9] tracking-[-0.04em] sm:text-8xl">
            Aarsh
            <br />
            Desai<span className="text-cyan">.</span>
          </h1>
          <p className="mt-6 max-w-lg font-serif text-3xl leading-tight text-fg/90 sm:text-4xl">
            I build AI that <em className="text-cyan text-glow">reads</em> the messy real world, and agents that{' '}
            <em className="text-violet">remember</em>.
          </p>
          <p className="mt-5 max-w-md text-muted">
            Deep Learning Engineer at{' '}
            <a href={profile.company.url} target="_blank" rel="noreferrer" className="text-fg underline decoration-line underline-offset-4 hover:decoration-cyan">
              Nanonets
            </a>
            , working on document understanding and memory for AI agents. Before this I was a research intern at IIT Bombay and IIT Madras.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#extract" className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.03]">
              Run the pipeline
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a href="/resume/" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-5 py-3 text-sm backdrop-blur transition-colors hover:border-fg/30">
              Résumé mode
            </a>
          </div>

          <div className="mt-10 max-w-md rounded-xl border border-line bg-surface/70 p-4 font-mono text-[11.5px] leading-6 backdrop-blur">
            {logLines.map((l, i) => (
              <div key={i} className={`log-line whitespace-pre ${l.c}`} style={{ '--d': `${2.8 + i * 0.28}s` } as React.CSSProperties}>
                {l.t}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[440px] [perspective:1400px]" onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0); }}>
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -2.5 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
          >
            <Paper active={active} onHover={setHovered} />
          </motion.div>

          {/* Extracted output for the active region */}
          <div className="relative z-10 mx-auto -mt-10 w-[92%] rounded-xl border border-line bg-[#0a0c0e]/90 shadow-2xl backdrop-blur-xl lg:absolute lg:-bottom-16 lg:-left-28 lg:mt-0 lg:w-[290px]">
            <div className="flex items-center justify-between border-b border-line px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider text-faint">
              <span>
                extracted · <span style={{ color: region.color }}>{region.label.toLowerCase()}</span>
              </span>
              <span>conf {region.conf.toFixed(2)}</span>
            </div>
            <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="h-[170px] p-3.5">
              <Json value={region.extract} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
