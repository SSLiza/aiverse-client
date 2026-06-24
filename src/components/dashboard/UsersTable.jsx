"use client";

import { useState } from "react";
import { Avatar, Button, Chip } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function UsersTable({ users }) {
  const [allUsers, setAllUsers] = useState(users || []);

  const updateRole = async (id, role) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        }
      );

      if (res.ok) {
        toast.success("Role updated");

        setAllUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, role } : u
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("User deleted");

        setAllUsers((prev) =>
          prev.filter((u) => u._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full">
        <thead className="border-b bg-default-100">
          <tr>
            <th className="p-4 text-left">Profile</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Subscription</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Registered</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {allUsers.map((user) => (
            <tr
              key={user._id}
              className="border-b hover:bg-default-50"
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user.image || undefined}
                    name={user.name}
                  />

                  <span>{user.name}</span>
                </div>
              </td>

              <td className="p-4">{user.email}</td>

              <td className="p-4">
                <Chip
                  color={
                    user.plan === "premium"
                      ? "success"
                      : "warning"
                  }
                >
                  {user.plan || "Free"}
                </Chip>
              </td>

              <td className="p-4">
                <select
                  value={user.role || "user"}
                  onChange={(e) =>
                    updateRole(
                      user._id,
                      e.target.value
                    )
                  }
                  className="rounded-lg border px-3 py-2"
                >
                  <option value="admin">Admin</option>
                  <option value="creator">
                    Creator
                  </option>
                  <option value="user">User</option>
                </select>
              </td>

              <td className="p-4">
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                <Button
                  isIconOnly
                  color="danger"
                  variant="flat"
                  onPress={() =>
                    deleteUser(user._id)
                  }
                >
                  <Trash2 size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}