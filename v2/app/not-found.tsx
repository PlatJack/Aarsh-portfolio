export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center px-5">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page doesn’t exist.</h1>
      <a href="/" className="mt-8 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg">
        Back home
      </a>
    </main>
  );
}
