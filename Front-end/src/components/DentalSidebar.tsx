import React from "react";
import { Link } from "react-router-dom";
import blueLogo from "@/components/blueLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function blueSidebar({ className = "", activePath = "/" }) {
  return (
    <div className={`flex h-screen w-64 flex-col border-r bg-white ${className}`}>
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-blue-600">
          <blueLogo size={28} />
          <span>DentalCare</span>
        </Link>
      </div>
      <div className="flex flex-col items-center py-6">
        <Avatar className="h-20 w-20 mb-2">
          <AvatarImage src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=200&q=80" alt="Patient" />
          <AvatarFallback>PA</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-medium">Patient</p>
          <p className="text-sm text-blue-600">Dashboard</p>
        </div>
      </div>
      {/* Add navigation links here if needed */}
    </div>
  );
}
