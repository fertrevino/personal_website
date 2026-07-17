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
import { TerminalWindow } from "@/app/components/TerminalWindow";

export const metadata = {
  title: "Resume — Fernando Trevino",
  description:
    "Senior Software Engineer specializing in cloud, data, AI and DevOps. 6+ years building data platforms, ML pipelines, and infrastructure at scale.",
};

export default function ResumePage() {
  return (
    <div className="scanlines relative min-h-screen">
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-10 md:px-10 lg:px-14">
        {/* Header */}
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted">
              <span className="text-accent">$</span> cat resume.md
            </p>
            <h1 id="resume-name" className="mt-1 text-2xl font-semibold sm:text-3xl">
              Fernando Trevino
            </h1>
            <p className="mt-1 text-sm text-muted">
              Frankfurt, Germany · fernando.yanez.trevino@gmail.com
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="border border-stroke px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
            >
              ← back home
            </Link>
            <a
              href="/resume.pdf"
              download
              className="border border-accent px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-[#04160c]"
            >
              download pdf
            </a>
          </div>
        </header>

        {/* Summary */}
        <TerminalWindow title="~/summary.md" className="mt-8">
          <p id="resume-summary" className="leading-relaxed text-foreground/90">
            {summary}
          </p>
        </TerminalWindow>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Experience */}
            <TerminalWindow title="~/experience.log">
              <div className="flex flex-col gap-8">
                {experience.map((job) => (
                  <div key={job.company} className="resume-entry flex gap-4">
                    <div className="mt-1.5 h-full w-0.5 shrink-0 rounded-full bg-stroke" />
                    <div className="flex-1">
                      <h3 className="text-base font-semibold">{job.company}</h3>
                      <p className="text-sm text-accent">{job.role}</p>
                      <p className="mt-0.5 text-xs text-muted">
                        {job.location} · {job.period}
                      </p>
                      <ul className="mt-3 flex flex-col gap-2">
                        {job.bullets.map((b, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-foreground/90"
                          >
                            <span className="mt-0.5 text-accent">›</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </TerminalWindow>

            {/* Education */}
            <TerminalWindow title="~/education.log">
              <div className="flex flex-col gap-5">
                {education.map((ed) => (
                  <div key={ed.school} className="resume-entry flex gap-4">
                    <div className="mt-1.5 h-full w-0.5 shrink-0 rounded-full bg-stroke" />
                    <div>
                      <h3 className="text-base font-semibold">{ed.school}</h3>
                      <p className="text-sm text-accent">{ed.degree}</p>
                      <p className="mt-0.5 text-xs text-muted">{ed.period}</p>
                      <p className="mt-1.5 text-sm text-foreground/90">
                        {ed.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Skills */}
            <TerminalWindow title="~/skills.json">
              <div id="resume-skills" className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-stroke px-3 py-1 text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </TerminalWindow>

            {/* Certifications */}
            <TerminalWindow title="~/certifications.log">
              <div id="resume-certifications" className="flex flex-col gap-3">
                {certifications.map((c) => (
                  <div
                    key={c.name}
                    className="resume-entry rounded border border-stroke px-4 py-3"
                  >
                    <p className="text-xs font-semibold">{c.name}</p>
                    <p className="text-[11px] text-muted">
                      {c.issuer} · {c.date}
                    </p>
                  </div>
                ))}
              </div>
            </TerminalWindow>

            {/* Languages */}
            <TerminalWindow title="~/languages.json">
              <div className="flex flex-col gap-2">
                {languages.map((l) => (
                  <div
                    key={l.lang}
                    className="flex items-center justify-between rounded border border-stroke px-4 py-2.5"
                  >
                    <span className="text-sm font-medium">{l.lang}</span>
                    <span className="text-xs text-muted">{l.level}</span>
                  </div>
                ))}
              </div>
            </TerminalWindow>

            {/* Awards */}
            <TerminalWindow title="~/awards.log">
              <div className="flex flex-col gap-3">
                {awards.map((a) => (
                  <div
                    key={a.name}
                    className="resume-entry rounded border border-stroke px-4 py-3"
                  >
                    <p className="text-xs font-semibold">{a.name}</p>
                    <p className="text-[11px] text-muted">
                      {a.org} · {a.date}
                    </p>
                    <p className="mt-1 text-[11px] text-foreground/90">
                      {a.detail}
                    </p>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          </div>
        </div>

        {/* Projects — full width at the bottom */}
        <TerminalWindow title="~/projects.log" className="mt-6">
          <div id="resume-projects" className="grid gap-4 sm:grid-cols-3">
            {projects.map((p) => (
              <div
                key={p.name}
                className="resume-entry rounded border border-stroke p-4"
              >
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-accent">{p.type}</p>
                <p className="mt-0.5 text-xs text-muted">{p.period}</p>
                <p className="mt-2 text-xs text-foreground/90">{p.detail}</p>
              </div>
            ))}
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
