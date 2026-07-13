import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Writing — Fernando Trevino",
  description: "All posts on AI, data engineering, and cloud infrastructure.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050914] via-[#071127] to-[#0c1a37] text-slate-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/5 top-[-6%] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-10%] top-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute left-[8%] bottom-[-8%] h-72 w-72 rounded-full bg-emerald-400/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-10 md:px-10">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Writing</p>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">All posts</h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-100 transition hover:border-white/30 hover:text-white"
          >
            ← Back home
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/60 hover:bg-white/[0.07]"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                <span>{post.date || "Undated"}</span>
                {(post.tags || []).slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] capitalize text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-2 text-lg font-semibold text-white">{post.title}</h2>
              {post.summary && (
                <p className="mt-2 text-sm text-slate-300">{post.summary}</p>
              )}
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-200 transition group-hover:translate-x-1">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
