import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PatientSidebar } from "@/components/PatientSidebar";
import { Download, Eye, FileText, Filter, Search, ChevronDown, ChevronUp, AlertCircle, Pill, ChevronRight, Plus, XCircle, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RecordType = 'consultation' | 'surgery' | 'report' | 'medication';

interface MedicalRecord {
  id: string;
  type: RecordType;
  date: string;
  time: string;
  title: string;
  doctor?: string;
  description?: string;
  attachments?: number;
  medications?: { name: string; dosage: string }[];
  fileTypes?: string[];
}

const sampleRecords: MedicalRecord[] = [
  {
    id: "1",
    type: "consultation",
    date: "2023-04-15",
    time: "10:00 AM",
    title: "Initial Consultation",
    doctor: "Dr. Sarah Johnson",
    description: "Patient reported sensitivity in lower left molar.",
    attachments: 2,
    fileTypes: ["PDF", "JPG"]
  },
  {
    id: "2",
    type: "surgery",
    date: "2023-05-20",
    time: "2:30 PM",
    title: "Root Canal",
    doctor: "Dr. Michael Chen",
    description: "Procedure completed successfully.",
    attachments: 3,
    fileTypes: ["PDF", "DOC", "JPG"]
  },
  {
    id: "3",
    type: "medication",
    date: "2023-06-10",
    time: "11:00 AM",
    title: "Prescription Update",
    doctor: "Dr. Emily Rodriguez",
    medications: [
      { name: "Amoxicillin", dosage: "700mg" },
      { name: "Ibuprofen", dosage: "700mg" }
    ],
    attachments: 1,
    fileTypes: ["PDF"]
  }
];

export default function PatientMedicalRecords() {
  const [activeTab, setActiveTab] = useState<RecordType>('consultation');
  const [search, setSearch] = useState('');

  const filterRecords = (list: MedicalRecord[]) =>
    list.filter(record =>
      record.title.toLowerCase().includes(search.toLowerCase()) ||
      (record.doctor && record.doctor.toLowerCase().includes(search.toLowerCase()))
    );

  const getTypeColor = (type: RecordType) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-700';
      case 'surgery': return 'bg-red-100 text-red-700';
      case 'report': return 'bg-green-100 text-green-700';
      case 'medication': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-blue-100text-blue-600';
    }
  };

  const getTypeIcon = (type: RecordType) => {
    switch (type) {
      case 'consultation': return <AlertCircle className="h-4 w-4" />;
      case 'surgery': return <XCircle className="h-4 w-4" />;
      case 'report': return <FileText className="h-4 w-4" />;
      case 'medication': return <CheckCircle2 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      <PatientSidebar />
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Medical Records</h1>
          <Button className="bg-blue-600 hover:bg-blue-600 gap-2">
            <Plus className="h-4 w-4" />
            New Record
          </Button>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
        </div>

        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as RecordType)}>
          <TabsList>
            <TabsTrigger value="consultation">Consultations</TabsTrigger>
            <TabsTrigger value="surgery">Surgeries</TabsTrigger>
            <TabsTrigger value="report">Reports</TabsTrigger>
            <TabsTrigger value="medication">Medications</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterRecords(sampleRecords.filter(record => record.type === activeTab)).length > 0 ? (
                filterRecords(sampleRecords.filter(record => record.type === activeTab)).map((record) => (
                  <Card key={record.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <Badge className={`${getTypeColor(record.type)} gap-1`}>
                          {getTypeIcon(record.type)}
                          {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="font-medium text-lg mt-2">{record.title}</h3>
                      {record.doctor && <p className="text-sm text-blue-600">{record.doctor}</p>}
                      <p className="text-sm text-blue-600 mt-1">{record.date} at {record.time}</p>
                      {record.description && <p className="text-smtext-blue-600 mt-2">{record.description}</p>}
                      {record.medications && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Medications:</p>
                          <ul className="text-sm text-blue-600">
                            {record.medications.map((med, index) => (
                              <li key={index}>{med.name} - {med.dosage}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {record.attachments && (
                        <div className="mt-2 flex gap-2">
                          {record.fileTypes?.map((type, index) => (
                            <Badge key={index} variant="outline">{type}</Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                  <h3 className="text-lg font-mediumtext-blue-600">No records found</h3>
                  <p className="text-blue-600">Your medical records will appear here</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}