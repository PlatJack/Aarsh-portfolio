import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  achievements,
  education,
  experience,
  leadership,
  profile,
  projects,
  publications,
  skills,
} from '@/lib/data';

const nav = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#research', label: 'Research' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-3.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}

function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="reveal border-t border-line py-16 sm:py-20">
      <h2 className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-faint">{label}</h2>
      {children}
    </section>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          aarsh<span className="text-accent">.</span>desai
        </a>
        <nav className="flex items-center gap-1">
          <ul className="mr-2 hidden items-center gap-1 sm:flex">
            {nav.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/"
            className="rounded-full border border-line px-3 py-1.5 text-sm transition-colors hover:border-fg/40"
          >
            ← Pipeline view
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pb-16 pt-16 sm:pb-20 sm:pt-24">
      <div className="grid-bg pointer-events-none absolute inset-x-[-50vw] top-0 -z-10 h-[520px]" aria-hidden />
      <div className="fade-up flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a
            href={profile.company.url}
            target="_blank"
            rel="noreferrer"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted transition-colors hover:text-fg"
          >
            <span className="relative flex size-2">
              <span className="ping absolute inline-flex size-full rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Building Document AI at {profile.company.name}
          </a>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
          <p className="mt-3 text-lg text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>
        <Image
          src="/aarsh.jpg"
          alt={`Portrait of ${profile.name}`}
          width={120}
          height={120}
          priority
          className="size-24 rounded-2xl border border-line object-cover sm:size-28"
        />
      </div>
      <p className="fade-up mt-8 max-w-2xl text-xl leading-relaxed text-balance [animation-delay:120ms] sm:text-2xl">
        {profile.tagline}
      </p>
      <div className="fade-up mt-8 flex flex-wrap items-center gap-3 [animation-delay:200ms]">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          Get in touch
        </a>
        {profile.socials
          .filter(s => s.label !== 'Email')
          .map(s => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-fg/40"
            >
              {s.label}
              <Arrow className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" label="About">
      <div className="space-y-5 text-[17px] leading-relaxed text-muted">
        {profile.about.map((p, i) => (
          <p key={i} className={i === 0 ? 'text-fg' : undefined}>
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}

function Work() {
  return (
    <Section id="work" label="Experience">
      <ol className="space-y-12">
        {experience.map(job => (
          <li key={job.company} className="grid gap-2 sm:grid-cols-[150px_1fr] sm:gap-8">
            <div className="font-mono text-xs leading-6 text-faint">
              {job.roles.map(r => (
                <div key={r.title}>{r.period}</div>
              ))}
            </div>
            <div>
              <h3 className="font-medium">
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 hover:text-accent">
                    {job.company}
                    <Arrow className="text-faint group-hover:text-accent" />
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <div className="mt-1 space-y-0.5 text-sm text-muted">
                {job.roles.map((r, i) => (
                  <div key={r.title} className={i > 0 ? 'text-faint' : undefined}>
                    {r.title}
                    {i === 0 && <span className="text-faint"> · {job.location}</span>}
                  </div>
                ))}
              </div>
              <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-muted">
                {job.points.map(p => (
                  <li key={p} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:size-1 before:rounded-full before:bg-faint">
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.tags.map(t => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function highlightMe(authors: string) {
  const parts = authors.split(/(Desai, A\.)/);
  return parts.map((part, i) =>
    part === 'Desai, A.' ? (
      <span key={i} className="font-medium text-fg">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function Research() {
  return (
    <Section id="research" label="Publications">
      <ul className="divide-y divide-line">
        {publications.map(pub => {
          const Title = pub.url ? 'a' : 'span';
          return (
            <li key={pub.title} className="grid gap-2 py-6 first:pt-0 last:pb-0 sm:grid-cols-[150px_1fr] sm:gap-8">
              <div className="flex flex-wrap items-start gap-2 sm:flex-col">
                <span className="font-mono text-xs text-faint">{pub.venueShort}</span>
                {pub.award && (
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                    ★ {pub.award}
                  </span>
                )}
              </div>
              <div>
                <Title
                  {...(pub.url ? { href: pub.url, target: '_blank', rel: 'noreferrer' } : {})}
                  className={`font-medium leading-snug ${pub.url ? 'group transition-colors hover:text-accent' : ''}`}
                >
                  {pub.title}
                  {pub.url && <Arrow className="ml-1 inline text-faint group-hover:text-accent" />}
                </Title>
                <p className="mt-2 text-sm leading-relaxed text-faint">{highlightMe(pub.authors)}</p>
                <p className="mt-1 text-sm italic text-faint">{pub.venue}</p>
                {pub.note && <p className="mt-1 font-mono text-xs text-faint">{pub.note}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" label="Project">
      <div className="grid gap-4">
        {projects.map(p => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-fg/25"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-medium leading-snug">{p.title}</h3>
              <Arrow className="mt-1 shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
            {p.points && (
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                {p.points.map(pt => (
                  <li key={pt} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:size-1 before:rounded-full before:bg-faint">
                    {pt}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map(t => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Achievements() {
  return (
    <Section id="achievements" label="Honours">
      <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {achievements.map(a => (
          <li key={a.title} className="border-l-2 border-accent/60 pl-4">
            <div className="font-medium">{a.title}</div>
            <div className="mt-1 text-sm text-muted">{a.detail}</div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" label="Toolkit">
      <dl className="space-y-5">
        {skills.map(s => (
          <div key={s.group} className="grid gap-2 sm:grid-cols-[150px_1fr] sm:gap-8">
            <dt className="text-sm text-faint sm:pt-1">{s.group}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {s.items.map(i => (
                <span key={i} className="rounded-lg border border-line bg-surface px-2.5 py-1 text-sm">
                  {i}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" label="Education & leadership">
      <ul className="space-y-6">
        {education.map(e => (
          <li key={e.school} className="grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-8">
            <div className="font-mono text-xs leading-6 text-faint">{e.period}</div>
            <div>
              <div className="font-medium">{e.school}</div>
              <div className="mt-1 text-sm text-muted">
                {e.degree} <span className="text-faint">· {e.detail}</span>
              </div>
            </div>
          </li>
        ))}
        {leadership.map(l => (
          <li key={l.org} className="grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-8">
            <div className="font-mono text-xs leading-6 text-faint">{l.period}</div>
            <div>
              <div className="font-medium">{l.role}</div>
              <div className="mt-1 text-sm text-muted">{l.org}</div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" label="Contact">
      <h3 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Working on something in AI? I’d love to hear about it.
      </h3>
      <p className="mt-4 max-w-xl text-muted">
        I’m happy to talk about research collaborations, interesting problems in Document AI and
        agents, or just to swap notes.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          {profile.email}
        </a>
        <a
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1 rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-fg/40"
        >
          Download resume
          <Arrow className="text-faint" />
        </a>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col gap-3 border-t border-line py-8 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <div className="flex gap-5">
        {profile.socials.map(s => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

export const metadata = { title: `${profile.name} · Résumé` };

export default function ResumePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl overflow-x-clip px-5">
        <Hero />
        <About />
        <Work />
        <Research />
        <Projects />
        <Achievements />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
