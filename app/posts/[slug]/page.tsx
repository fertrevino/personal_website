import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostContent } from "@/lib/posts";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const source = getPostContent(slug);
  if (!source) return {};

  const { frontmatter } = await compileMDX<{
    title?: string;
    summary?: string;
  }>({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    title: frontmatter?.title
      ? `${frontmatter.title} — Fernando Dev`
      : "Fernando Dev — Post",
    description: frontmatter?.summary || "Personal brand notebook entry",
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const source = getPostContent(slug);
  if (!source) return notFound();

  const { content, frontmatter } = await compileMDX<{
    title?: string;
    date?: string;
    tags?: string[];
  }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
      },
    },
  });

  return (
    <div className="scanlines relative min-h-screen px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/posts"
          className="text-xs text-muted transition hover:text-accent"
        >
          ← back to posts
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span>{frontmatter?.date || "undated"}</span>
          <span className="h-[1px] w-8 bg-stroke" />
          <div className="flex flex-wrap gap-2">
            {(frontmatter?.tags || []).map((tag) => (
              <span
                key={tag}
                className="rounded border border-stroke px-2 py-0.5 text-[11px] lowercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
          {frontmatter?.title || slug}
        </h1>
        <article className="prose prose-invert prose-headings:font-semibold prose-a:text-accent prose-strong:text-foreground prose-code:text-accent-2 mt-6 max-w-none font-mono text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90">
          {content}
        </article>
      </div>
    </div>
  );
}
