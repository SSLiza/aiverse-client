import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function DashboardRedirectPage() {
  const session = await getUserSession();
  if (!session) {
    return redirect("/auth/signin?redirect=/dashboard");
  }

  const role = session.role?.toLowerCase();
  if (role === "admin") {
    return redirect("/dashboard/admin");
  } else if (role === "creator") {
    return redirect("/dashboard/creator");
  } else {
    return redirect("/dashboard/user");
  }
}
