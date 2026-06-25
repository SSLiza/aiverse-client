import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })

    return session?.user || null;
}

export const requireRole = async (role) => {
    const user = await getUserSession();
    if (!user || user.role?.toLowerCase() !== role.toLowerCase()) {
        return redirect("/unauthorized");
    }
}