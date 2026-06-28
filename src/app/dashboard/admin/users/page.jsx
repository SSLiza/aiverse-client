import UsersTable from "@/components/dashboard/UsersTable";
import { serverFetch } from "@/lib/server-fetch";

async function getUsers() {
  const res = await serverFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function AdminUsersPage() {
  const users = await getUsers();
  console.log("DEBUG USERS:", users);

  return (
    <div className="p-6">
      <h1 className="mb-2 text-4xl font-bold">
        User Role & Accounts Management
      </h1>

      <p className="mb-8 text-default-500">
        Review accounts, modify role scopes,
        and delete users.
      </p>

      <UsersTable users={users} />
    </div>
  );
}