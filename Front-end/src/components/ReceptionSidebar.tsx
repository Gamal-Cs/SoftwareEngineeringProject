import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardList,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive 
          ? "bg-blue-600 text-white" 
          : "text-blue-600 hover:bg-blue-600 hover:text-blue-600"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

interface ReceptionSidebarProps {
  className?: string;
  activePath: string;
}

export function ReceptionSidebar({ className, activePath }: ReceptionSidebarProps) {
  return (
    <div className={cn("flex h-screen w-64 flex-col border-r bg-white", className)}>
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-600"
          >
            <path d="M17.5 13.5A3.5 3.5 0 0 0 21 10c0-2.4-1.8-3-3-3h-2a9 9 0 0 1 0-8 3 3 0 0 0-3 3c0 1.1.5 2 1 3H8c.5-1 1-1.9 1-3a3 3 0 0 0-3-3 9 9 0 0 1 0 8H4c-1.2 0-3 .6-3 3a3.5 3.5 0 0 0 3.5 3.5c1.7 0 2.5 1.2 2.5 3.5 0 1.4.5 2.8 1 4 .5-.7 1-1.6 1-2.7 0-1.8 2.2-3.1 3-3.1s3 1.3 3 3.1c0 1.1.5 2 1 2.7.5-1.2 1-2.6 1-4 0-2.3.8-3.5 2.5-3.5z" />
          </svg>
          <span>Dentics</span>
        </Link>
      </div>
      <div className="flex flex-col items-center py-6">
        <Avatar className="h-20 w-20 mb-2">
          <AvatarImage src="/placeholder.svg" alt="Admin" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-medium">Admin</p>
          <p className="text-sm text-blue-600">Reception</p>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2 px-3">
        <nav className="grid gap-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            href="/reception/dashboard" 
            isActive={activePath === "/reception/dashboard"} 
          />
          <SidebarItem 
            icon={Calendar} 
            label="Appointments" 
            href="/reception/appointments" 
            isActive={activePath === "/reception/appointments"} 
          />
          <SidebarItem 
            icon={Users} 
            label="Patients" 
            href="/reception/patients" 
            isActive={activePath === "/reception/patients"} 
          />
          <SidebarItem 
            icon={ClipboardList} 
            label="Reports" 
            href="/reception/reports" 
            isActive={activePath === "/reception/reports"} 
          />
        </nav>
      </div>
    </div>
  );
}
