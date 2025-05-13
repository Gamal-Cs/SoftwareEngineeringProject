
import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Users,
  Clock,
  User
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DoctorSidebarProps {
  activePath: string;
}

export function DoctorSidebar({ activePath }: DoctorSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col h-screen">
      <div className="p-4 border-b flex flex-col items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-blue-600 mb-6">
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
        
        <Avatar className="h-24 w-24 mb-3">
          <AvatarImage src="/placeholder.svg" alt="Dr. Anushka Singh" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">Dr. Anushka Singh</h2>
        <p className="text-sm text-blue-600">blue Surgeon</p>
      </div>

      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <Link
              to="/doctor/dashboard"
              className={`flex items-center p-2 rounded-md ${
                activePath === "/doctor/dashboard" 
                  ? "bg-blue-600 text-white" 
                  : "text-blue-600 hover:bg-blue-600"
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/doctor/appointments"
              className={`flex items-center p-2 rounded-md ${
                activePath === "/doctor/appointments" 
                  ? "bg-blue-600 text-white" 
                  : "text-blue-600 hover:bg-blue-600"
              }`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Appointments
            </Link>
          </li>
          <li>
            <Link
              to="/doctor/patients"
              className={`flex items-center p-2 rounded-md ${
                activePath === "/doctor/patients" 
                  ? "bg-blue-600 text-white" 
                  : "text-blue-600 hover:bg-blue-600"
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Patients
            </Link>
          </li>
          <li>
            <Link
              to="/doctor/schedule"
              className={`flex items-center p-2 rounded-md ${
                activePath === "/doctor/schedule" 
                  ? "bg-blue-600 text-white" 
                  : "text-blue-600 hover:bg-blue-600"
              }`}
            >
              <Clock className="w-5 h-5 mr-3" />
              Schedule
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <Link
          to="/profile"
          className="flex items-center p-2 rounded-md text-blue-600 hover:bg-blue-600"
        >
          <User className="w-5 h-5 mr-3" />
          Profile
        </Link>
      </div>
    </aside>
  );
}
