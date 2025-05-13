import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { blueSidebar } from "@/components/blueSidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight,
  Clock,
  User,
  Calendar as CalendarIcon,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Plus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Appointment {
  id: string;
  title: string;
  doctor: string;
  date: Date;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  type: string;
  doctorImage?: string;
  location: string;
  notes?: string;
}

const AppointmentPage = () => {
  const location = useLocation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const { toast } = useToast();

  // Sample appointment data
  const upcomingAppointments: Appointment[] = [
    {
      id: '1',
      title: 'blue Checkup',
      doctor: 'Dr. Sarah Johnson',
      date: new Date(2023, 3, 20),
      time: '10:00 AM',
      status: 'confirmed',
      type: 'Routine Checkup',
      doctorImage: '/doctors/dr-sarah.jpg',
      location: 'Main Clinic - Room 201',
      notes: 'Please arrive 15 minutes early for paperwork'
    },
    {
      id: '2',
      title: 'Teeth Cleaning',
      doctor: 'Dr. Michael Chen',
      date: new Date(2023, 3, 25),
      time: '2:30 PM',
      status: 'pending',
      type: 'Hygiene Appointment',
      doctorImage: '/doctors/dr-michael.jpg',
      location: 'Main Clinic - Room 105'
    }
  ];

  const pastAppointments: Appointment[] = [
    {
      id: '3',
      title: 'Root Canal Consultation',
      doctor: 'Dr. Emily Rodriguez',
      date: new Date(2023, 2, 15),
      time: '9:00 AM',
      status: 'confirmed',
      type: 'Consultation',
      doctorImage: '/doctors/dr-emily.jpg',
      location: 'Main Clinic - Room 302'
    },
    {
      id: '4',
      title: 'Tooth Extraction',
      doctor: 'Dr. Sarah Johnson',
      date: new Date(2023, 1, 28),
      time: '11:00 AM',
      status: 'cancelled',
      type: 'Procedure',
      doctorImage: '/doctors/dr-sarah.jpg',
      location: 'Main Clinic - Room 201'
    }
  ];

  const handleReschedule = (appointmentId: string) => {
    toast({
      title: "Reschedule Requested",
      description: `Rescheduling appointment ${appointmentId}`,
    });
  };

  const handleCancel = (appointmentId: string) => {
    toast({
      title: "Appointment Cancelled",
      description: `Cancelled appointment ${appointmentId}`,
      variant: "destructive",
    });
  };

  const handleNewAppointment = () => {
    toast({
      title: "New Appointment",
      description: "Creating new appointment",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default" className="gap-1 bg-green-100 text-green-700">
          <CheckCircle2 className="h-3 w-3" />
          Confirmed
        </Badge>;
      case 'pending':
        return <Badge variant="secondary" className="gap-1 bg-yellow-100 text-yellow-700">
          <AlertCircle className="h-3 w-3" />
          Pending
        </Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          Cancelled
        </Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <blueSidebar activePath={location.pathname} />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b h-14 flex items-center justify-between px-6">
          <div className="flex items-center text-sm">
            <span className="text-blue-600">Patient</span>
            <ChevronRight className="h-4 w-4 mx-2 text-blue-600" />
            <span className="font-medium">Appointments</span>
          </div>
          <Button 
            onClick={handleNewAppointment}
            className="bg-blue-600 hover:bg-blue-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </header>
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Appointments</h1>
            <div className="relative w-64">
              <Input placeholder="Search appointments..." />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendar Section */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-700 mr-2"></div>
                    <span className="text-sm">Confirmed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-700 mr-2"></div>
                    <span className="text-sm">Pending</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-700 mr-2"></div>
                    <span className="text-sm">Cancelled</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Appointments Section */}
            <Card className="md:col-span-2">
              <CardHeader>
                <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as 'upcoming' | 'past')}>
                  <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TabsContent value="upcoming">
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                              <div className="flex-1">
                                <div className="flex items-start gap-3">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={appointment.doctorImage} />
                                    <AvatarFallback>
                                      {appointment.doctor.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-medium text-lg">{appointment.title}</h3>
                                    <p className="text-sm text-blue-600">{appointment.doctor}</p>
                                    <div className="mt-1">
                                      {getStatusBadge(appointment.status)}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                  <div className="flex items-center text-sm text-blue-600">
                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                    <span>
                                      {appointment.date.toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                      })}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-sm text-blue-600">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-blue-600">
                                    <User className="h-4 w-4 mr-2" />
                                    <span>{appointment.type}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-blue-600">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{appointment.location}</span>
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
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleReschedule(appointment.id)}
                                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                >
                                  Reschedule
                                </Button>
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleCancel(appointment.id)}
                                  className="text-red-600 border-red-300 hover:bg-red-50"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                      <h3 className="text-lg font-mediumtext-blue-600">No upcoming appointments</h3>
                      <p className="text-blue-600 mb-4">Schedule an appointment to get started</p>
                      <Button 
                        onClick={handleNewAppointment}
                        className="bg-blue-600 hover:bg-blue-600"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="past">
                  {pastAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {pastAppointments.map((appointment) => (
                        <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                              <div className="flex-1">
                                <div className="flex items-start gap-3">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={appointment.doctorImage} />
                                    <AvatarFallback>
                                      {appointment.doctor.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-medium text-lg">{appointment.title}</h3>
                                    <p className="text-sm text-blue-600">{appointment.doctor}</p>
                                    <div className="mt-1">
                                      {getStatusBadge(appointment.status)}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                  <div className="flex items-center text-sm text-blue-600">
                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                    <span>
                                      {appointment.date.toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                      })}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-sm text-blue-600">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-blue-600">
                                    <User className="h-4 w-4 mr-2" />
                                    <span>{appointment.type}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-blue-600">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{appointment.location}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 sm:w-40">
                                <Button variant="outline" className="text-blue-600">
                                  View Details
                                </Button>
                                <Button variant="outline" className="text-blue-600">
                                  Book Follow-up
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                      <h3 className="text-lg font-mediumtext-blue-600">No past appointments</h3>
                      <p className="text-blue-600">Your appointment history will appear here</p>
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentPage;