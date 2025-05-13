import React, { useState, useEffect } from "react";
import { ReceptionSidebar } from "@/components/ReceptionSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Plus } from "lucide-react";
import { appointmentService } from '@/services/appointmentService';

interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  startTime: string;
  endTime: string;
  appointmentDate: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  patientName?: string;
  doctorName?: string;
}

export default function ReceptionAppointments() {
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await appointmentService.getAllAppointments();
        setAppointments(data);
      } catch (err) {
        setError('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const filterAppointments = (list: Appointment[]) =>
    list.filter(a =>
      (a.patientName?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (a.doctorName?.toLowerCase() || '').includes(search.toLowerCase())
    );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-700">{error}</div>;

  return (
    <div className="flex min-h-screen bg-blue-50">
      <ReceptionSidebar activePath="/reception/appointments" />
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Appointments</h1>
          <Button className="bg-blue-600 hover:bg-blue-600 gap-2">
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
        </div>
        <div className="mb-6">
          <Input
            placeholder="Search by patient or doctor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterAppointments(appointments).length > 0 ? (
            filterAppointments(appointments).map(app => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-700" />
                      <span className="font-medium">{app.patientName || app.patientId}</span>
                    </div>
                    <Badge className={app.status === 'Checked In' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {app.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-600 mb-1">
                    <Calendar className="h-4 w-4" />
                    {app.startTime ? new Date(app.startTime).toLocaleString() : ''}
                  </div>
                  <div className="text-sm text-blue-600">Doctor: {app.doctorName || app.doctorId}</div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-mediumtext-blue-600">No appointments found</h3>
              <p className="text-blue-600">Appointments will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
