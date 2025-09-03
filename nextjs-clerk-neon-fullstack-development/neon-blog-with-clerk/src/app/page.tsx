import Link from "next/link";
import { getAllPosts } from "@/db/actions";
import { formatDateString } from "@/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Posts | Neon Blog",
  description: "A modern, professional blog layout built with Next.js.",
};

// --- Helper function moved outside the component for better practice ---
const shortenText = (text: string, maxLength: number): string =>
  text.length <= maxLength ? text : text.slice(0, maxLength) + "...";

export default async function Home() {
  // --- Direct data fetching is cleaner ---
  const posts = await getAllPosts();

  // --- Handle the case where there are no posts ---
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
          No Posts Yet
        </h2>
        <p className="text-slate-500 mb-6">
          There's nothing here. Why not be the first to create a post?
        </p>
        <Link
          href="/posts/create"
          className="px-5 py-2.5 font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-600 transition-all duration-200"
        >
          Create Post
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* A more visually engaging heading */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Latest Posts
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explore the latest ideas, tutorials, and stories from our community.
        </p>
      </div>

      {/* The improved post grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="group flex flex-col bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-6 flex-grow">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-500 transition-colors duration-200 mb-2">
                {post.title}
              </h2>
              {/* Using line-clamp is more efficient for CSS-based truncation */}
              <p className="text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* Footer is separated for better structure */}
            <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-3 text-xs text-slate-500 dark:text-slate-400">
              <span>{formatDateString(post.created_at)}</span>
              {post.author && (
                <span className="float-right font-medium">
                  By {post.author}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
