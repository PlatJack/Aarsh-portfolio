// Tiny syntax-highlighted JSON renderer (no dependencies)

type Value = string | number | boolean | null | Value[] | { [k: string]: Value };

const pad = (n: number) => '  '.repeat(n);

function Node({ value, depth }: { value: Value; depth: number }) {
  if (value === null) return <span className="text-faint">null</span>;
  if (typeof value === 'string') return <span className="text-lime">&quot;{value}&quot;</span>;
  if (typeof value === 'number') return <span className="text-amber">{value}</span>;
  if (typeof value === 'boolean') return <span className="text-violet">{String(value)}</span>;

  if (Array.isArray(value)) {
    const inline = value.every(v => typeof v !== 'object' || v === null) && JSON.stringify(value).length < 28;
    if (inline) {
      return (
        <>
          [
          {value.map((v, i) => (
            <span key={i}>
              <Node value={v} depth={depth + 1} />
              {i < value.length - 1 && ', '}
            </span>
          ))}
          ]
        </>
      );
    }
    return (
      <>
        [{'\n'}
        {value.map((v, i) => (
          <span key={i}>
            {pad(depth + 1)}
            <Node value={v} depth={depth + 1} />
            {i < value.length - 1 && ','}
            {'\n'}
          </span>
        ))}
        {pad(depth)}]
      </>
    );
  }

  const entries = Object.entries(value);
  return (
    <>
      {'{'}
      {'\n'}
      {entries.map(([k, v], i) => (
        <span key={k}>
          {pad(depth + 1)}
          <span className="text-cyan">&quot;{k}&quot;</span>: <Node value={v} depth={depth + 1} />
          {i < entries.length - 1 && ','}
          {'\n'}
        </span>
      ))}
      {pad(depth)}
      {'}'}
    </>
  );
}

export function Json({ value, className = '' }: { value: Value; className?: string }) {
  return (
    <pre className={`overflow-x-auto font-mono text-[12px] leading-[1.6] text-muted ${className}`}>
      <Node value={value} depth={0} />
    </pre>
  );
}

export type { Value as JsonValue };
