import React, { useState } from "react";
import { ReceptionSidebar } from "@/components/ReceptionSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Phone, Mail, Plus } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  image?: string;
}

const samplePatients: Patient[] = [
  { id: "1", name: "John Smith", phone: "+1 (555) 123-4567", email: "john.smith@email.com", status: "Active", image: "/patients/john.jpg" },
  { id: "2", name: "Sarah Johnson", phone: "+1 (555) 234-5678", email: "sarah.johnson@email.com", status: "Inactive", image: "/patients/sarah.jpg" }
];

export default function ReceptionPatients() {
  const [search, setSearch] = useState("");

  const filterPatients = (list: Patient[]) =>
    list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="flex min-h-screen bg-blue-50">
      <ReceptionSidebar activePath="/reception/patients" />
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Patients</h1>
          <Button className="bg-blue-600 hover:bg-blue-600 gap-2">
            <Plus className="h-4 w-4" />
            Add Patient
          </Button>
        </div>
        <div className="mb-6">
          <Input
            placeholder="Search by name, phone, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterPatients(samplePatients).length > 0 ? (
            filterPatients(samplePatients).map(patient => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={patient.image} />
                      <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{patient.name}</h3>
                      <p className="text-sm text-blue-600">{patient.phone}</p>
                      <p className="text-sm text-blue-600">{patient.email}</p>
                      <Badge className={patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>{patient.status}</Badge>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <User className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-mediumtext-blue-600">No patients found</h3>
              <p className="text-blue-600">Patients will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 