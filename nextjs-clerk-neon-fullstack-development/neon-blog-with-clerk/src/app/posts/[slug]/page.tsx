"use client";

import { useRouter, useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import { formatDateString } from "@/utils";
import type { Post } from "@/types/Post";
import { dummyPosts } from "@/db/dummy";

export default function PostPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);

  // Fetch the post when the slug changes
  useEffect(() => {
    if (params?.slug) {
      const foundPost = dummyPosts.find((p) => p.slug === params.slug);
      setPost(foundPost ?? null);
    }
  }, [params?.slug]);

  const deletePost = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      alert(`Deleted post: ${params.slug}`);
      router.push("/");
    }
  };

  if (!post) {
    return <p className="p-4 text-red-500">Post not found</p>;
  }

  return (
    <div>
      <main className="w-full md:px-8 px-4">
        <header className="mb-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl text-blue-700 font-bold">{post.title}</h2>
            <div className="flex items-center">
              <button
                className="px-4 py-2 rounded text-xs bg-red-200 hover:bg-red-400 mr-3"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="flex">
            <p className="text-red-500 mr-8 text-sm">
              Author: <span className="text-gray-700">{post.author}</span>
            </p>
            <p className="text-red-500 mr-6 text-sm">
              Posted on:{" "}
              <span className="text-gray-700">
                {formatDateString(post.created_at)}
              </span>
            </p>
          </div>
        </header>

        <div className="text-sm text-justify">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}
