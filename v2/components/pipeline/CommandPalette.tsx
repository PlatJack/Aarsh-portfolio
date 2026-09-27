'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '@/lib/data';
import { stages } from './StageNav';

type Command = {
  id: string;
  label: string;
  group: 'Navigate' | 'Links' | 'Actions' | 'Easter egg';
  hint?: string;
  keys?: string;
  hidden?: boolean;
  run: (toast: (msg: string) => void) => void;
};

const go = (hash: string) => () => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
const open = (url: string) => () => window.open(url, '_blank', 'noopener');

const commands: Command[] = [
  ...stages.map((s, i) => ({
    id: s.id,
    label: `Go to ${s.label}`,
    group: 'Navigate' as const,
    hint: `0${i + 1}`,
    keys: { ingest: 'home top hero', extract: 'experience work jobs', embed: 'papers research projects map', evaluate: 'metrics awards skills', retrieve: 'contact search' }[s.id],
    run: go(s.id),
  })),
  {
    id: 'copy-email',
    label: 'Copy email address',
    group: 'Actions',
    hint: profile.email,
    keys: 'contact mail',
    run: toast => {
      navigator.clipboard?.writeText(profile.email).then(
        () => toast(`Copied ${profile.email}`),
        () => toast(profile.email)
      );
    },
  },
  { id: 'resume-mode', label: 'Switch to résumé mode', group: 'Actions', keys: 'simple plain minimal', run: () => (window.location.href = '/resume/') },
  { id: 'pdf', label: 'Open résumé PDF', group: 'Links', keys: 'cv download', run: open(profile.resume) },
  { id: 'github', label: 'GitHub', group: 'Links', hint: '@PlatJack', keys: 'code', run: open(profile.socials[0].url) },
  { id: 'linkedin', label: 'LinkedIn', group: 'Links', run: open(profile.socials[1].url) },
  { id: 'tale', label: 'Read the TALE 2024 paper', group: 'Links', hint: 'speaker diarization', keys: 'diarization whisper', run: open('https://doi.org/10.1109/TALE62452.2024.10834319') },
  {
    id: 'hire',
    label: 'sudo hire aarsh',
    group: 'Easter egg',
    hidden: true,
    run: toast => {
      toast('[sudo] permission granted ✓ Opening mail client…');
      setTimeout(() => (window.location.href = `mailto:${profile.email}?subject=Let%E2%80%99s%20work%20together`), 900);
    },
  },
  { id: 'now', label: 'cat now.txt', group: 'Easter egg', hidden: true, run: toast => toast('Currently working on document understanding and agent memory at Nanonets. Always happy to learn from people doing similar work.') },
  { id: 'rm', label: 'rm -rf /', group: 'Easter egg', hidden: true, run: toast => toast('Nice try. This portfolio is read-only. 🙂') },
  { id: 'help', label: 'help', group: 'Easter egg', hidden: true, run: toast => toast('Try: cat now.txt · sudo hire aarsh') },
];

export function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(m => (m === msg ? null : m)), 3200);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof Element && e.target.closest('input, textarea, [contenteditable]');
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-palette', onOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQ('');
      setSel(0);
      setTimeout(() => input.current?.focus(), 10);
    }
  }, [isOpen]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands.filter(c => !c.hidden);
    return commands.filter(c =>
      c.hidden ? s.length >= 3 && c.label.startsWith(s) : `${c.label} ${c.keys ?? ''} ${c.hint ?? ''}`.toLowerCase().includes(s)
    );
  }, [q]);

  const runAt = (i: number) => {
    const cmd = list[i];
    if (!cmd) return;
    setOpen(false);
    cmd.run(toast);
  };

  let lastGroup = '';

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-[#0b0d0f]/95 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <span className="font-mono text-cyan">›</span>
                <input
                  ref={input}
                  value={q}
                  onChange={e => {
                    setQ(e.target.value);
                    setSel(0);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setSel(s => Math.min(s + 1, list.length - 1));
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setSel(s => Math.max(s - 1, 0));
                    } else if (e.key === 'Enter') {
                      runAt(sel);
                    }
                  }}
                  placeholder="Type a command… (try “help”)"
                  className="h-12 w-full bg-transparent font-mono text-sm outline-none placeholder:text-faint"
                  aria-label="Command"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">esc</kbd>
              </div>
              <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
                {list.length === 0 && <li className="px-3 py-6 text-center font-mono text-xs text-faint">command not found: {q}</li>}
                {list.map((c, i) => {
                  const header = c.group !== lastGroup ? c.group : null;
                  lastGroup = c.group;
                  return (
                    <li key={c.id}>
                      {header && <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-wider text-faint">{header}</div>}
                      <button
                        role="option"
                        aria-selected={i === sel}
                        onMouseEnter={() => setSel(i)}
                        onClick={() => runAt(i)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${i === sel ? 'bg-white/[0.07] text-fg' : 'text-muted'}`}
                      >
                        <span className={c.group === 'Easter egg' ? 'font-mono text-lime' : ''}>{c.label}</span>
                        {c.hint && <span className="font-mono text-[11px] text-faint">{c.hint}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-1/2 z-[95] w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-xl border border-line bg-[#0b0d0f]/95 px-4 py-3 font-mono text-xs text-fg shadow-2xl backdrop-blur"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
