"use client";

import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="space-y-3">
        <p>
          <strong>Name:</strong>{" "}
          {session?.user?.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {session?.user?.email}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {session?.user?.role}
        </p>

        <p>
          <strong>Plan:</strong>{" "}
          {session?.user?.plan}
        </p>
      </div>
    </div>
  );
}