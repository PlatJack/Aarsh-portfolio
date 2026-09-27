export function StageHeader({
  index,
  stage,
  title,
  accent,
  children,
}: {
  index: number;
  stage: string;
  title: React.ReactNode;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="reveal mb-14 max-w-3xl">
      <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>
        <span className="grid size-7 place-items-center rounded-md border" style={{ borderColor: `${accent}55`, background: `${accent}12` }}>
          {String(index).padStart(2, '0')}
        </span>
        {stage}
        <span className="h-px w-16" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />
      </div>
      <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">{title}</h2>
      {children && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{children}</p>}
    </header>
  );
}
