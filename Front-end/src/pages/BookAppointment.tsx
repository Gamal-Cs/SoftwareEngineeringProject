import React, { useState } from "react";
import { blueSidebar } from "@/components/blueSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  CalendarIcon, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Droplet,
  Stethoscope,
  Clock,
  FileText,
  ChevronDown,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { appointmentService } from '@/services/appointmentService';

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().min(10, { message: "Phone number must be at least 10 digits." }).max(15),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  age: z.number().min(0).max(120),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
    required_error: "Please select your gender.",
  }),
  bloodGroup: z.string().optional(),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  doctor: z.string().min(1, { message: "Please select a doctor." }),
  appointmentFor: z.string().min(1, { message: "Please specify what the appointment is for." }),
  appointmentDate: z.date({ required_error: "Appointment date is required." }),
  timeSlot: z.string().min(1, { message: "Please select a time slot." }),
  patientType: z.enum(["new", "existing"], { required_error: "Please select patient type." }),
  note: z.string().optional(),
  files: z.any().optional(),
});

const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "General Dentistry",
    image: "/doctors/dr-sarah.jpg",
    availableDays: ["Monday", "Wednesday", "Friday"]
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Orthodontics",
    image: "/doctors/dr-michael.jpg",
    availableDays: ["Tuesday", "Thursday"]
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatric Dentistry",
    image: "/doctors/dr-emily.jpg",
    availableDays: ["Monday", "Wednesday", "Saturday"]
  }
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function BookAppointment() {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      bloodGroup: "",
      address: "",
      doctor: "",
      appointmentFor: "",
      note: "",
      patientType: "new",
      age: 0,
    },
  });

  const selectedDoctorData = doctors.find(doc => doc.name === form.watch("doctor"));
  const appointmentDate = form.watch("appointmentDate");

  // Generate time slots based on selected doctor and date
  const generateTimeSlots = () => {
    if (!selectedDoctorData || !appointmentDate) return [];
    
    const day = format(appointmentDate, "EEEE");
    if (!selectedDoctorData.availableDays.includes(day)) return [];
    
    // Generate time slots from 9 AM to 5 PM with 30-minute intervals
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 17 && minute === 30) break; // Skip 5:30 PM
        const time = `${hour % 12 === 0 ? 12 : hour % 12}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Get user and doctor info
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const doctor = doctors.find(doc => doc.name === values.doctor);
      const date = values.appointmentDate; // Date object
      const [hour, minute, period] = values.timeSlot.split(/[: ]/);
      let h = parseInt(hour, 10);
      if (period === 'PM' && h !== 12) h += 12;
      if (period === 'AM' && h === 12) h = 0;
      const startTime = new Date(date);
      startTime.setHours(h, parseInt(minute, 10), 0, 0);
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + 30);
      await appointmentService.createAppointment({
        patientId: user.id,
        doctorId: doctor ? parseInt(doctor.id) : 1,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        appointmentDate: startTime.toISOString(),
        status: 'SCHEDULED',
      });
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment with ${values.doctor} on ${format(values.appointmentDate, "PPP")} at ${values.timeSlot} has been confirmed.`,
      });
      form.reset();
      setSelectedFiles([]);
      setSelectedTimeSlot(null);
      setSelectedDoctor(null);
      navigate("/appointments");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-blue-50">
      <blueSidebar activePath="/book-appointment" />
      
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Book an Appointment</h1>
              <p className="text-blue-600 mt-2">
                Fill out the form below to schedule your blue appointment
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/appointments")}
              className="hidden md:flex"
            >
              View My Appointments
            </Button>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information Section */}
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold">Personal Information</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input placeholder="First name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile number</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1700-01-01")
                                }
                                initialFocus
                                captionLayout="dropdown-buttons"
                                fromYear={1700}
                                toYear={new Date().getFullYear()}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Age" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male">Male</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female">Female</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="other" id="other" />
                                <Label htmlFor="other">Other</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                                <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bloodGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood group</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select blood group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {bloodGroups.map(group => (
                                <SelectItem key={group} value={group}>
                                  <div className="flex items-center gap-2">
                                    <Droplet className="h-4 w-4" />
                                    {group}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="patientType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Patient type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="new" id="new" />
                                <Label htmlFor="new">New Patient</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="existing" id="existing" />
                                <Label htmlFor="existing">Existing Patient</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your full address" 
                            className="resize-none" 
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              {/* Appointment Details Section */}
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold">Appointment Details</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="doctor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Doctor</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedDoctor(value);
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a doctor" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {doctors.map((doctor) => (
                                <SelectItem key={doctor.id} value={doctor.name}>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={doctor.image} />
                                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p>{doctor.name}</p>
                                      <p className="text-xs text-blue-600">{doctor.specialty}</p>
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="appointmentFor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Appointment reason</FormLabel>
                          <FormControl>
                            <Input placeholder="Reason for appointment" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="appointmentDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Appointment date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                  disabled={!selectedDoctor}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => {
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);
                                  return date < today || 
                                    (selectedDoctorData && !selectedDoctorData.availableDays.includes(format(date, "EEEE")));
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {selectedDoctorData && (
                            <FormDescription>
                              {selectedDoctorData.name} is available on: {selectedDoctorData.availableDays.join(', ')}
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timeSlot"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time slot</FormLabel>
                          <div className="grid grid-cols-2 gap-2">
                            {generateTimeSlots().map((time) => (
                              <Button
                                key={time}
                                type="button"
                                variant={field.value === time ? "default" : "outline"}
                                className={cn(
                                  "text-sm",
                                  field.value === time && "bg-blue-600 hover:bg-blue-600"
                                )}
                                onClick={() => {
                                  setSelectedTimeSlot(time);
                                  field.onChange(time);
                                }}
                                disabled={!appointmentDate}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                          {!appointmentDate && (
                            <FormDescription>
                              Please select a date first
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>Additional notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any additional information or special requests" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="mt-6">
                    <FormLabel>Upload files (optional)</FormLabel>
                    <FormDescription>
                      You can upload any relevant medical reports or documents
                    </FormDescription>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload"
                        className="border-2 border-dashed border-blue-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-600 transition-colors"
                      >
                        <Upload className="h-10 w-10 text-blue-600 mb-3" />
                        <p className="text-sm font-mediumtext-blue-600 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-blue-600">
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </label>
                      
                      {selectedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-600" />
                                <div>
                                  <p className="text-sm font-medium">{file.name}</p>
                                  <p className="text-xs text-blue-600">
                                    {(file.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFile(index)}
                                className="text-red-700 hover:text-red-700"
                              >
                                <XCircle className="h-5 w-5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}