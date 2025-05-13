import { Link, useLocation } from "react-router-dom";
import { FileText, Home, Calendar, Pill, Stethoscope } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const PatientSidebar = () => {
  const location = useLocation();
  const activePath = location.pathname;

  const navItems = [
    { path: "/patient/dashboard", icon: Home, label: "Dashboard" },
    { path: "/patient/appointments", icon: Calendar, label: "Appointments" },
    { path: "/patient/prescriptions", icon: Pill, label: "Prescriptions" },
    { path: "/patient/records", icon: FileText, label: "Medical Records" },
    { path: "/patient/doctors", icon: Stethoscope, label: "My Doctors" },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
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
          <AvatarImage src="/placeholder.svg" alt="Patient" />
          <AvatarFallback>PA</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-medium">John Doe</p>
          <p className="text-sm text-blue-600">Patient</p>
        </div>
      </div>

      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-colors ${activePath.startsWith(item.path) ? 'bg-blue-600 text-blue-600 font-medium' : 'text-blue-600 hover:bg-blue-50'}`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Link
          to="/settings"
          className={`flex items-center p-3 rounded-md transition-colors ${activePath.startsWith('/settings') ? 'bg-blue-600 text-blue-600 font-medium' : 'text-blue-600 hover:bg-blue-50'}`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </Link>
      </div>
    </aside>
  );
};