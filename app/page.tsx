import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { TerminalWindow } from "@/app/components/TerminalWindow";

export default async function Home() {
  const posts = getAllPosts();
  const displayedPosts = posts.slice(0, 3);

  const sideProjects = [
    {
      name: "Infrastructure AI",
      status: "active",
      desc: "Next-generation infrastructure management using AI agents.",
    },
    {
      name: "Menuop.com",
      status: "shipped",
      desc: "Digital menu service for restaurants.",
      url: "https://menuop.com",
    },
    {
      name: "Northbots.com",
      status: "active",
      desc: "AI copilots platform for automating business workflows.",
      url: "https://northbots.com",
    },
  ];

  return (
    <div className="scanlines relative min-h-screen">
      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col px-6 pb-16 pt-10 md:px-10">
        {/* Prompt header */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          <span className="text-accent">➜</span>
          <span>~/fernando-trevino</span>
          <span>git:(</span>
          <span className="text-accent-2">main</span>
          <span>)</span>
          <span className="cursor-blink text-accent">▌</span>
        </div>

        <div className="mt-6">
          <p className="text-sm">
            <span className="text-accent">$</span> whoami
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Fernando Trevino
          </h1>
          <p className="mt-1 text-muted">
            Lead Architect @ Siemens — cloud, AI &amp; data infrastructure
          </p>
        </div>

        {/* Nav */}
        <nav className="mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href="#writing"
            className="border border-stroke px-4 py-2 transition hover:border-accent hover:text-accent"
          >
            <span className="text-accent">[1]</span> Writing
          </a>
          <Link
            href="/resume"
            className="border border-stroke px-4 py-2 transition hover:border-accent hover:text-accent"
          >
            <span className="text-accent">[2]</span> Resume
          </Link>
          <a
            href="mailto:fernando.yanez.trevino@gmail.com"
            className="border border-stroke px-4 py-2 transition hover:border-accent hover:text-accent"
          >
            <span className="text-accent">[3]</span> Contact
          </a>
        </nav>

        <main className="mt-10 flex flex-col gap-8">
          {/* About + Now */}
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <TerminalWindow title="~/about.md">
              <p className="text-sm text-muted">
                <span className="text-accent">#</span> building AI systems for
                industry
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug sm:text-3xl">
                Data platforms, autonomous programs, and infrastructure at
                scale.
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                I work at the intersection of cloud architecture, ML
                infrastructure, and platform engineering. I write about what
                I build.
              </p>
            </TerminalWindow>

            <div className="flex flex-col gap-6">
              <TerminalWindow title="~/now.sh">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>status</span>
                  <span className="flex items-center gap-1.5 text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    building
                  </span>
                </div>
                <p className="mt-3 font-semibold">Lead Architect at Siemens</p>
                <p className="mt-2 text-sm text-muted">
                  Designing AWS cloud foundations and an AI-first application
                  platform. Also building next-generation infrastructure
                  management using AI privately.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
                  <span className="rounded border border-stroke px-2 py-0.5">
                    cloud architecture
                  </span>
                  <span className="rounded border border-stroke px-2 py-0.5">
                    ai-first platform
                  </span>
                </div>
              </TerminalWindow>

              <TerminalWindow title="~/contact.sh">
                <p className="text-sm">
                  <span className="text-accent">$</span> mailto --to fernando
                </p>
                <p className="mt-2 font-semibold">Let&apos;s work together</p>
                <p className="mt-2 text-sm text-muted">
                  Open to interesting problems in AI, data engineering, and
                  cloud infrastructure.
                </p>
                <a
                  href="mailto:fernando.yanez.trevino@gmail.com"
                  className="mt-4 inline-flex items-center gap-2 border border-accent px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-[#04160c]"
                >
                  fernando.yanez.trevino@gmail.com →
                </a>
              </TerminalWindow>
            </div>
          </div>

          {/* Writing */}
          <TerminalWindow title="~/posts --latest" className="scroll-mt-10">
            <div id="writing" className="flex items-center justify-between">
              <p className="text-xs text-muted">
                <span className="text-accent">$</span> ls posts/ | head -3
              </p>
              <Link href="/posts" className="text-xs text-accent hover:underline">
                all posts →
              </Link>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {displayedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group block rounded border border-stroke p-4 transition hover:border-accent"
                >
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span>{post.date || "undated"}</span>
                    {(post.tags || []).slice(0, 1).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-stroke px-1.5 py-0.5 text-[11px] lowercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-2 text-sm font-semibold">{post.title}</h3>
                  <p
                    className="mt-2 text-sm text-muted"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.summary}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent transition group-hover:translate-x-1">
                    read →
                  </span>
                </Link>
              ))}
            </div>
          </TerminalWindow>

          {/* Side projects as a query result */}
          <TerminalWindow title="~/projects">
            <p className="text-sm text-muted">
              <span className="text-accent">$</span> select * from projects;
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-stroke text-muted">
                    <th className="py-2 pr-4 font-normal">name</th>
                    <th className="py-2 pr-4 font-normal">status</th>
                    <th className="py-2 font-normal">description</th>
                  </tr>
                </thead>
                <tbody>
                  {sideProjects.map((item) => (
                    <tr
                      key={item.name}
                      className="border-b border-stroke last:border-0"
                    >
                      <td className="py-3 pr-4 align-top font-semibold">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-stroke underline-offset-4 transition hover:text-accent hover:decoration-accent"
                          >
                            {item.name}
                          </a>
                        ) : (
                          item.name
                        )}
                      </td>
                      <td
                        className={`py-3 pr-4 align-top ${
                          item.status === "active"
                            ? "text-accent"
                            : "text-accent-2"
                        }`}
                      >
                        {item.status}
                      </td>
                      <td className="py-3 align-top text-muted">
                        {item.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TerminalWindow>
        </main>
      </div>
    </div>
  );
}
