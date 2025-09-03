"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { slugifySentences } from "@/utils";
import { useUser } from "@clerk/nextjs";

export default function PostCreate() {
  const { isLoaded, user } = useUser();
  const [publishing, setPublishing] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();

  const onChangeContent = useCallback((value: string) => setContent(value), []);

  if (!isLoaded) return <p className="text-center py-10">Loading...</p>;

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return;

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle || !trimmedContent) {
      alert("Title and content cannot be empty");
      return;
    }

    setPublishing(true);
    try {
      const slug = slugifySentences(trimmedTitle);

      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: trimmedTitle,
          content: trimmedContent,
          author: user.firstName || "Unknown",
          author_id: user.id,
          slug,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error creating post");

      alert(data.message);
      router.push("/");
    } catch (err: any) {
      console.error("Create post error:", err);
      alert(err.message || "Failed to create post");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
          Create a New Post
        </h1>

        <form
          className="flex flex-col w-full bg-white p-8 rounded-lg shadow-md border border-gray-200"
          onSubmit={handleCreatePost}
        >
          {/* Title */}
          <label
            htmlFor="title"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="mb-6 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Enter your post title..."
          />

          {/* Content */}
          <label
            htmlFor="content"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
            <SimpleMDE
              value={content}
              onChange={onChangeContent}
              options={{
                spellChecker: false,
                placeholder: "Write your post here...",
                status: false,
                toolbar: [
                  "bold",
                  "italic",
                  "heading",
                  "|",
                  "quote",
                  "unordered-list",
                  "ordered-list",
                  "|",
                  "code",
                  "link",
                  "image",
                  "|",
                  "preview",
                  "side-by-side",
                  "fullscreen",
                ],
                minHeight: "300px",
              }}
              id="content"
            />
          </div>

          {/* Publish Button */}
          <button
            type="submit"
            disabled={publishing}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {publishing ? "Publishing... please wait" : "Publish Post"}
          </button>
        </form>
      </main>
    </div>
  );
}
