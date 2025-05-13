import React, { useEffect, useState } from 'react';
import { ReceptionSidebar } from "@/components/ReceptionSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  MoreHorizontal,
  DownloadIcon,
  Filter
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { appointmentService } from '@/services/appointmentService';
import { medicalRecordService } from '@/services/medicalRecordService';
import { billService } from '@/services/billService';
import { userService } from '@/services/userService';
import { AppointmentResponse } from '@/services/appointmentService';
import { MedicalRecordResponse } from '@/services/medicalRecordService';
import { BillResponse } from '@/services/billService';

export default function ReceptionDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordResponse[]>([]);
  const [bills, setBills] = useState<BillResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check if user is authenticated and has reception role
    const user = userService.getCurrentUser();
    if (!user || user.role !== 'RECEPTION') {
      navigate('/login');
      return;
    }

    const loadReceptionData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [appointmentsRes, recordsRes, billsRes] = await Promise.all([
          appointmentService.getAllAppointments(),
          medicalRecordService.getAllMedicalRecords(),
          billService.getAllBills()
        ]);

        setAppointments(appointmentsRes);
        setMedicalRecords(recordsRes);
        setBills(billsRes);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadReceptionData();
  }, [navigate]);

  // State for managing the selected date (default to today)
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  // Function to go to the next day
  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  // Function to go to the previous day
  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(previousDay);
  };

  // Format the selected date to display in the header
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter(appointment => {
    const searchLower = searchQuery.toLowerCase();
    return (
      appointment.patient?.firstName.toLowerCase().includes(searchLower) ||
      appointment.patient?.lastName.toLowerCase().includes(searchLower) ||
      appointment.doctor?.firstName.toLowerCase().includes(searchLower) ||
      appointment.doctor?.lastName.toLowerCase().includes(searchLower) ||
      appointment.notes?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-red-700">
          <p className="text-xl font-semibold">{error}</p>
          <Button 
            className="mt-4 bg-blue-600 hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-blue-100">
      <ReceptionSidebar className="hidden lg:block" activePath="/reception/dashboard" />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white p-4 border-b sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">Appointments</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-600"
                onClick={() => navigate('/reception/appointments/new')}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </div>
          </div>
        </header>
        
        <main className="p-4 md:p-6">
          {/* Date Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToPreviousDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium px-2">{formattedDate}</div>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative w-full max-w-sm ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
              <Input 
                placeholder="Search appointments..." 
                className="pl-9 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Appointments Grid */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] font-medium text-sm text-blue-600 p-3 border-b">
              <div className="px-3">Time</div>
              <div className="px-3">Patient</div>
              <div className="px-3">Service</div>
              <div className="px-3">Doctor</div>
              <div className="px-3">Actions</div>
            </div>
            
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-8 text-blue-600">
                No appointments found
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center text-sm p-3 hover:bg-blue-50 border-b">
                  <div className="px-3 text-blue-600 font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-blue-600" />
                    {new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="px-3">
                    <div className="font-medium">
                      {appointment.patient?.firstName} {appointment.patient?.lastName}
                    </div>
                    <div className="text-blue-600 text-xs">
                      Phone: {appointment.patient?.phoneNumber}
                    </div>
                  </div>
                  <div className="px-3">
                    <div>{appointment.notes || 'No service specified'}</div>
                    <div className="text-blue-600 text-xs">Status: {appointment.status}</div>
                  </div>
                  <div className="px-3">
                    <div>Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}</div>
                    <div className="text-blue-600 text-xs">{appointment.doctor?.specialization}</div>
                  </div>
                  <div className="px-3">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-blue-600 hover:text-blue-600"
                        onClick={() => navigate(`/reception/appointments/${appointment.id}`)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Calendar Preview */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="border-b p-3">
              <h2 className="font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                Calendar Overview
              </h2>
            </div>
            <div className="p-4 grid grid-cols-7 gap-2 text-center text-sm">
              <div className="text-blue-600">Sun</div>
              <div className="text-blue-600">Mon</div>
              <div className="text-blue-600">Tue</div>
              <div className="text-blue-600">Wed</div>
              <div className="text-blue-600">Thu</div>
              <div className="text-blue-600">Fri</div>
              <div className="text-blue-600">Sat</div>
              
              {/* Calendar days would be dynamically generated here */}
              {/* For now showing a static example */}
              <div className="text-blue-600 p-2">28</div>
              <div className="text-blue-600 p-2">29</div>
              <div className="text-blue-600 p-2">30</div>
              <div className="p-2">1</div>
              <div className="p-2">2</div>
              <div className="p-2">3</div>
              <div className="p-2">4</div>
              
              <div className="p-2">5</div>
              <div className="p-2">6</div>
              <div className="p-2">7</div>
              <div className="p-2">8</div>
              <div className="bg-blue-600 text-blue-600 rounded p-2 font-medium">9</div>
              <div className="p-2">10</div>
              <div className="p-2">11</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
