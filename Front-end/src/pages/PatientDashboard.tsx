import React from "react";
import { Link } from "react-router-dom";
import { PatientSidebar } from "@/components/PatientSidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, Clock, AlertCircle, ChevronRight, Pill, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PatientDashboard() {
  const date = new Date();
  const upcomingAppointment = {
    date: "April 20, 2025",
    day: "Monday",
    time: "10:30 AM",
    doctor: "Dr. Xyz Sharma",
    specialty: "General Dentistry",
    location: "Dentics Main Clinic"
  };

  const recentMedications = [
    { name: "PlaceboMax", dosage: "1 - 0 - 1", status: "active", lastFilled: "2 days ago" },
    { name: "Sugarpharm", dosage: "0 - 0 - 1", status: "active", lastFilled: "1 week ago" },
    { name: "Pseudopill", dosage: "1 - 1 - 1", status: "completed", lastFilled: "3 weeks ago" }
  ];

  const medicalHistory = [
    { 
      type: "Consultation", 
      date: "25 March, 2023", 
      doctor: "Dr. ABC", 
      notes: "Routine blue checkup, no cavities detected" 
    },
    { 
      type: "Surgery", 
      date: "20 April, 2022", 
      description: "Retinal detachment surgery",
      doctors: ["Dr. XYZ", "Dr. ABC"],
      outcome: "Successful procedure with normal healing"
    },
    { 
      type: "Reports", 
      date: "18 June, 2022", 
      title: "X-ray reports",
      attachments: 2,
      fileTypes: ["PDF", "DICOM"]
    }
  ];

  return (
    <div className="flex min-h-screen bg-blue-50">
      <PatientSidebar />
      <div className="flex-1 p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Patient Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-blue-600">Last updated: Today</span>
            <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50">
              Active
            </Badge>
          </div>
        </div>
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-600 text-white mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-xl font-bold mb-2">Welcome back, John!</h2>
                <p className="opacity-90">You have 1 upcoming appointment and 3 active medications</p>
              </div>
              <Button variant="secondary" className="mt-4 md:mt-0">
                View Health Summary
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Upcoming Appointment Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Upcoming Appointment</CardTitle>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  In 3 days
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{upcomingAppointment.date}</h3>
                    <p className="text-blue-600">{upcomingAppointment.day} at {upcomingAppointment.time}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/doctor-avatar.jpg" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{upcomingAppointment.doctor}</h4>
                      <p className="text-sm text-blue-600">{upcomingAppointment.specialty}</p>
                      <p className="text-sm text-blue-600 mt-1">{upcomingAppointment.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="border-blue-600 text-blue-600">
                      Reschedule
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-600">
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="border-l pl-6 hidden md:block">
                  <h4 className="text-sm font-medium text-blue-600 mb-3">May 2025</h4>
                  <Calendar
                    mode="single"
                    selected={date}
                    className="rounded-md border shadow-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Recent Medications Card */}
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMedications.map((med, index) => (
                <div key={index} className="flex items-start justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${med.status === 'completed' ? 'bg-blue-100' : 'bg-blue-100'}`}>
                      <Pill className={`h-5 w-5 ${med.status === 'completed' ? 'text-blue-600' : 'text-blue-700'}`} />
                    </div>
                    <div>
                      <h4 className="font-medium">{med.name}</h4>
                      <p className="text-sm text-blue-600">{med.dosage}</p>
                      <p className="text-xs text-blue-600 mt-1">Last filled: {med.lastFilled}</p>
                    </div>
                  </div>
                  <Badge variant={med.status === 'completed' ? 'outline' : 'default'} className="h-6">
                    {med.status}
                  </Badge>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50">
                View all medications <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* Medical History Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-blue-600">Medical History</h2>
            <Link to="/patient-records" className="text-sm text-blue-600 hover:underline">
              View full history
            </Link>
          </div>
          <div className="space-y-4">
            {medicalHistory.map((record, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${record.type === 'Surgery' ? 'bg-red-100' : record.type === 'Reports' ? 'bg-amber-100' : 'bg-blue-100'}`}>
                        {record.type === 'Surgery' ? (
                          <AlertCircle className="h-5 w-5 text-red-700" />
                        ) : record.type === 'Reports' ? (
                          <FileText className="h-5 w-5 text-amber-700" />
                        ) : (
                          <Eye className="h-5 w-5 text-blue-700" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{record.type}</h3>
                        <p className="text-sm text-blue-600">{record.date}</p>
                        {record.type === 'Consultation' && (
                          <p className="text-blue-600 mt-2">{record.notes}</p>
                        )}
                        {record.type === 'Surgery' && (
                          <>
                            <p className="text-blue-600 mt-2">{record.description}</p>
                            <p className="text-sm text-blue-600 mt-1">
                              Surgeons: {record.doctors.join(', ')}
                            </p>
                          </>
                        )}
                        {record.type === 'Reports' && (
                          <div className="mt-3">
                            <div className="flex gap-3">
                              {record.fileTypes.map((type, i) => (
                                <Badge key={i} variant="outline" className="gap-1">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-4 mt-3">
                              <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
                                <Download className="h-4 w-4" /> Download
                              </Button>
                              <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
                                <Eye className="h-4 w-4" /> View
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}