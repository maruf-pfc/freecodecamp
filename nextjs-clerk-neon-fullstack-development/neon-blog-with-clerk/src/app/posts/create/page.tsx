"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { slugifySentences } from "@/utils";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function PostCreate() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [publishing, setPublishing] = useState<boolean>(false);

  const onChangeContent = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, content });
    router.push("/");
  };

  return (
    <div className="min-h-[100vh]">
      <main className="md:px-8 py-8 px-4 w-full">
        <form className="flex flex-col w-full" onSubmit={handleCreatePost}>
          <label htmlFor="title" className="text-sm text-blue-600">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-3 border-2 rounded-md text-lg mb-4"
          />

          <label htmlFor="content" className="text-sm text-blue-600">
            Content
          </label>
          <SimpleMDE value={content} onChange={onChangeContent} id="content" />

          <button
            type="submit"
            disabled={publishing}
            className="bg-blue-600 mt-2 text-white py-3 rounded-md cursor-pointer"
          >
            {publishing ? "Publishing....please wait" : "Publish Post"}
          </button>
        </form>
      </main>
    </div>
  );
}
