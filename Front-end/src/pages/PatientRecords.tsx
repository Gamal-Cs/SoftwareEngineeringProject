import React, { useState } from "react";
import { PatientSidebar } from "@/components/PatientSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Plus, User } from "lucide-react";

interface Record {
  id: string;
  date: string;
  doctor: string;
  summary: string;
  type: string;
  notes?: string;
  fileTypes?: string[];
}

const sampleRecords: Record[] = [
  {
    id: "1",
    date: "2024-04-10",
    doctor: "Dr. Sarah Johnson",
    summary: "Routine blue checkup, no issues found.",
    type: "Consultation",
    fileTypes: ["PDF"]
  },
  {
    id: "2",
    date: "2024-03-15",
    doctor: "Dr. Michael Chen",
    summary: "Orthodontic follow-up, adjusted braces.",
    type: "Treatment",
    notes: "Next visit in 6 weeks.",
    fileTypes: ["PDF", "JPG"]
  }
];

export default function PatientRecords() {
  const [search, setSearch] = useState("");

  const filterRecords = (list: Record[]) =>
    list.filter(r =>
      r.doctor.toLowerCase().includes(search.toLowerCase()) ||
      r.summary.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="flex min-h-screen bg-blue-50">
      <PatientSidebar />
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Medical Records</h1>
          <Button className="bg-blue-600 hover:bg-blue-600 gap-2">
            <Plus className="h-4 w-4" />
            Add Record
          </Button>
        </div>
        <div className="mb-6">
          <Input
            placeholder="Search by doctor, summary, or type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterRecords(sampleRecords).length > 0 ? (
            filterRecords(sampleRecords).map(record => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-blue-100 text-blue-700 gap-1">
                      <FileText className="h-4 w-4" /> {record.type}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-lg mt-2">{record.date}</h3>
                  <p className="text-sm text-blue-600">{record.doctor}</p>
                  <div className="mt-3 text-smtext-blue-600">{record.summary}</div>
                  {record.notes && (
                    <div className="mt-2 text-sm text-blue-600">
                      <span className="font-medium">Notes:</span> {record.notes}
                    </div>
                  )}
                  {record.fileTypes && (
                    <div className="mt-2 flex gap-2">
                      {record.fileTypes.map((type, idx) => (
                        <Badge key={idx} variant="outline">{type}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <User className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-mediumtext-blue-600">No records found</h3>
              <p className="text-blue-600">Your medical records will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
