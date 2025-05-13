import React, { useState, useEffect } from "react";
import { 
  Calendar,
  Clock, 
  User,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Plus,
  FileText,
  Download,
  Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DoctorSidebar } from "@/components/DoctorSidebar";
import { useToast } from "@/components/ui/use-toast";

// Types for better type safety
type Appointment = {
  id: number;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  type: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
  duration?: string;
  patientPhoto?: string;
};

// Sample appointment data with more details
const sampleAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "Rahul Sharma",
    patientId: "PT-0012",
    date: "May 10, 2025",
    time: "10:00 AM",
    type: "Regular Check-up",
    status: "confirmed",
    duration: "30 mins",
    notes: "Patient has sensitivity in lower left molar",
    patientPhoto: "/patients/rahul-sharma.jpg"
  },
  {
    id: 2,
    patientName: "Priya Patel",
    patientId: "PT-0047",
    date: "May 10, 2025",
    time: "11:30 AM",
    type: "Root Canal",
    status: "confirmed",
    duration: "90 mins",
    patientPhoto: "/patients/priya-patel.jpg"
  },
  {
    id: 3,
    patientName: "Amit Kumar",
    patientId: "PT-0023",
    date: "May 10, 2025",
    time: "2:00 PM",
    type: "Tooth Extraction",
    status: "pending",
    duration: "45 mins",
    patientPhoto: "/patients/amit-kumar.jpg"
  },
  {
    id: 4,
    patientName: "Neha Gupta",
    patientId: "PT-0089",
    date: "May 11, 2025",
    time: "9:30 AM",
    type: "blue Cleaning",
    status: "confirmed",
    duration: "60 mins",
    patientPhoto: "/patients/neha-gupta.jpg"
  },
  {
    id: 5,
    patientName: "Vijay Singh",
    patientId: "PT-0056",
    date: "May 11, 2025",
    time: "3:00 PM",
    type: "Consultation",
    status: "pending",
    duration: "30 mins",
    patientPhoto: "/patients/vijay-singh.jpg"
  },
  {
    id: 6,
    patientName: "Sanjay Mehta",
    patientId: "PT-0033",
    date: "May 5, 2025",
    time: "10:30 AM",
    type: "blue Implant",
    status: "completed",
    duration: "120 mins",
    notes: "Procedure went well, follow-up in 2 weeks",
    patientPhoto: "/patients/sanjay-mehta.jpg"
  },
  {
    id: 7,
    patientName: "Ananya Reddy",
    patientId: "PT-0078",
    date: "May 4, 2025",
    time: "1:00 PM",
    type: "Teeth Whitening",
    status: "completed",
    duration: "60 mins",
    patientPhoto: "/patients/ananya-reddy.jpg"
  },
  {
    id: 8,
    patientName: "Rajan Malhotra",
    patientId: "PT-0041",
    date: "May 3, 2025",
    time: "11:00 AM",
    type: "Crown Fitting",
    status: "completed",
    duration: "45 mins",
    notes: "Patient satisfied with the fit",
    patientPhoto: "/patients/rajan-malhotra.jpg"
  },
  {
    id: 9,
    patientName: "Meena Desai",
    patientId: "PT-0095",
    date: "May 2, 2025",
    time: "4:00 PM",
    type: "Emergency",
    status: "completed",
    duration: "30 mins",
    notes: "Toothache relief provided",
    patientPhoto: "/patients/meena-desai.jpg"
  }
];

