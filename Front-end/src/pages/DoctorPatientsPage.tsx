import React, { useState } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  Plus,
  Filter,
  X,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  MoreVertical
} from "lucide-react";
import { DoctorSidebar } from "@/components/DoctorSidebar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment: string;
  medicalHistory: string[];
  status: 'active' | 'inactive';
  notes?: string;
  age: number;
  gender: string;
  address: string;
  image?: string;
}

function PatientModal({ patient, onClose, onSave }: { patient: Patient | null, onClose: () => void, onSave: (patient: Patient) => void }) {
  const [formData, setFormData] = useState<Patient>(patient || {
    id: "",
    name: "",
    email: "",
    phone: "",
    lastVisit: "",
    nextAppointment: "",
    medicalHistory: [],
    status: 'active',
    age: 0,
    gender: "",
    address: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {patient ? "Edit Patient" : "Add New Patient"}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Age</Label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label>Gender</Label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Last Visit</Label>
              <Input
                type="date"
                value={formData.lastVisit}
                onChange={(e) => setFormData({ ...formData, lastVisit: e.target.value })}
              />
            </div>

            <div>
              <Label>Next Appointment</Label>
              <Input
                type="date"
                value={formData.nextAppointment}
                onChange={(e) => setFormData({ ...formData, nextAppointment: e.target.value })}
              />
            </div>

            <div>
              <Label>Notes</Label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-2 border rounded-md"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-600">
                Save Patient
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      lastVisit: "2024-02-15",
      nextAppointment: "2024-03-20",
      medicalHistory: ["Regular checkup", "Cavity filling"],
      status: 'active',
      age: 35,
      gender: "Male",
      address: "123 Main St, City, State",
      image: "/patient1.jpg"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 234-5678",
      lastVisit: "2024-02-10",
      nextAppointment: "2024-03-15",
      medicalHistory: ["Teeth cleaning", "X-ray"],
      status: 'active',
      age: 28,
      gender: "Female",
      address: "456 Oak Ave, City, State",
      image: "/patient2.jpg"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Patient; direction: 'asc' | 'desc' }>({ 
    key: 'name', 
    direction: 'asc' 
  });
  const { toast } = useToast();

  const filteredPatients = patients
    .filter(patient =>
      (filterStatus === 'all' || patient.status === filterStatus) &&
      (patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
       patient.phone.includes(searchQuery))
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const requestSort = (key: keyof Patient) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSavePatient = (patient: Patient) => {
    if (patient.id) {
      setPatients(patients.map(p => p.id === patient.id ? patient : p));
      toast({
        title: "Patient Updated",
        description: `${patient.name}'s record has been updated`,
      });
    } else {
      const newPatient = { ...patient, id: Date.now().toString() };
      setPatients([...patients, newPatient]);
      toast({
        title: "Patient Added",
        description: `${newPatient.name} has been added to your patients`,
      });
    }
    setShowModal(false);
    setSelectedPatient(null);
  };

  const handleDeletePatient = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient && window.confirm(`Are you sure you want to delete ${patient.name}?`)) {
      setPatients(patients.filter(p => p.id !== patientId));
      toast({
        title: "Patient Deleted",
        description: `${patient.name} has been removed from your patients`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <DoctorSidebar activePath="/doctor/patients" />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b h-20 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-2xl font-bold text-blue-600">Patient Management</h1>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => {
                setSelectedPatient(null);
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-600"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Patient
            </Button>
          </div>
        </header>

        <div className="p-6">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                <Input
                  placeholder="Search patients..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-5 w-5" />
                      <span>Filter: {filterStatus === 'all' ? 'All' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                      All Patients
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>
                      Inactive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <span>Sort: {sortConfig.key.charAt(0).toUpperCase() + sortConfig.key.slice(1)} ({sortConfig.direction.toUpperCase()})</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => requestSort('name')}>
                      Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => requestSort('lastVisit')}>
                      Last Visit {sortConfig.key === 'lastVisit' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => requestSort('nextAppointment')}>
                      Next Appointment {sortConfig.key === 'nextAppointment' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="relative">
                        <div className="h-32 bg-blue-600"></div>
                        <div className="absolute -bottom-12 left-4">
                          <Avatar className="h-24 w-24 border-4 border-white">
                            <AvatarImage src={patient.image} />
                            <AvatarFallback>
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      
                      <div className="pt-16 px-4 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold">{patient.name}</h3>
                            <p className="text-sm text-blue-600">{patient.age} years • {patient.gender}</p>
                          </div>
                          <Badge variant={patient.status === 'active' ? 'default' : 'destructive'} className={patient.status === 'active' ? 'bg-green-100 text-green-700' : ''}>
                            {patient.status}
                          </Badge>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-blue-600 gap-2">
                            <Mail className="h-4 w-4" />
                            <span className="truncate">{patient.email}</span>
                          </div>
                          <div className="flex items-center text-sm text-blue-600 gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{patient.phone}</span>
                          </div>
                          <div className="flex items-center text-sm text-blue-600 gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Last Visit: {patient.lastVisit || 'N/A'}</span>
                          </div>
                          <div className="flex items-center text-sm text-blue-600 gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Next: {patient.nextAppointment || 'N/A'}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedPatient(patient);
                              setShowModal(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="text-blue-600">
                                <FileText className="h-4 w-4 mr-2" />
                                View Records
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeletePatient(patient.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 flex flex-col items-center justify-center py-12">
                  <User className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-lg font-mediumtext-blue-600 mb-2">
                    No patients found
                  </h3>
                  <p className="text-blue-600 mb-4">
                    {searchQuery ? "Try adjusting your search query" : "Add your first patient"}
                  </p>
                  <Button 
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-600"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Patient
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        <AnimatePresence>
          {showModal && (
            <PatientModal
              patient={selectedPatient}
              onClose={() => {
                setShowModal(false);
                setSelectedPatient(null);
              }}
              onSave={handleSavePatient}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}