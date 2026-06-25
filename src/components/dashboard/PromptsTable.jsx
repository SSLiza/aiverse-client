"use client";

import { useState } from "react";
import { Button, Chip } from "@heroui/react";
import {
  Eye,
  Check,
  X,
  Trash2,
  Star,
} from "lucide-react";

export default function PromptsTable({ prompts }) {
  const [allPrompts, setAllPrompts] = useState(prompts);

  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="w-full">
        <thead className="bg-default-100">
          <tr>
            <th className="p-4">Template Title</th>
            <th>Creator</th>
            <th>AI Engine</th>
            <th>Visibility</th>
            <th>Featured</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {allPrompts.map((prompt) => (
            <tr
              key={prompt._id}
              className="border-b"
            >
              <td className="p-4">
                <div>
                  <p className="font-semibold">
                    {prompt.title}
                  </p>

                  <p className="text-sm text-default-500">
                    Category: {prompt.category}
                  </p>
                </div>
              </td>

              <td>
                <div>
                  <p>{prompt.creatorName}</p>

                  <p className="text-sm text-default-500">
                    {prompt.creatorEmail}
                  </p>
                </div>
              </td>

              <td>
                <Chip color="secondary">
                  {prompt.aiTool}
                </Chip>
              </td>

              <td>{prompt.visibility}</td>

              <td>
                <Button
                  size="sm"
                  variant={
                    prompt.featured
                      ? "solid"
                      : "flat"
                  }
                >
                  <Star size={14} />
                  {prompt.featured
                    ? "Featured"
                    : "Feature"}
                </Button>
              </td>

              <td>
                <Chip
                  color={
                    prompt.status === "approved"
                      ? "success"
                      : prompt.status ===
                        "rejected"
                      ? "danger"
                      : "warning"
                  }
                >
                  {prompt.status || "pending"}
                </Chip>
              </td>

              <td>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    variant="flat"
                  >
                    <Eye size={16} />
                  </Button>

                  <Button
                    isIconOnly
                    color="success"
                    variant="flat"
                  >
                    <Check size={16} />
                  </Button>

                  <Button
                    isIconOnly
                    color="danger"
                    variant="flat"
                  >
                    <X size={16} />
                  </Button>

                  <Button
                    isIconOnly
                    color="danger"
                    variant="flat"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}