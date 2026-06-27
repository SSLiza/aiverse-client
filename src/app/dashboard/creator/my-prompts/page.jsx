"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { deletePrompt, getMyPrompts } from "@/lib/api/prompts";
import LoadingPage from "@/components/LoadingPage";

export default function MyPromptsPage() {
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const creatorId = session?.user?.id;

  useEffect(() => {
    if (!creatorId) return;

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
  }, [creatorId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (!confirmDelete) return;

    try {
      await deletePrompt(id);

      setPrompts((prev) =>
        prev.filter((prompt) => prompt._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <LoadingPage message="Loading your prompts..." />;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Prompts
        </h1>

        <p className="mt-2 text-default-500">
          Manage all your created prompts.
        </p>
      </div>

      {/* Empty State */}
      {prompts.length === 0 && (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h2 className="text-2xl font-semibold">
            No Prompts Found
          </h2>

          <p className="mt-2 text-default-500">
            You havenot created any prompts yet.
          </p>
        </div>
      )}

      {/* Desktop Table */}
      {prompts.length > 0 && (
        <>
          <div className="hidden overflow-hidden rounded-2xl border lg:block">
            <table className="w-full">
              <thead className="bg-default-100">
                <tr>
                  <th className="p-4 text-left">
                    Title
                  </th>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Copies
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {prompts.map((prompt) => (
                  <tr
                    key={prompt._id}
                    className="border-t"
                  >
                    <td className="p-4 font-medium">
                      {prompt.title}
                    </td>

                    <td className="p-4">
                      {prompt.category}
                    </td>

                    <td className="p-4">
                      {prompt.copyCount}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          prompt.status === "approved"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : prompt.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {prompt.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            router.push(
                              `/dashboard/creator/my-prompts/edit/${prompt._id}`
                            )
                          }
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(prompt._id)
                          }
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 lg:hidden">
            {prompts.map((prompt) => (
              <div
                key={prompt._id}
                className="rounded-2xl border p-5 shadow-sm"
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">
                      {prompt.title}
                    </h3>

                    <p className="text-sm text-default-500">
                      {prompt.category}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-default-500">
                      Copies
                    </span>

                    <span className="font-medium">
                      {prompt.copyCount}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-default-500">
                      Status
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        prompt.status === "approved"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : prompt.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {prompt.status}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/creator/my-prompts/edit/${prompt._id}`
                        )
                      }
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(prompt._id)
                      }
                      className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}