
import React from "react";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
        <Icon className="text-blue-600 h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-blue-600">{title}</h3>
      <p className="text-blue-600 mb-4">{description}</p>
      <Button asChild variant="link" className="p-0 text-blue-600 hover:text-blue-600">
        <Link to={`/services/${title.toLowerCase().replace(/\s+/g, '-')}`}>
          Learn more →
        </Link>
      </Button>
    </div>
  );
};
