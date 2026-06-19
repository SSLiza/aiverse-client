"use client";

const prompts = [
  {
    _id: 1,
    title: "SEO Blog Generator",
    category: "Writing",
    copies: 15,
    status: "approved",
  },
  {
    _id: 2,
    title: "React Expert",
    category: "Coding",
    copies: 8,
    status: "pending",
  },
];

export default function MyPromptsPage() {
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
                  {prompt.copies}
                </td>

                <td className="p-3">
                  {prompt.status}
                </td>

                <td className="p-3 flex gap-2">
                  <button className="px-3 py-1 rounded bg-blue-500 text-white">
                    Edit
                  </button>

                  <button className="px-3 py-1 rounded bg-red-500 text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}