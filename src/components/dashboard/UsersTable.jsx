"use client";

import { useState } from "react";
import { Avatar, Button, Chip, Spinner } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function UsersTable({ users }) {
  const [allUsers, setAllUsers] = useState(users || []);
  const [loadingRoleId, setLoadingRoleId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const updateRole = async (id, role) => {
    setLoadingRoleId(id);

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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update role");
      }

      setAllUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role } : user
        )
      );

      toast.success("Role updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoadingRoleId(null);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    setDeletingId(id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      setAllUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );

      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="rounded-2xl border border-default-200 bg-content1 shadow-sm">

      {/* MOBILE VIEW */}
      <div className="block md:hidden p-4 space-y-4">
        {allUsers.length === 0 ? (
          <div className="py-10 text-center text-default-500">
            No users found.
          </div>
        ) : (
          allUsers.map((user, index) => (
            <div
              key={user._id}
              className="rounded-2xl border border-default-200 p-4 space-y-4"
            >
              {/* Profile */}
              <div className="flex items-center gap-3">
                <Avatar
                  src={user.image || ""}
                  name={user.name}
                  size="md"
                />

                <div className="min-w-0">
                  <p className="font-semibold">
                    {user.name || "Unnamed User"}
                  </p>

                  <p className="text-sm text-default-500 break-all">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* User Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-default-500">
                    Subscription
                  </p>

                  <Chip
                    color={
                      user.plan === "premium"
                        ? "success"
                        : "warning"
                    }
                    variant="flat"
                  >
                    {user.plan || "Free"}
                  </Chip>
                </div>

                <div>
                  <p className="text-xs text-default-500">
                    Joined
                  </p>

                  <p className="text-sm">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div>
                <p className="mb-2 text-xs text-default-500">
                  Role
                </p>

                {loadingRoleId === user._id ? (
                  <Spinner size="sm" />
                ) : (
                  <select
                    value={user.role || "user"}
                    onChange={(e) =>
                      updateRole(
                        user._id,
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-default-300 bg-transparent px-3 py-2 outline-none"
                  >
                    <option value="admin">
                      Admin
                    </option>

                    <option value="creator">
                      Creator
                    </option>

                    <option value="user">
                      User
                    </option>
                  </select>
                )}
              </div>

              {/* Actions */}
              <Button
                fullWidth
                color="danger"
                variant="flat"
                isLoading={deletingId === user._id}
                onPress={() =>
                  deleteUser(user._id)
                }
                startContent={
                  deletingId !== user._id && (
                    <Trash2 size={18} />
                  )
                }
              >
                Delete User
              </Button>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-default-100">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Profile</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">
                Subscription
              </th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">
                Registered
              </th>
              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {allUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-10 text-center text-default-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              allUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-t border-default-200 hover:bg-default-50"
                >
                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user.image || ""}
                        name={user.name}
                        size="sm"
                      />

                      <p className="font-medium">
                        {user.name ||
                          "Unnamed User"}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    <Chip
                      color={
                        user.plan === "premium"
                          ? "success"
                          : "warning"
                      }
                      variant="flat"
                    >
                      {user.plan || "Free"}
                    </Chip>
                  </td>

                  <td className="p-4">
                    {loadingRoleId ===
                      user._id ? (
                      <Spinner size="sm" />
                    ) : (
                      <select
                        value={
                          user.role || "user"
                        }
                        onChange={(e) =>
                          updateRole(
                            user._id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-default-300 px-3 py-2 outline-none"
                      >
                        <option value="admin">
                          Admin
                        </option>

                        <option value="creator">
                          Creator
                        </option>

                        <option value="user">
                          User
                        </option>
                      </select>
                    )}
                  </td>

                  <td className="p-4">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">
                    <Button
                      isIconOnly
                      color="danger"
                      variant="flat"
                      isLoading={
                        deletingId === user._id
                      }
                      onPress={() =>
                        deleteUser(user._id)
                      }
                    >
                      {deletingId !==
                        user._id && (
                          <Trash2 size={18} />
                        )}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}