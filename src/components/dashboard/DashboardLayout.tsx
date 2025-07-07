import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect } from "react";
import { prefetchBySection } from "@/lib/prefetch";

export default function DashboardLayout() {
  // Prefetch related components for better performance
  useEffect(() => {
    prefetchBySection("dashboard").catch(console.error);
  }, []);

  return (
    <div className="flex h-screen bg-[#121218]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
