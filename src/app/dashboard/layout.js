import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
}