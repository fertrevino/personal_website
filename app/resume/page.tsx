import Link from "next/link";
import {
  summary,
  experience,
  education,
  skills,
  certifications,
  projects,
  awards,
  languages,
} from "@/lib/resume";

export const metadata = {
  title: "Resume — Fernando Trevino",
  description:
    "Senior Software Engineer specializing in cloud, data, AI and DevOps. 6+ years building data platforms, ML pipelines, and infrastructure at scale.",
};

export default function ResumePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050914] via-[#071127] to-[#0c1a37] text-slate-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/5 top-[-6%] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-10%] top-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute left-[8%] bottom-[-8%] h-72 w-72 rounded-full bg-emerald-400/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-10 md:px-10 lg:px-14">
        {/* Header */}
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div id="resume-avatar" className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-semibold uppercase tracking-tight text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
              FT
            </div>
            <div className="space-y-0.5">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Resume</p>
              <h1 id="resume-name" className="text-2xl font-semibold text-white sm:text-3xl">Fernando Trevino</h1>
              <p className="text-sm text-slate-400">Frankfurt, Germany · fernando.yanez.trevino@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-100 transition hover:border-white/30 hover:text-white"
            >
              ← Back home
            </Link>
            <a
              href="/resume.pdf"
              download
              className="rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01]"
            >
              Download PDF
            </a>
          </div>
        </header>

        {/* Summary */}
        <section id="resume-summary" className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
            <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
            Summary
          </div>
          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            {summary}
          </p>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Experience */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
                Experience
              </div>
              <div className="mt-5 flex flex-col gap-8">
                {experience.map((job) => (
                  <div key={job.company} className="resume-entry flex gap-4">
                    <div className="mt-1.5 h-full w-0.5 shrink-0 rounded-full bg-gradient-to-b from-cyan-300/60 to-indigo-400/20" />
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white">{job.company}</h3>
                      <p className="text-sm text-cyan-300">{job.role}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{job.location} · {job.period}</p>
                      <ul className="mt-3 flex flex-col gap-2">
                        {job.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
                Education
              </div>
              <div className="mt-5 flex flex-col gap-5">
                {education.map((ed) => (
                  <div key={ed.school} className="resume-entry flex gap-4">
                    <div className="mt-1.5 h-full w-0.5 shrink-0 rounded-full bg-gradient-to-b from-indigo-400/60 to-cyan-300/20" />
                    <div>
                      <h3 className="text-base font-semibold text-white">{ed.school}</h3>
                      <p className="text-sm text-cyan-300">{ed.degree}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{ed.period}</p>
                      <p className="mt-1.5 text-sm text-slate-300">{ed.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Skills */}
            <section id="resume-skills" className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
                Skills
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section id="resume-certifications" className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
                Certifications
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {certifications.map((c) => (
                  <div key={c.name} className="resume-entry rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-xs font-semibold text-white">{c.name}</p>
                    <p className="text-[11px] text-slate-400">{c.issuer} · {c.date}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
                Languages
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {languages.map((l) => (
                  <div
                    key={l.lang}
                    className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-2.5"
                  >
                    <span className="text-sm font-medium text-white">{l.lang}</span>
                    <span className="text-xs text-slate-400">{l.level}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Awards */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
                Awards
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {awards.map((a) => (
                  <div key={a.name} className="resume-entry rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-xs font-semibold text-white">{a.name}</p>
                    <p className="text-[11px] text-slate-400">{a.org} · {a.date}</p>
                    <p className="mt-1 text-[11px] text-slate-300">{a.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Projects — full width at the bottom */}
        <section id="resume-projects" className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
            <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
            Projects
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {projects.map((p) => (
              <div key={p.name} className="resume-entry rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm font-semibold text-white">{p.name}</p>
                <p className="text-xs text-cyan-300">{p.type}</p>
                <p className="mt-0.5 text-xs text-slate-400">{p.period}</p>
                <p className="mt-2 text-xs text-slate-300">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
