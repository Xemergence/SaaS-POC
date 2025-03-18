import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Settings,
  CircuitBoard,
  BrainCircuit,
  LogOut,
  MessageSquareText,
  AppWindow,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

function NavItem({ icon, label, href, active }: NavItemProps) {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 font-normal",
          active
            ? "bg-[#2a2a3a] text-white"
            : "hover:bg-[#2a2a3a]/50 text-white",
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Financial",
      href: "/dashboard/financial",
    },
    {
      icon: <Calendar size={20} />,
      label: "Calendar",
      href: "/dashboard/calendar",
    },
    {
      icon: <BrainCircuit size={20} />,
      label: "AI Overview",
      href: "/dashboard/ai-overview",
    },
    {
      icon: <AppWindow size={20} />,
      label: "AI Apps",
      href: "/dashboard/ai-apps",
    },
    {
      icon: <MessageSquareText size={20} />,
      label: "AI Chat",
      href: "/dashboard/ai-chat",
    },
    {
      icon: <CircuitBoard size={20} />,
      label: "Sensors",
      href: "/dashboard/sensors",
    },
    {
      icon: <Share2 size={20} />,
      label: "Social Media",
      href: "/dashboard/social-media",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  return (
    <aside className="w-64 border-r border-[#2a2a3a] bg-[#1e1e2d] flex flex-col h-full">
      <div className="p-6 flex items-center gap-2">
        <img src="/vite.svg" alt="xEmergence Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold text-white">xEmergence</h1>
      </div>
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
          />
        ))}
      </nav>
      <div className="p-4 border-t border-[#2a2a3a]">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-white hover:bg-[#2a2a3a]"
          onClick={() => {
            // Log out the user and redirect to login page
            window.location.href = "/login";
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}
