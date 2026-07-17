import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { TerminalWindow } from "@/app/components/TerminalWindow";

export const metadata = {
  title: "Writing — Fernando Trevino",
  description: "All posts on AI, data engineering, and cloud infrastructure.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="scanlines relative min-h-screen">
      <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-10 md:px-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">
              <span className="text-accent">$</span> ls posts/
            </p>
            <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
              All posts
            </h1>
          </div>
          <Link
            href="/"
            className="border border-stroke px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
          >
            ← back home
          </Link>
        </div>

        <TerminalWindow title="~/posts" className="mt-8">
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group rounded border border-stroke p-5 transition hover:border-accent"
              >
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{post.date || "undated"}</span>
                  {(post.tags || []).slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-stroke px-1.5 py-0.5 text-[11px] lowercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
                {post.summary && (
                  <p className="mt-2 text-sm text-muted">{post.summary}</p>
                )}
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent transition group-hover:translate-x-1">
                  read →
                </span>
              </Link>
            ))}
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
