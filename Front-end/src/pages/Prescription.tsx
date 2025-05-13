import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PatientSidebar } from "@/components/PatientSidebar";
import { FileText, Download, Printer, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";


type Medication = {
  id: string;
  name: string;
  dosage: string;
  duration: string;
  status: 'active' | 'completed' | 'cancelled';
  instructions?: string;
};

type Prescription = {
  id: string;
  date: string;
  doctor: string;
  doctorAvatar?: string;
  status: 'active' | 'expired' | 'completed';
  medications: Medication[];
  instructions?: string;
  refills?: number;
};

const PrescriptionPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'completed'>('all');

  const prescriptions: Prescription[] = [
    {
      id: '1',
      date: "April 15, 2023",
      doctor: "Dr. Xyz Sharma",
      doctorAvatar: "/doctor-avatar-1.jpg",
      status: 'active',
      refills: 2,
      medications: [
        { 
          id: '1-1',
          name: "Amoxicillin", 
          dosage: "700mg - 1 - 0 - 1", 
          duration: "7 days",
          status: 'active',
          instructions: "Take with food"
        },
        { 
          id: '1-2',
          name: "Ibuprofen", 
          dosage: "200mg - 0 - 0 - 1", 
          duration: "14 days",
          status: 'active',
          instructions: "As needed for pain"
        }
      ],
      instructions: "Finish all medications as prescribed. Contact if side effects occur."
    },
    {
      id: '2',
      date: "March 10, 2023",
      doctor: "Dr. John Doe",
      doctorAvatar: "/doctor-avatar-2.jpg",
      status: 'completed',
      medications: [
        { 
          id: '2-1',
          name: "Fluoride Supplement", 
          dosage: "0.25mg - 1 - 1 - 1", 
          duration: "30 days",
          status: 'completed'
        }
      ]
    },
    {
      id: '3',
      date: "February 5, 2023",
      doctor: "Dr. Sarah Johnson",
      doctorAvatar: "/doctor-avatar-3.jpg",
      status: 'expired',
      medications: [
        { 
          id: '3-1',
          name: "Chlorhexidine Mouthwash", 
          dosage: "15ml - 2 times daily", 
          duration: "14 days",
          status: 'completed'
        }
      ]
    }
  ];

  const filteredPrescriptions = prescriptions.filter(prescription => {
    // Filter by search query
    const matchesSearch = prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         prescription.medications.some(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by status
    const matchesStatus = filterStatus === 'all' || prescription.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'expired': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const handlePrintPrescription = (id: string) => {
    console.log(`Printing prescription ${id}`);
    // In a real app, this would open print dialog with prescription data
  };

  const handleDownloadPrescription = (id: string) => {
    console.log(`Downloading prescription ${id}`);
    // In a real app, this would download a PDF of the prescription
  };

  return (
    <div className="flex min-h-screen bg-blue-50">

      <PatientSidebar />
      
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Your Prescriptions</h1>
            <p className="text-blue-600">View and manage your current and past prescriptions</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-600 gap-2">
            <Plus className="h-4 w-4" />
            Request Refill
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
              <Input
                placeholder="Search prescriptions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export All
              </Button>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              className="mt-4 p-4 bg-white rounded-lg shadow-sm border"
            >
              <h3 className="font-medium mb-3">Filter by status</h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'active', 'expired', 'completed'].map(status => (
                  <Badge
                    key={status}
                    variant={filterStatus === status ? 'default' : 'outline'}
                    className={`cursor-pointer ${filterStatus === status ? 'bg-blue-600 hover:bg-blue-600' : ''}`}
                    onClick={() => setFilterStatus(status as 'all' | 'active' | 'expired' | 'completed')}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Prescriptions List */}
        <div className="space-y-6">
          {filteredPrescriptions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-blue-600">
                No prescriptions found matching your criteria
              </CardContent>
            </Card>
          ) : (
            filteredPrescriptions.map((prescription) => (
              <motion.div
                key={prescription.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="bg-blue-50 p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            Prescription - {prescription.date}
                            <Badge className={getStatusColor(prescription.status)}>
                              {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                            </Badge>
                            {prescription.refills && (
                              <Badge variant="outline" className="border-blue-600 text-blue-600">
                                {prescription.refills} refill{prescription.refills > 1 ? 's' : ''} remaining
                              </Badge>
                            )}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={prescription.doctorAvatar} />
                              <AvatarFallback>{prescription.doctor.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-blue-600">Prescribed by: {prescription.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 hover:bg-blue-600 gap-1"
                          onClick={() => handlePrintPrescription(prescription.id)}
                        >
                          <Printer className="h-4 w-4" />
                          Print
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 hover:bg-blue-600 gap-1"
                          onClick={() => handleDownloadPrescription(prescription.id)}
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-blue-50">
                        <TableRow>
                          <TableHead className="w-[200px]">Medication</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prescription.medications.map((medication) => (
                          <TableRow key={medication.id} className="border-b">
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-full">
                                  <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                  </svg>
                                </div>
                                {medication.name}
                              </div>
                            </TableCell>
                            <TableCell>{medication.dosage}</TableCell>
                            <TableCell>{medication.duration}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(medication.status)}>
                                {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="link" size="sm" className="text-blue-600 h-8">
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {prescription.instructions && (
                      <div className="p-4 bg-blue-50 border-t">
                        <h4 className="font-medium text-sm mb-2">Special Instructions:</h4>
                        <p className="text-sm text-blue-600">{prescription.instructions}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPage;