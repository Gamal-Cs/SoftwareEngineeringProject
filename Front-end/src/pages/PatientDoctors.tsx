import React, { useState } from "react";
import { PatientSidebar } from "@/components/PatientSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Phone, Mail, Plus, User } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  image?: string;
  nextAppointment?: string;
}

const sampleDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "General Dentistry",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@dentics.com",
    image: "/doctors/dr-sarah.jpg",
    nextAppointment: "2024-05-10"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Orthodontics",
    phone: "+1 (555) 234-5678",
    email: "michael.chen@dentics.com",
    image: "/doctors/dr-michael.jpg",
    nextAppointment: "2024-06-01"
  }
];

export default function PatientDoctors() {
  const [search, setSearch] = useState("");

  const filterDoctors = (list: Doctor[]) =>
    list.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="flex min-h-screen bg-blue-50">
      <PatientSidebar />
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">My Doctors</h1>
          <Button className="bg-blue-600 hover:bg-blue-600 gap-2">
            <Plus className="h-4 w-4" />
            Add Doctor
          </Button>
        </div>
        <div className="mb-6">
          <Input
            placeholder="Search by name or specialty..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoctors(sampleDoctors).length > 0 ? (
            filterDoctors(sampleDoctors).map(doctor => (
              <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={doctor.image} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{doctor.name}</h3>
                      <p className="text-sm text-blue-600">{doctor.specialty}</p>
                      {doctor.nextAppointment && (
                        <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                          <Calendar className="h-4 w-4" />
                          Next appointment: {doctor.nextAppointment}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Phone className="h-4 w-4" />
                      {doctor.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Mail className="h-4 w-4" />
                      {doctor.email}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="outline" size="sm">Book Appointment</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <User className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-mediumtext-blue-600">No doctors found</h3>
              <p className="text-blue-600">Your doctors will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 