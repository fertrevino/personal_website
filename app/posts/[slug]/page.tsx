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
    <div className="relative min-h-screen bg-gradient-to-br from-[#050914] via-[#071127] to-[#0c1a37] px-6 py-12 text-slate-50 md:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
          <span>{frontmatter?.date || "Undated"}</span>
          <span className="h-[1px] w-8 bg-white/10" />
          <div className="flex flex-wrap gap-2">
            {(frontmatter?.tags || []).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium capitalize text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          {frontmatter?.title || slug}
        </h1>
        <article className="prose prose-invert prose-h1:text-white prose-a:text-cyan-200 prose-strong:text-white prose-p:text-slate-200 prose-li:text-slate-200 mt-6 max-w-none">
          {content}
        </article>
      </div>
    </div>
  );
}