export default function DoctorAppointments() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [expandedAppointment, setExpandedAppointment] = useState<number | null>(null);
  const { toast } = useToast();

  // Filter appointments based on tab, search term, and status filter
  const filteredAppointments = sampleAppointments.filter(appointment => {
    const matchesTab = activeTab === 'upcoming' 
      ? new Date(appointment.date) >= new Date() 
      : new Date(appointment.date) < new Date();
    
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus ? appointment.status === filterStatus : true;
    
    return matchesTab && matchesSearch && matchesStatus;
  });

  // Group upcoming appointments by date
  const groupedUpcomingAppointments = filteredAppointments
    .filter(appointment => activeTab === 'upcoming')
    .reduce((acc, appointment) => {
      const date = appointment.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(appointment);
      return acc;
    }, {} as Record<string, Appointment[]>);

  // Sort grouped appointments by time
  Object.keys(groupedUpcomingAppointments).forEach(date => {
    groupedUpcomingAppointments[date].sort((a, b) => {
      return new Date(`1970/01/01 ${a.time}`).getTime() - new Date(`1970/01/01 ${b.time}`).getTime();
    });
  });

  // Sort past appointments by date (newest first)
  const sortedPastAppointments = filteredAppointments
    .filter(appointment => activeTab === 'past')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleStartSession = (appointmentId: number) => {
    // In a real app, this would navigate to the session page
    toast({
      title: "Session Started",
      description: `Starting appointment with patient ID: ${appointmentId}`,
    });
  };

  const handleReschedule = (appointmentId: number) => {
    // In a real app, this would open a rescheduling modal
    toast({
      title: "Reschedule Requested",
      description: `Rescheduling appointment ID: ${appointmentId}`,
    });
  };

  const handleCancel = (appointmentId: number) => {
    // In a real app, this would update the appointment status
    toast({
      title: "Appointment Cancelled",
      description: `Cancelled appointment ID: ${appointmentId}`,
      variant: "destructive",
    });
  };

  const toggleExpandAppointment = (id: number) => {
    setExpandedAppointment(expandedAppointment === id ? null : id);
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <DoctorSidebar activePath="/doctor/appointments" />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b h-20 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-2xl font-bold text-blue-600">Appointments</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              <span className="hidden md:inline">Print</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Export</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-600 gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">New Appointment</span>
            </Button>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <Tabs defaultValue="upcoming" className="w-auto">
              <TabsList>
                <TabsTrigger 
                  value="upcoming" 
                  onClick={() => setActiveTab('upcoming')}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-blue-600"
                >
                  Upcoming Appointments
                </TabsTrigger>
                <TabsTrigger 
                  value="past" 
                  onClick={() => setActiveTab('past')}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-blue-600"
                >
                  Past Appointments
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
                <Input
                  placeholder="Search appointments..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span>{filterStatus ? `Status: ${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}` : "Filter by status"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterStatus(null)}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('confirmed')}>
                    Confirmed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('pending')}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('completed')}>
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('cancelled')}>
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {activeTab === 'upcoming' ? (
            Object.keys(groupedUpcomingAppointments).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedUpcomingAppointments).map(([date, appointments]) => (
                  <div key={date} className="space-y-3">
                    <h2 className="text-lg font-semiboldtext-blue-600">{date}</h2>
                    <div className="grid gap-4">
                      {appointments.map((appointment) => (
                        <Card 
                          key={appointment.id} 
                          className="overflow-visible bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-blue-100"
                        >
                          <CardContent className="p-0">
                            <div className="flex flex-col">
                              <div className="p-5">
                                <div className="flex items-start gap-4">
                                  <Avatar className="h-12 w-12 border-2 border-blue-600 shadow-sm">
                                    <AvatarImage src={appointment.patientPhoto} alt={appointment.patientName} />
                                    <AvatarFallback>
                                      {appointment.patientName.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <h3 className="font-bold text-blue-600">{appointment.patientName}</h3>
                                        <p className="text-sm text-blue-600">{appointment.patientId}</p>
                                     
                                   
                                      <div className="flex items-center gap-2 text-sm text-blue-600">
                                        <Calendar className="h-4 w-4 text-blue-600" />
                                        <span>{appointment.date}</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-blue-600">
                                        <Clock className="h-4 w-4 text-blue-600" />
                                        <span>{appointment.time} ({appointment.duration})</span>
                                      </div>
                                     
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {expandedAppointment === appointment.id && appointment.notes && (
                                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-smtext-blue-600">
                                      <span className="font-medium">Notes:</span> {appointment.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                              
                              <div className="border-t border-blue-100 px-5 py-3 bg-blue-50 rounded-b-lg flex justify-between items-center">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-blue-600 hover:text-blue-600"
                                  onClick={() => toggleExpandAppointment(appointment.id)}
                                >
                                  {expandedAppointment === appointment.id ? (
                                    <>
                                      <ChevronUp className="h-4 w-4 mr-1" />
                                      Hide details
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="h-4 w-4 mr-1" />
                                      View details
                                    </>
                                  )}
                                </Button>
                                
                                <div className="flex gap-2">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                        onClick={() => handleReschedule(appointment.id)}
                                      >
                                        Reschedule
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Request to change appointment time</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  
                                  {appointment.status === 'confirmed' && (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button 
                                          size="sm" 
                                          className="bg-blue-600 hover:bg-blue-600"
                                          onClick={() => handleStartSession(appointment.id)}
                                        >
                                          Start Session
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Begin consultation with patient</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                  
                                  {appointment.status === 'pending' && (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button 
                                          variant="destructive" 
                                          size="sm" 
                                          onClick={() => handleCancel(appointment.id)}
                                        >
                                          Cancel
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Cancel this appointment</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm border border-blue-100">
                <Calendar className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-mediumtext-blue-600 mb-1">No upcoming appointments</h3>
                <p className="text-blue-600 text-sm mb-4">
                  {searchTerm || filterStatus 
                    ? "Try adjusting your search or filter criteria" 
                    : "You have no appointments scheduled for the near future"}
                </p>
                <Button className="bg-blue-600 hover:bg-blue-600 gap-2">
                  <Plus className="h-4 w-4" />
                  Schedule New Appointment
                </Button>
              </div>
            )
          ) : (
            sortedPastAppointments.length > 0 ? (
              <div className="space-y-4">
                {sortedPastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="overflow-hidden border border-blue-100 hover:shadow-sm transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-5 flex-1">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 border-2 border-blue-100">
                              <AvatarImage src={appointment.patientPhoto} alt={appointment.patientName} />
                              <AvatarFallback>
                                {appointment.patientName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-bold text-blue-600">{appointment.patientName}</h3>
                                  <p className="text-sm text-blue-600">{appointment.patientId}</p>
                                
                              
                                <div className="flex items-center gap-2 text-sm text-blue-600">
                                  <Calendar className="h-4 w-4 text-blue-600" />
                                  <span>{appointment.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-blue-600">
                                  <Clock className="h-4 w-4 text-blue-600" />
                                  <span>{appointment.time}</span>
                                </div>
                                
                              </div>
                              
                              {expandedAppointment === appointment.id && (
                                <div className="mt-3 space-y-2">
                                  {appointment.notes && (
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                      <p className="text-smtext-blue-600">
                                        <span className="font-medium">Notes:</span> {appointment.notes}
                                      </p>
                                    </div>
                                  )}
                                  <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                      <FileText className="h-4 w-4" />
                                      View Records
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-2">
                                      <Plus className="h-4 w-4" />
                                      Add Follow-up
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        </div>
                        <div className="border-t md:border-t-0 md:border-l border-blue-100 px-5 py-4 bg-blue-50 flex md:flex-col justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-600 hover:text-blue-600"
                            onClick={() => toggleExpandAppointment(appointment.id)}
                          >
                            {expandedAppointment === appointment.id ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Hide details
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                View details
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="sm">
                            View Full History
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm border border-blue-100">
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-mediumtext-blue-600 mb-1">No past appointments found</h3>
                <p className="text-blue-600 text-sm">
                  {searchTerm || filterStatus 
                    ? "Try adjusting your search or filter criteria" 
                    : "Your past appointments will appear here"}
                </p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}