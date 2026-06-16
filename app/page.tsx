import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = getAllPosts();

  const fallbackPosts = [
    {
      slug: "shipping-small",
      title: "Shipping small, thinking bold",
      summary:
        "How I break ambitious ideas into daily deliverables, keep momentum, and measure progress without killing the spark.",
      date: "May 2024",
      tags: ["build log", "product thinking"],
    },
    {
      slug: "learning-in-public",
      title: "Learning in public is my edge",
      summary:
        "Sharing drafts, screenshots, and half-finished work has opened more doors than polished launches ever did.",
      date: "April 2024",
      tags: ["writing", "open work"],
    },
    {
      slug: "design-systems",
      title: "Design systems for solo makers",
      summary:
        "A lightweight system for visuals, tone, and cadence that keeps my projects coherent without slowing me down.",
      date: "March 2024",
      tags: ["design", "ops"],
    },
  ];

  const displayedPosts = (posts.length ? posts : fallbackPosts).slice(0, 3);

  const focus = [
    "Building a repeatable content engine that blends posts, photos, and short-form storytelling.",
    "Designing small, delightful product experiments that teach me something every week.",
    "Documenting the process so others can shortcut the messy middle of building in public.",
  ];

  const timeline = [
    {
      year: "Now",
      title: "Senior Software Engineer · MBition",
      detail: "Building data platforms on Databricks & AWS for 2,000+ teams. Saving $2M/yr in cloud costs. Training autonomous driving AI at scale.",
    },
    {
      year: "2018",
      title: "Software Engineer · KPIT Technologies",
      detail: "Led ML video pipeline for BMW scene detection using MASK-RCNN. Built ROS sensor interfaces for lidar, camera, and GPS on prototype vehicles.",
    },
    {
      year: "2016",
      title: "Master's Candidate · Daimler",
      detail: "Developed an ML model to predict bus energy consumption using fleet driving data — enabling efficient route planning for Mercedes-Benz customers.",
    },
  ];

  const gallery = [
    {
      label: "Field notes",
      detail: "Snapshots from research days and road trips.",
      accent: "from-cyan-400/40 to-blue-500/30",
    },
    {
      label: "Studio desk",
      detail: "Textures, lighting tests, and layout drafts.",
      accent: "from-amber-300/40 to-orange-400/30",
    },
    {
      label: "Build logs",
      detail: "Screens from work-in-progress tools and visuals.",
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
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-semibold uppercase tracking-tight text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
              FD
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                Personal brand
              </p>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                Fernando Dev
              </h1>
              <p className="text-sm text-slate-400">
                Builder, storyteller, and visual-first maker
              </p>
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
              href="mailto:hello@fernandodev.com"
            >
              Collaborate
            </a>
          </div>
        </header>

        <main className="mt-10 flex flex-col gap-10">
          <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
                Building in public
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Crafting a brand that feels alive — stories, visuals, and product
                experiments published every week.
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-slate-300">
                I share the process, not just the polished result. Expect
                behind-the-scenes notes, design snapshots, and honest lessons
                from building real things on the internet.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Weekly posts", "Visual storytelling", "Systems for makers"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    cadence
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    1x / week
                  </p>
                  <p className="text-sm text-slate-400">New essays + build logs</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    format
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    Posts + film
                  </p>
                  <p className="text-sm text-slate-400">Words, audio, visuals</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    focus
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    Brand in motion
                  </p>
                  <p className="text-sm text-slate-400">
                    Modern, intentional, alive
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    Now
                  </h3>
                  <span className="rounded-full bg-emerald-300/20 px-3 py-1 text-xs font-medium text-emerald-200">
                    Publishing
                  </span>
                </div>
                <p className="mt-3 text-lg font-semibold text-white">
                  Releasing a series on making a personal brand feel like a product
                </p>
                <p className="mt-2 text-slate-300">
                  I am deconstructing the playbook: audience clarity, visual tone,
                  consistent voice, and repeatable publishing.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
                  <span className="rounded-full bg-white/5 px-3 py-1">
                    Build log #07 drops Friday
                  </span>
                  <span className="rounded-full bg-white/5 px-3 py-1">
                    3 collaborations open
                  </span>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e1c3c]/80 via-[#0b1b2f]/70 to-[#0c2539]/80 p-6 backdrop-blur">
                <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Signal
                </h3>
                <p className="mt-3 text-lg font-semibold text-white">
                  Subscribe to the notebook
                </p>
                <p className="mt-2 text-slate-300">
                  Get concise recaps of what I shipped, what broke, and what
                  surprised me each week.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    aria-label="Email"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                    placeholder="your@email.com"
                    type="email"
                  />
                  <button className="rounded-2xl bg-gradient-to-r from-cyan-300 to-indigo-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-md shadow-indigo-500/30 transition hover:scale-[1.01]">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section
            className="grid gap-6 lg:grid-cols-[1.25fr_1fr]"
            id="writing"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Latest writing
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
                  Notebook
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {displayedPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/60 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-slate-400">
                      <span>{post.date || "Undated"}</span>
                      <span className="h-[1px] w-8 bg-white/10" />
                      <div className="flex gap-2">
                        {(post.tags || []).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium capitalize text-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {post.title}
                    </h3>
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
                    <Link
                      className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200 transition group-hover:translate-x-1"
                      href={`/posts/${post.slug}`}
                    >
                      Read story
                      <span aria-hidden className="text-base">
                        →
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  In the lab
                </h3>
                <div className="mt-4 space-y-3 text-slate-200">
                  {focus.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400" />
                      <p className="text-sm text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1c35]/80 via-[#0c1d2f]/70 to-[#0f2436]/80 p-6 backdrop-blur">
                <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Toolbox
                </h3>
                <div className="mt-4 grid gap-3 text-sm text-slate-200">
                  <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                    <span>Design</span>
                    <span className="text-slate-400">Figma · Framer · Pen &amp; paper</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                    <span>Build</span>
                    <span className="text-slate-400">Next.js · TypeScript · Tailwind</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                    <span>Media</span>
                    <span className="text-slate-400">Sony a6400 · Lightroom · Notion</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Timeline
              </div>
              <div className="mt-5 space-y-4">
                {timeline.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mt-1 h-10 w-0.5 rounded-full bg-gradient-to-b from-cyan-300 to-indigo-400" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                        {item.year}
                      </p>
                      <h4 className="text-lg font-semibold text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-300">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Visual log
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-100">
                  Photos
                </span>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">
                Field notes, snapshots, and stills from recent projects.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {gallery.map((item) => (
                  <div
                    key={item.label}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-70 blur-3xl transition duration-500 group-hover:opacity-90`}
                    />
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-200">
                          {item.label}
                        </p>
                        <h4 className="mt-2 text-lg font-semibold text-white">
                          {item.detail}
                        </h4>
                      </div>
                      <span className="mt-4 text-sm font-semibold text-cyan-100">
                        View set →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
