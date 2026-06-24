import { requireRole } from "@/lib/core/session";

const userDashboardLayout = async ({ children }) => {
    await requireRole("USER")
    return children
}
export default userDashboardLayout;