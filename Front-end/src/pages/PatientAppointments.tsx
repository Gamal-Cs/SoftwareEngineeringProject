import React, { useState } from "react";
import { PatientSidebar } from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle2, AlertCircle, XCircle, ChevronRight, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

type Appointment = {
  id: string;
  title: string;
  doctor: string;
  date: string;
  time: string;
  status: string;
  type: string;
  doctorImage: string;
  location: string;
  notes?: string;
};

const sampleUpcoming = [
  {
    id: "1",
    title: "blue Checkup",
    doctor: "Dr. Sarah Johnson",
    date: "2025-04-20",
    time: "10:00 AM",
    status: "confirmed",
    type: "Routine Checkup",
    doctorImage: "/doctors/dr-sarah.jpg",
    location: "Main Clinic - Room 201",
    notes: "Please arrive 15 minutes early for paperwork"
  },
  {
    id: "2",
    title: "Teeth Cleaning",
    doctor: "Dr. Michael Chen",
    date: "2025-04-25",
    time: "2:30 PM",
    status: "pending",
    type: "Hygiene Appointment",
    doctorImage: "/doctors/dr-michael.jpg",
    location: "Main Clinic - Room 105"
  }
];

const samplePast = [
  {
    id: "3",
    title: "Root Canal Consultation",
    doctor: "Dr. Emily Rodriguez",
    date: "2024-03-15",
    time: "9:00 AM",
    status: "confirmed",
    type: "Consultation",
    doctorImage: "/doctors/dr-emily.jpg",
    location: "Main Clinic - Room 302"
  },
  {
    id: "4",
    title: "Tooth Extraction",
    doctor: "Dr. Sarah Johnson",
    date: "2024-01-28",
    time: "11:00 AM",
    status: "cancelled",
    type: "Procedure",
    doctorImage: "/doctors/dr-sarah.jpg",
    location: "Main Clinic - Room 201"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge variant="default" className="gap-1 bg-green-100 text-green-700"><CheckCircle2 className="h-3 w-3" /> Confirmed</Badge>;
    case "pending":
      return <Badge variant="secondary" className="gap-1 bg-yellow-100 text-yellow-700"><AlertCircle className="h-3 w-3" /> Pending</Badge>;
    case "cancelled":
      return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Cancelled</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function PatientAppointments() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [search, setSearch] = useState('');

  const filterAppointments = (list: Appointment[]) =>
    list.filter(a =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="flex min-h-screen bg-blue-50">
      <PatientSidebar />
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">My Appointments</h1>
          <Button className="bg-blue-600 hover:bg-blue-600 gap-2">
            <Plus className="h-4 w-4" />
            Book New Appointment
          </Button>
        </div>
        <Card className="mb-8">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 md:items-center">
            <Input
              placeholder="Search appointments..."
              className="w-full md:w-80"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Tabs value={activeTab} onValueChange={val => setActiveTab(val as 'upcoming' | 'past')} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="upcoming">
            {filterAppointments(sampleUpcoming).length > 0 ? (
              <div className="space-y-4">
                {filterAppointments(sampleUpcoming).map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={appointment.doctorImage} />
                              <AvatarFallback>{appointment.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-lg">{appointment.title}</h3>
                              <p className="text-sm text-blue-600">{appointment.doctor}</p>
                              <div className="mt-1">{getStatusBadge(appointment.status)}</div>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="flex items-center text-sm text-blue-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-blue-600">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-blue-600">
                              <span className="font-medium">Type:</span>
                              <span className="ml-2">{appointment.type}</span>
                            </div>
                            <div className="flex items-center text-sm text-blue-600">
                              <span className="font-medium">Location:</span>
                              <span className="ml-2">{appointment.location}</span>
                            </div>
                          </div>
                          {appointment.notes && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-md">
                              <p className="text-sm text-blue-600">
                                <span className="font-medium">Notes:</span> {appointment.notes}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 sm:w-40">
                          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">Reschedule</Button>
                          <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">Cancel</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <h3 className="text-lg font-mediumtext-blue-600">No upcoming appointments</h3>
                <p className="text-blue-600 mb-4">Book a new appointment to get started</p>
                <Button className="bg-blue-600 hover:bg-blue-600">
                  <Plus className="h-4 w-4 mr-2" /> Book Appointment
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="past">
            {filterAppointments(samplePast).length > 0 ? (
              <div className="space-y-4">
                {filterAppointments(samplePast).map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={appointment.doctorImage} />
                              <AvatarFallback>{appointment.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-lg">{appointment.title}</h3>
                              <p className="text-sm text-blue-600">{appointment.doctor}</p>
                              <div className="mt-1">{getStatusBadge(appointment.status)}</div>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="flex items-center text-sm text-blue-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-blue-600">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-blue-600">
                              <span className="font-medium">Type:</span>
                              <span className="ml-2">{appointment.type}</span>
                            </div>
                            <div className="flex items-center text-sm text-blue-600">
                              <span className="font-medium">Location:</span>
                              <span className="ml-2">{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:w-40">
                          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">View Details</Button>
                          <Button variant="outline" className="text-blue-600">Book Follow-up</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <h3 className="text-lg font-mediumtext-blue-600">No past appointments</h3>
                <p className="text-blue-600">Your appointment history will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 