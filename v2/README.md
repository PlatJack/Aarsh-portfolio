# aarsh.desai

Personal site of Aarsh Desai, Deep Learning Engineer at Nanonets.

The home page is **The Pipeline**: the portfolio runs through a Document AI pipeline as you scroll:
Ingest (a scanned résumé gets parsed live), Extract (experience as structured records), Embed (a 3D map of
papers and projects), Evaluate (impact benchmarks) and Retrieve (contact as a search). Press ⌘K or `/` for the
command palette, and try `help` in it. `/resume` is a fast, minimal résumé mode.

Built with Next.js 16 (static export), Tailwind CSS v4, Motion, and React Three Fiber. The 3D scene is loaded lazily and pauses when off-screen.

## Editing content

All content lives in [`lib/data.ts`](lib/data.ts), including the benchmark metrics and the 3D map's clusters and nodes.
The parsed-résumé hero lives in [`components/pipeline/Ingest.tsx`](components/pipeline/Ingest.tsx).
To update the downloadable resume, replace `public/Aarsh_Desai_Resume.pdf`.

## Develop

```bash
npm install
npm run dev
```

## Deploy

`npm run build` writes a fully static site to `out/`. Netlify builds it via `netlify.toml` at the repo root (base directory `v2`).
