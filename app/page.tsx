import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = getAllPosts();
  const displayedPosts = posts.slice(0, 3);

  const sideProjects = [
    {
      label: "Infrastructure AI",
      detail: "Next-generation infrastructure management using AI agents.",
      accent: "from-cyan-400/40 to-blue-500/30",
    },
    {
      label: "Menuop.com",
      detail: "Digital menu service for restaurants.",
      accent: "from-amber-300/40 to-orange-400/30",
    },
    {
      label: "Northbots.com",
      detail: "AI copilots platform for automating business workflows.",
      accent: "from-emerald-300/40 to-teal-400/30",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050914] via-[#071127] to-[#0c1a37] text-slate-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/5 top-[-6%] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-10%] top-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute left-[8%] bottom-[-8%] h-72 w-72 rounded-full bg-emerald-400/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-14 pt-10 md:px-10 lg:px-14">
        {/* Header */}
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-semibold uppercase tracking-tight text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
              FT
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Software Engineer</p>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">Fernando Trevino</h1>
              <p className="text-sm text-slate-400">Data, AI & cloud systems for industry</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-100 transition hover:border-white/30 hover:text-white"
              href="#writing"
            >
              Read the latest
            </a>
            <Link
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-100 transition hover:border-white/30 hover:text-white"
              href="/resume"
            >
              Resume
            </Link>
            <a
              className="rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01]"
              href="mailto:fernando.yanez.trevino@gmail.com"
            >
              Get in touch
            </a>
          </div>
        </header>

        <main className="mt-10 flex flex-col gap-10">
          {/* Hero + Now */}
          <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
                Engineering
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Building AI systems for industry — data platforms, autonomous programs, and infrastructure at scale.
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                I work at the intersection of cloud architecture, ML infrastructure, and platform engineering. I write about what I build.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">Now</h3>
                  <span className="rounded-full bg-emerald-300/20 px-3 py-1 text-xs font-medium text-emerald-200">
                    Building
                  </span>
                </div>
                <p className="mt-3 text-lg font-semibold text-white">Lead Architect at Siemens</p>
                <p className="mt-2 text-slate-300">
                  Designing AWS cloud foundations and an AI-first application platform. Also building next-generation infrastructure management using AI privately.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
                  <span className="rounded-full bg-white/5 px-3 py-1">Cloud Architecture</span>
                  <span className="rounded-full bg-white/5 px-3 py-1">AI-first Platform</span>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e1c3c]/80 via-[#0b1b2f]/70 to-[#0c2539]/80 p-6 backdrop-blur">
                <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">Get in touch</h3>
                <p className="mt-3 text-lg font-semibold text-white">Let's work together</p>
                <p className="mt-2 text-slate-300">
                  Open to interesting problems in AI, data engineering, and cloud infrastructure.
                </p>
                <a
                  href="mailto:fernando.yanez.trevino@gmail.com"
                  className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-indigo-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-md shadow-indigo-500/30 transition hover:scale-[1.01]"
                >
                  fernando.yanez.trevino@gmail.com →
                </a>
              </div>
            </div>
          </section>

          {/* Writing */}
          <section id="writing" className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Latest writing</div>
              <Link
                href="/posts"
                className="text-xs font-medium text-cyan-300 transition hover:text-cyan-100"
              >
                All posts →
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {displayedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/60 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                    <span>{post.date || "Undated"}</span>
                    {(post.tags || []).slice(0, 1).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] capitalize text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-white">{post.title}</h3>
                  <p
                    className="mt-2 text-sm text-slate-300"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.summary}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-200 transition group-hover:translate-x-1">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Side projects */}
          <section>
            <div className="mb-4 flex items-center justify-between px-1">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Side projects</p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-100">
                Building
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {sideProjects.map((item) => (
                <div
                  key={item.label}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-60 blur-3xl transition duration-500 group-hover:opacity-80`}
                  />
                  <div className="relative z-10">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-200">{item.label}</p>
                    <p className="mt-2 text-sm text-white">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
