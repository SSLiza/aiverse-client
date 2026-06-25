"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updatePrompt } from "@/lib/api/prompts";

export default function EditPromptPage() {
  const { id } = useParams();
  const router = useRouter();

  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/prompts/${id}`
        );

        const data = await res.json();
        setPrompt(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPrompt();
  }, [id]);

  const handleChange = (e) => {
    setPrompt({
      ...prompt,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePrompt(id, prompt);

      alert("Prompt updated successfully!");
      router.push("/dashboard/creator/my-prompts");
    } catch (error) {
      console.error(error);
      alert("Failed to update prompt");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Prompt
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block mb-1">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={prompt?.title || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Description
          </label>

          <textarea
            name="description"
            value={prompt?.description || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1">
            Content
          </label>

          <textarea
            name="content"
            value={prompt?.content || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={8}
          />
        </div>

        <div>
          <label className="block mb-1">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={prompt?.category || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            AI Tool
          </label>

          <input
            type="text"
            name="aiTool"
            value={prompt?.aiTool || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Difficulty
          </label>

          <select
            name="difficulty"
            value={prompt?.difficulty || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Beginner">
              Beginner
            </option>
            <option value="Intermediate">
              Intermediate
            </option>
            <option value="Advanced">
              Advanced
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="px-5 py-2 rounded bg-blue-600 text-white"
        >
          Update Prompt
        </button>
      </form>
    </div>
  );
}