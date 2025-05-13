
import React from "react";
import { useLocation } from "react-router-dom";
import { blueSidebar } from "@/components/blueSidebar";
import { UpcomingAppointment } from "@/components/UpcomingAppointment";
import { MedicationsList } from "@/components/MedicationsList";
import { MedicalHistory } from "@/components/MedicalHistory";
import { LatestReports } from "@/components/LatestReports";

const Dashboard = () => {
  const location = useLocation();
  
  // Mock data for medications
  const medications = [
    { name: "PlaceboMax", dosage: "1 - 0 - 1" },
    { name: "Sugarpharm", dosage: "0 - 0 - 1" },
    { name: "Pseudopill", dosage: "1 - 1 - 1" },
    { name: "Sugarpharm", dosage: "1 - 1 - 1" },
  ];

  // Mock data for reports
  const reports = [
    { title: "X-ray reports" },
    { title: "Blood reports" },
    { title: "Blood test" },
    { title: "X-ray reports" },
    { title: "X-ray reports" },
  ];

  return (
    <div className="flex h-screen bg-blue-100">
      <blueSidebar activePath={location.pathname} />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b h-14 flex items-center px-6">
          <div>
            <span className="text-sm text-blue-600">Patient</span>
            <span className="mx-2">{">"}</span>
            <span className="font-medium">Dashboard</span>
          </div>
        </header>
        
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <UpcomingAppointment 
                date="April 20, 2023"
                day="Monday"
                doctor="Dr. Xyz Sharma"
              />
              
              <MedicalHistory />
            </div>
            
            <div className="space-y-6">
              <MedicationsList medications={medications} />
              <LatestReports reports={reports} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
