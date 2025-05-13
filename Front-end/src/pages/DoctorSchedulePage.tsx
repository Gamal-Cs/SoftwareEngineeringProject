import React, { useState } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { 
  Calendar,
  Clock,
  Plus,
  Trash2,
  Save,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Settings,
  Sun,
  Moon,
  Watch
} from "lucide-react";
import { DoctorSidebar } from "@/components/DoctorSidebar";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  type?: 'consultation' | 'surgery' | 'checkup';
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
  working: boolean;
  workingHours?: {
    start: string;
    end: string;
  };
}

export default function DoctorSchedulePage() {
  const [schedules, setSchedules] = useState<DaySchedule[]>([
    {
      day: "Monday",
      working: true,
      workingHours: { start: "09:00", end: "17:00" },
      slots: [
        { id: "1", startTime: "09:00", endTime: "10:00", isAvailable: true, type: 'consultation' },
        { id: "2", startTime: "10:00", endTime: "11:00", isAvailable: true, type: 'consultation' },
        { id: "3", startTime: "14:00", endTime: "15:00", isAvailable: true, type: 'checkup' },
      ]
    },
    {
      day: "Tuesday",
      working: true,
      workingHours: { start: "10:00", end: "18:00" },
      slots: [
        { id: "4", startTime: "10:00", endTime: "11:00", isAvailable: true, type: 'consultation' },
        { id: "5", startTime: "14:00", endTime: "15:00", isAvailable: true, type: 'surgery' },
      ]
    },
    {
      day: "Wednesday",
      working: true,
      workingHours: { start: "09:00", end: "17:00" },
      slots: [
        { id: "6", startTime: "09:00", endTime: "10:00", isAvailable: true, type: 'consultation' },
        { id: "7", startTime: "11:00", endTime: "12:00", isAvailable: true, type: 'checkup' },
      ]
    },
    {
      day: "Thursday",
      working: false,
      slots: []
    },
    {
      day: "Friday",
      working: true,
      workingHours: { start: "08:00", end: "16:00" },
      slots: [
        { id: "8", startTime: "08:00", endTime: "09:00", isAvailable: true, type: 'consultation' },
        { id: "9", startTime: "13:00", endTime: "14:00", isAvailable: true, type: 'surgery' },
      ]
    },
    {
      day: "Saturday",
      working: true,
      workingHours: { start: "10:00", end: "14:00" },
      slots: [
        { id: "10", startTime: "10:00", endTime: "11:00", isAvailable: true, type: 'checkup' },
      ]
    },
    {
      day: "Sunday",
      working: false,
      slots: []
    }
  ]);

  const [newSlot, setNewSlot] = useState<Omit<TimeSlot, 'id'>>({
    startTime: "",
    endTime: "",
    isAvailable: true,
    type: 'consultation'
  });

  const [expandedDay, setExpandedDay] = useState<string | null>("Monday");
  const { toast } = useToast();

  const handleAddSlot = (day: string) => {
    if (!newSlot.startTime || !newSlot.endTime) {
      toast({
        title: "Error",
        description: "Please enter both start and end times",
        variant: "destructive",
      });
      return;
    }

    const updatedSchedules = schedules.map(schedule => {
      if (schedule.day === day) {
        return {
          ...schedule,
          slots: [...schedule.slots, { ...newSlot, id: Date.now().toString() }]
        };
      }
      return schedule;
    });
    setSchedules(updatedSchedules);
    setNewSlot({ startTime: "", endTime: "", isAvailable: true, type: 'consultation' });
    toast({
      title: "Slot Added",
      description: `New time slot added to ${day}'s schedule`,
    });
  };

  const handleRemoveSlot = (day: string, slotId: string) => {
    const updatedSchedules = schedules.map(schedule => {
      if (schedule.day === day) {
        return {
          ...schedule,
          slots: schedule.slots.filter(slot => slot.id !== slotId)
        };
      }
      return schedule;
    });
    setSchedules(updatedSchedules);
    toast({
      title: "Slot Removed",
      description: "Time slot has been removed",
    });
  };

  const handleToggleAvailability = (day: string, slotId: string) => {
    const updatedSchedules = schedules.map(schedule => {
      if (schedule.day === day) {
        return {
          ...schedule,
          slots: schedule.slots.map(slot => {
            if (slot.id === slotId) {
              return { ...slot, isAvailable: !slot.isAvailable };
            }
            return slot;
          })
        };
      }
      return schedule;
    });
    setSchedules(updatedSchedules);
  };

  const handleToggleWorkingDay = (day: string) => {
    const updatedSchedules = schedules.map(schedule => {
      if (schedule.day === day) {
        const working = !schedule.working;
        return {
          ...schedule,
          working,
          workingHours: working 
            ? schedule.workingHours || { start: "09:00", end: "17:00" }
            : undefined
        };
      }
      return schedule;
    });
    setSchedules(updatedSchedules);
  };

  const handleSaveSchedule = () => {
    toast({
      title: "Schedule Saved",
      description: "Your weekly schedule has been updated",
    });
  };

  const getSlotColor = (type: string | undefined) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 border-blue-200';
      case 'surgery': return 'bg-red-100 border-red-200';
      case 'checkup': return 'bg-green-100 border-green-200';
      default: return 'bg-blue-100 border-blue-500';
    }
  };

  const getSlotBadge = (type: string | undefined) => {
    switch (type) {
      case 'consultation': return <Badge variant="default">Consultation</Badge>;
      case 'surgery': return <Badge variant="destructive">Surgery</Badge>;
      case 'checkup': return <Badge variant="secondary">Checkup</Badge>;
      default: return <Badge variant="outline">General</Badge>;
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <DoctorSidebar activePath="/doctor/schedule" />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b h-20 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-2xl font-bold text-blue-600">Schedule Management</h1>
          <Button
            onClick={handleSaveSchedule}
            className="bg-blue-600 hover:bg-blue-600"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Schedule
          </Button>
        </header>

        <div className="p-6">
          <Card className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Weekly Schedule</h2>
              <p className="text-blue-600">
                Set your availability and time slots for each day of the week.
              </p>
            </div>

            <div className="space-y-4">
              {schedules.map((schedule) => (
                <Card key={schedule.day} className="overflow-hidden">
                  <div 
                    className={`p-4 flex justify-between items-center cursor-pointer ${schedule.working ? 'bg-blue-50' : 'bg-blue-50'}`}
                    onClick={() => setExpandedDay(expandedDay === schedule.day ? null : schedule.day)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${schedule.working ? 'bg-blue-600 text-blue-600' : 'bg-blue-500 text-blue-600'}`}>
                        {schedule.working ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-medium">{schedule.day}</h3>
                        {schedule.working && schedule.workingHours ? (
                          <p className="text-sm text-blue-600">
                            {schedule.workingHours.start} - {schedule.workingHours.end}
                          </p>
                        ) : (
                          <p className="text-sm text-blue-600">Not working</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleWorkingDay(schedule.day);
                        }}
                      >
                        {schedule.working ? 'Set Unavailable' : 'Set Available'}
                      </Button>
                      {expandedDay === schedule.day ? (
                        <ChevronUp className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>

                  {expandedDay === schedule.day && (
                    <div className="p-4 border-t">
                      {schedule.working ? (
                        <>
                          <div className="mb-6">
                            <h4 className="font-medium mb-3">Working Hours</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Start Time</Label>
                                <Input
                                  type="time"
                                  value={schedule.workingHours?.start || ''}
                                  onChange={(e) => {
                                    const updatedSchedules = schedules.map(s => {
                                      if (s.day === schedule.day && s.workingHours) {
                                        return {
                                          ...s,
                                          workingHours: {
                                            ...s.workingHours,
                                            start: e.target.value
                                          }
                                        };
                                      }
                                      return s;
                                    });
                                    setSchedules(updatedSchedules);
                                  }}
                                />
                              </div>
                              <div>
                                <Label>End Time</Label>
                                <Input
                                  type="time"
                                  value={schedule.workingHours?.end || ''}
                                  onChange={(e) => {
                                    const updatedSchedules = schedules.map(s => {
                                      if (s.day === schedule.day && s.workingHours) {
                                        return {
                                          ...s,
                                          workingHours: {
                                            ...s.workingHours,
                                            end: e.target.value
                                          }
                                        };
                                      }
                                      return s;
                                    });
                                    setSchedules(updatedSchedules);
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-medium mb-3">Time Slots</h4>
                            {schedule.slots.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {schedule.slots.map((slot) => (
                                  <Card 
                                    key={slot.id} 
                                    className={`p-4 ${getSlotColor(slot.type)} border`}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <div className="flex items-center gap-2 mb-2">
                                          <Watch className="h-4 w-4 text-blue-600" />
                                          <span className="font-medium">
                                            {slot.startTime} - {slot.endTime}
                                          </span>
                                        </div>
                                        {getSlotBadge(slot.type)}
                                      </div>
                                      <div className="flex gap-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleToggleAvailability(schedule.day, slot.id)}
                                          className={slot.isAvailable ? 'text-green-600' : 'text-red-600'}
                                        >
                                          {slot.isAvailable ? (
                                            <Check className="h-4 w-4" />
                                          ) : (
                                            <X className="h-4 w-4" />
                                          )}
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleRemoveSlot(schedule.day, slot.id)}
                                          className="text-red-600"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-6 text-blue-600">
                                No time slots added for this day
                              </div>
                            )}
                          </div>

                          <div className="border-t pt-6">
                            <h4 className="font-medium mb-3">Add New Time Slot</h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <Label>Start Time</Label>
                                <Input
                                  type="time"
                                  value={newSlot.startTime}
                                  onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>End Time</Label>
                                <Input
                                  type="time"
                                  value={newSlot.endTime}
                                  onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Slot Type</Label>
                                <Select
                                  value={newSlot.type}
                                  onValueChange={(value) => setNewSlot({ 
                                    ...newSlot, 
                                    type: value as 'consultation' | 'surgery' | 'checkup' 
                                  })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="consultation">Consultation</SelectItem>
                                    <SelectItem value="surgery">Surgery</SelectItem>
                                    <SelectItem value="checkup">Checkup</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-end">
                                <Button
                                  onClick={() => handleAddSlot(schedule.day)}
                                  className="w-full bg-blue-600 hover:bg-blue-600"
                                >
                                  <Plus className="h-5 w-5 mr-2" />
                                  Add Slot
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8 text-blue-600">
                          <Moon className="h-8 w-8 mx-auto mb-2" />
                          <p>You're not working on {schedule.day}</p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => handleToggleWorkingDay(schedule.day)}
                          >
                            Set as Working Day
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}