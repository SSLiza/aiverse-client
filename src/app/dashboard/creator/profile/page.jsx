"use client";

import { useSession } from "@/lib/auth-client";
import { User, Mail, Shield, Crown } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-default-500 mt-2">
          Manage your account information and subscription details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-3xl border bg-background p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="h-28 w-28 rounded-full overflow-hidden bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user?.name || "User"}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>

              <h2 className="mt-5 text-2xl font-semibold">
                {user?.name}
              </h2>

              <p className="text-default-500">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border bg-background shadow-sm">
            <div className="border-b p-6">
              <h3 className="text-xl font-semibold">
                Account Information
              </h3>
            </div>

            <div className="p-6 space-y-5">
              {/* Name */}
              <div className="flex items-center gap-4 rounded-2xl border p-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <User className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm text-default-500">
                    Full Name
                  </p>
                  <p className="font-medium">
                    {user?.name}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 rounded-2xl border p-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Mail className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm text-default-500">
                    Email Address
                  </p>
                  <p className="font-medium break-all">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center gap-4 rounded-2xl border p-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm text-default-500">
                    Account Role
                  </p>
                  <p className="font-medium capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}