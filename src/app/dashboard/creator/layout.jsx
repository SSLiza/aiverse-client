import { requireRole } from "@/lib/core/session";

const CreatorDashboardLayout = async ({ children }) => {
    await requireRole("CREATOR")
    return children
}
export default CreatorDashboardLayout;