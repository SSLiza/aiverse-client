"use client";

import { useState } from "react";
import { Avatar, Button, Chip, Spinner } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function UsersTable({ users }) {
  const [allUsers, setAllUsers] = useState(users || []);
  const [loadingRoleId, setLoadingRoleId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

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

  const confirmDeleteUser = async (id) => {
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
      setDeleteUserId(null);
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
                <div className="p-[1.5px] bg-gradient-to-tr from-[#7C3AED] via-[#9333EA] to-[#38BDF8] rounded-full group-hover:scale-105 transition-transform duration-300">
                  <Avatar size="sm" className="bg-transparent border-0">
                    <Avatar.Image src={user.image} alt={user.name} />
                    <Avatar.Fallback className="bg-zinc-950 text-white font-bold text-xs">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </Avatar.Fallback>
                  </Avatar>
                </div>


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
                    className="w-full rounded-lg border border-default-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 outline-none text-slate-900 dark:text-slate-100"
                  >
                    <option value="admin" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                      Admin
                    </option>

                    <option value="creator" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                      Creator
                    </option>

                    <option value="user" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
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
                className="text-red-600 hover:bg-red-100"
                isLoading={deletingId === user._id}
                onPress={() =>
                  setDeleteUserId(user._id)
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

                      <div className="p-[1.5px] bg-gradient-to-tr from-[#7C3AED] via-[#9333EA] to-[#38BDF8] rounded-full group-hover:scale-105 transition-transform duration-300">
                        <Avatar size="sm" className="bg-transparent border-0">
                          <Avatar.Image src={user.image} alt={user.name} />
                          <Avatar.Fallback className="bg-zinc-950 text-white font-bold text-xs">
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                          </Avatar.Fallback>
                        </Avatar>
                      </div>


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
                        className="rounded-lg border border-default-300 dark:border-slate-800 px-3 py-2 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                      >
                        <option value="admin" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                          Admin
                        </option>

                        <option value="creator" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                          Creator
                        </option>

                        <option value="user" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
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
                      className="text-red-600 hover:bg-red-100"
                      variant="flat"
                      isLoading={
                        deletingId === user._id
                      }
                      onPress={() =>
                        setDeleteUserId(user._id)
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

      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-default-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-655 dark:text-red-500">
              <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30">
                <Trash2 size={22} className="flex-shrink-0" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Delete User</h3>
            </div>

            <p className="text-sm text-default-500 leading-relaxed">
              Are you sure you want to delete this user? This action is permanent and cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => setDeleteUserId(null)}
                className="rounded-xl border border-default-200 dark:border-zinc-800 px-4 py-2.5 text-sm font-semibold hover:bg-default-50 dark:hover:bg-zinc-900 transition text-foreground cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => confirmDeleteUser(deleteUserId)}
                className="rounded-xl bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                {deletingId !== null ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}