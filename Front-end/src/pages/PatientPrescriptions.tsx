import React, { useState } from "react";
import { PatientSidebar } from "@/components/PatientSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Plus, Pill } from "lucide-react";

interface Prescription {
  id: string;
  date: string;
  doctor: string;
  medications: { name: string; dosage: string; instructions?: string }[];
  notes?: string;
  fileTypes?: string[];
}

const samplePrescriptions: Prescription[] = [
  {
    id: "1",
    date: "2024-04-10",
    doctor: "Dr. Sarah Johnson",
    medications: [
      { name: "Amoxicillin", dosage: "700mg", instructions: "Twice daily after meals" },
      { name: "Ibuprofen", dosage: "700mg", instructions: "As needed for pain" }
    ],
    notes: "Complete the full course of antibiotics.",
    fileTypes: ["PDF"]
  },
  {
    id: "2",
    date: "2024-03-15",
    doctor: "Dr. Michael Chen",
    medications: [
      { name: "Paracetamol", dosage: "700mg", instructions: "Three times daily" }
    ],
    fileTypes: ["PDF", "JPG"]
  }
];

export default function PatientPrescriptions() {
  const [search, setSearch] = useState("");

  const filterPrescriptions = (list: Prescription[]) =>
    list.filter(p =>
      p.doctor.toLowerCase().includes(search.toLowerCase()) ||
      p.medications.some(m => m.name.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <div className="flex min-h-screen bg-blue-50">
      <PatientSidebar />
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Prescriptions</h1>
          <Button className="bg-blue-600 hover:bg-blue-600 gap-2">
            <Plus className="h-4 w-4" />
            New Prescription
          </Button>
        </div>
        <div className="mb-6">
          <Input
            placeholder="Search by doctor or medication..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterPrescriptions(samplePrescriptions).length > 0 ? (
            filterPrescriptions(samplePrescriptions).map(prescription => (
              <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-blue-100 text-blue-700 gap-1">
                      <Pill className="h-4 w-4" /> Prescription
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-lg mt-2">{prescription.date}</h3>
                  <p className="text-sm text-blue-600">{prescription.doctor}</p>
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Medications:</p>
                    <ul className="text-smtext-blue-600 space-y-1">
                      {prescription.medications.map((med, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-indigo-700" />
                          <span>{med.name} - {med.dosage}</span>
                          {med.instructions && <span className="text-xs text-blue-600 ml-2">({med.instructions})</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {prescription.notes && (
                    <div className="mt-2 text-sm text-blue-600">
                      <span className="font-medium">Notes:</span> {prescription.notes}
                    </div>
                  )}
                  {prescription.fileTypes && (
                    <div className="mt-2 flex gap-2">
                      {prescription.fileTypes.map((type, idx) => (
                        <Badge key={idx} variant="outline">{type}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-mediumtext-blue-600">No prescriptions found</h3>
              <p className="text-blue-600">Your prescriptions will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 