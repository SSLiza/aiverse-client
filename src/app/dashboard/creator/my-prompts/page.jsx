"use client";

import { getMyPrompts } from "@/lib/api/prompts";
import { useEffect, useState } from "react";

export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const{data: session} = useSession();
  const creatorId = session?.user?.id;

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const data = await getMyPrompts(creatorId);
        setPrompts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        My Prompts
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Copies</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {prompts.map((prompt) => (
              <tr
                key={prompt._id}
                className="border-b"
              >
                <td className="p-3">
                  {prompt.title}
                </td>

                <td className="p-3">
                  {prompt.category}
                </td>

                <td className="p-3">
                  {prompt.copyCount}
                </td>

                <td className="p-3 capitalize">
                  {prompt.status}
                </td>

                <td className="flex gap-2 p-3">
                  <button className="rounded bg-blue-500 px-3 py-1 text-white">
                    Edit
                  </button>

                  <button className="rounded bg-red-500 px-3 py-1 text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {prompts.length === 0 && (
          <p className="py-6 text-center">
            No prompts found.
          </p>
        )}
      </div>
    </div>
  );
}