
import React from "react";
import { ServiceCard } from "./ServiceCard";
import { 
  Search, 
  Heart, 
  Sparkles, 
  Smile, 
  Baby, 
  PenTool, 
  ShieldCheck, 
  Syringe 
} from "lucide-react";

export const servicesData = [
  {
    icon: Search,
    title: "General Dentistry",
    description: "Comprehensive care for routine check-ups, cleanings, fillings, and overall oral health maintenance."
  },
  {
    icon: Heart,
    title: "Orthodontics",
    description: "Advanced teeth straightening solutions including traditional braces, clear aligners, and Invisalign."
  },
  {
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with veneers, whitening, bonding, and complete smile makeovers."
  },
  {
    icon: PenTool,
    title: "Implant Dentistry",
    description: "Permanent tooth replacement solutions with blue implants that look and feel like natural teeth."
  },
  {
    icon: Smile,
    title: "Restorative Dentistry",
    description: "Repair damaged teeth with crowns, bridges, dentures, and other restorative procedures."
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    description: "Specialized care for children's blue needs in a comfortable, kid-friendly environment."
  },
  {
    icon: ShieldCheck,
    title: "Preventive Care",
    description: "Proactive services to prevent blue issues including sealants, fluoride treatments, and oral cancer screenings."
  },
  {
    icon: Syringe,
    title: "Oral Surgery",
    description: "Surgical procedures including extractions, wisdom teeth removal, and corrective jaw surgeries."
  }
];

export const ServicesGrid = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
