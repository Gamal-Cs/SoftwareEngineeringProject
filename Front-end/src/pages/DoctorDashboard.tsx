import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  CheckCircle,
  User,
  ArrowRight,
  Plus,
  Bell,
  Search,
  ChevronDown
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DentalLogo from "@/components/DentalLogo";
import { useToast } from "@/components/ui/use-toast";

export default function DoctorDashboard() {
  const [selectedDay, setSelectedDay] = useState<number>(12);
  const { toast } = useToast();

  const weekDays = [
    { name: "SUN", active: false },
    { name: "MON", active: true, startTime: "10:00 AM", endTime: "7:00 PM" },
    { name: "TUE", active: true, startTime: "3:00 PM", endTime: "7:00 PM" },
    { name: "WED", active: true, startTime: "10:00 AM", endTime: "7:00 PM" },
    { name: "THU", active: false },
    { name: "FRI", active: true, startTime: "10:00 AM", endTime: "7:00 PM" },
    { name: "SAT", active: true, startTime: "3:00 PM", endTime: "5:00 PM" },
  ];

  const daysInWeek = [
    { day: "Sun", date: 11 },
    { day: "Mon", date: 12, isActive: true },
    { day: "Tue", date: 13 },
    { day: "Wed", date: 14 },
    { day: "Thu", date: 15 },
    { day: "Fri", date: 16 },
    { day: "Sat", date: 17 },
  ];

  const todoItems = [
    { id: 1, text: "Retinal detachment surgery", time: "11:00 AM", done: true },
    { id: 2, text: "Inventory Management", time: "11:00 AM", done: false },
    { id: 3, text: "Consulting", time: "12:00 PM", done: false },
    { id: 4, text: "Meeting with Dr. Vishal Roy", time: "12:30 PM", done: true },
    { id: 5, text: "Lunch", time: "1:00 PM", done: false },
  ];

  const scheduleItems = [
    { 
      id: 1,
      time: "11:00 - 12:00 AM", 
      title: "Retinal detachment surgery",
      patient: "John Smith",
      type: "Surgery",
      color: "bg-blue-100" 
    },
    { 
      id: 2,
      time: "2:00 - 3:00 PM", 
      title: "Eye infection treatment",
      patient: "Sarah Johnson",
      type: "Consultation",
      subtext: "3 Regular consultations",
      color: "bg-yellow-100" 
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patientName: "Rahul Sharma",
      date: "May 10, 2025",
      time: "10:00 AM",
      type: "Regular Check-up"
    },
    {
      id: 2,
      patientName: "Priya Patel",
      date: "May 10, 2025",
      time: "11:30 AM",
      type: "Root Canal"
    },
  ];

  const toggleTodoStatus = (id: number) => {
    toast({
      title: "Todo updated",
      description: "Task status changed successfully",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="p-4 border-b flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2 font-bold text-blue-600 mb-6">
            <DentalLogo size={28} />
            <span>DentalCare</span>
          </Link>
          <Avatar className="h-24 w-24 mb-3 border-2 border-blue-100">
            <AvatarImage src="/doctor-avatar.jpg" alt="Dr. Anushka Singh" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">Dr. Anushka Singh</h2>
          <p className="text-sm text-blue-600">General Dentist</p>
        </div>
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            <li>
              <Link to="/doctor/dashboard" className="flex items-center p-3 rounded-lg bg-blue-100 text-blue-600 font-medium">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/doctor/appointments" className="flex items-center p-3 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Calendar className="w-5 h-5 mr-3" />
                Appointments
              </Link>
            </li>
            <li>
              <Link to="/doctor/patients" className="flex items-center p-3 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <User className="w-5 h-5 mr-3" />
                Patients
              </Link>
            </li>
            <li>
              <Link to="/doctor/schedule" className="flex items-center p-3 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Clock className="w-5 h-5 mr-3" />
                Schedule
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b h-20 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-2xl font-bold text-blue-600">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/doctor-avatar.jpg" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-blue-50 border-blue-100">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg font-medium text-blue-600">Today's Appointments</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">8</span>
                  <Badge variant="default" className="flex items-center gap-1 bg-green-100 text-green-700">
                    <ArrowRight className="h-4 w-4" />
                    <span>2 Upcoming</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 bg-blue-50 border-blue-100">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg font-medium text-blue-600">Total Patients</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">142</span>
                  <Badge variant="default" className="flex items-center gap-1 bg-blue-100 text-blue-700">
                    <Plus className="h-4 w-4" />
                    <span>5 New</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 bg-green-50 border-green-100">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg font-medium text-blue-600">Available Slots</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">12</span>
                  <Button variant="outline" size="sm" className="border-green-300 text-green-700">
                    View Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Availability Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Availability Status</span>
                    <Button variant="outline" size="sm">
                      Edit Availability
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {weekDays.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold shadow-sm transition-all ${day.active ? 'bg-blue-500 text-white' : 'border border-gray-300 text-blue-600 bg-gray-50'}`}>
                          {day.name}
                        </div>
                        {day.active ? (
                          <div className="text-xs text-center mt-2 text-blue-600 space-y-1">
                            <div>{day.startTime}</div>
                            <div>to</div>
                            <div>{day.endTime}</div>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 mt-2">Unavailable</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scheduleItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg border">
                      <div className={`w-3 h-full rounded-full ${item.color}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{item.title}</h3>
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        </div>
                        <p className="text-sm text-blue-600 mt-1">{item.time}</p>
                        {item.subtext && <p className="text-sm text-blue-600 mt-1">{item.subtext}</p>}
                        <p className="text-sm text-blue-700 mt-2">Patient: {item.patient}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{appointment.patientName}</h4>
                        <p className="text-sm text-blue-600">{appointment.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{appointment.time}</p>
                        <p className="text-xs text-blue-600">{appointment.date}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2" size="sm">
                    View All Appointments
                  </Button>
                </CardContent>
              </Card>

              {/* Todo List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Tasks</span>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Task
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {todoItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <button 
                        onClick={() => toggleTodoStatus(item.id)}
                        className={`mt-1 flex-shrink-0 h-5 w-5 rounded border ${item.done ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}
                      >
                        {item.done && <CheckCircle className="h-5 w-5 text-white" />}
                      </button>
                      <div className={`flex-1 ${item.done ? 'text-gray-400 line-through' : ''}`}>
                        <p>{item.text}</p>
                        <p className="text-xs text-blue-600">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}