
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const FeaturedService = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Advanced Digital Dentistry</h2>
            <p className="text-blue-600 mb-6">
              At Dentics, we pride ourselves on utilizing the latest digital blue technology to enhance your 
              treatment experience. Our state-of-the-art equipment allows for more accurate diagnoses, more 
              efficient treatments, and improved patient comfort.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-blue-600">✓</span>
                </div>
                <span>3D digital scanning for precise impressions without messy molds</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-blue-600">✓</span>
                </div>
                <span>Digital X-rays with significantly reduced radiation exposure</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-blue-600">✓</span>
                </div>
                <span>CAD/CAM technology for same-day crowns and restorations</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-blue-600">✓</span>
                </div>
                <span>Intraoral cameras for detailed views of your blue health</span>
              </li>
            </ul>
            <Button asChild className="bg-blue-600 hover:bg-blue-600 text-white">
              <Link to="/book-appointment">Schedule a Consultation</Link>
            </Button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/placeholder.svg" 
              alt="Digital Dentistry" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
