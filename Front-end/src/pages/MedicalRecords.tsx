import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { blueSidebar } from "@/components/blueSidebar";
import { FileText, Download, Eye, Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
type RecordType = 'consultation' | 'surgery' | 'report';

interface RecordBase {
  id: string;
  title: string;
  date: string;
  type: RecordType;
}

interface Consultation extends RecordBase {
  type: 'consultation';
  doctor: string;
  notes?: string;
}

interface Surgery extends RecordBase {
  type: 'surgery';
  description: string;
  surgeons: string[];
  outcome: string;
}

interface Report extends RecordBase {
  type: 'report';
  fileType: string;
  fileSize: string;
  previewUrl?: string;
  downloadUrl: string;
}

const MedicalRecords = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<RecordType[]>(['consultation', 'surgery', 'report']);
  const [activeTab, setActiveTab] = useState('all');

  const consultations: Consultation[] = [
    { 
      id: '1',
      title: "General Checkup", 
      date: "25 March, 2023", 
      doctor: "Dr. Xyz Sharma",
      notes: "Patient reported mild sensitivity in lower left molar. Recommended desensitizing toothpaste.",
      type: 'consultation'
    },
    { 
      id: '2',
      title: "Root Canal Evaluation", 
      date: "10 February, 2023", 
      doctor: "Dr. John Doe",
      notes: "Initial evaluation for possible root canal on tooth #19. X-rays taken.",
      type: 'consultation'
    }
  ];

  const surgeries: Surgery[] = [
    { 
      id: '3',
      title: "Wisdom Tooth Extraction", 
      date: "20 April, 2022", 
      description: "Surgical removal of impacted lower left wisdom tooth",
      surgeons: ["Dr. Smith", "Dr. Johnson"],
      outcome: "Successful procedure with normal healing expected",
      type: 'surgery'
    }
  ];
  
  const reports: Report[] = [
    { 
      id: '4',
      title: "X-ray Report", 
      date: "18 June, 2022", 
      fileType: "PDF", 
      fileSize: "2.4 MB",
      downloadUrl: "#",
      previewUrl: "#",
      type: 'report'
    },
    { 
      id: '5',
      title: "Blood Test Results", 
      date: "15 May, 2022", 
      fileType: "PDF", 
      fileSize: "1.2 MB",
      downloadUrl: "#",
      previewUrl: "#",
      type: 'report'
    },
    { 
      id: '6',
      title: "blue Panoramic", 
      date: "10 May, 2022", 
      fileType: "DICOM", 
      fileSize: "15.7 MB",
      downloadUrl: "#",
      type: 'report'
    }
  ];

  const allRecords = [...consultations, ...surgeries, ...reports];

  const filteredRecords = allRecords.filter(record => {
    // Filter by search query
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (record.type === 'consultation' && (record as Consultation).doctor.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by selected types
    const matchesType = selectedTypes.includes(record.type);
    
    // Filter by active tab
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'consultations' && record.type === 'consultation') ||
                      (activeTab === 'surgeries' && record.type === 'surgery') ||
                      (activeTab === 'reports' && record.type === 'report');
    
    return matchesSearch && matchesType && matchesTab;
  });

  const toggleRecordType = (type: RecordType) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const getTypeColor = (type: RecordType) => {
    switch(type) {
      case 'consultation': return 'bg-blue-100 text-blue-700';
      case 'surgery': return 'bg-red-100 text-red-700';
      case 'report': return 'bg-amber-100 text-amber-700';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">

      <blueSidebar activePath={location.pathname} />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b h-16 flex items-center px-6 sticky top-0 z-10">
          <div className="flex items-center">
            <span className="text-sm text-blue-600">Patient</span>
            <span className="mx-2 text-blue-600">/</span>
            <span className="font-medium text-blue-600">Medical Records</span>
          </div>
        </header>
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Medical Records</h1>
            <Button className="bg-blue-600 hover:bg-blue-600">
              Request New Record
            </Button>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
                <Input
                  placeholder="Search records..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filter
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.2 }}
                className="mt-4 p-4 bg-white rounded-lg shadow-sm border"
              >
                <h3 className="font-medium mb-3">Filter by record type</h3>
                <div className="flex flex-wrap gap-2">
                  {(['consultation', 'surgery', 'report'] as RecordType[]).map(type => (
                    <Badge
                      key={type}
                      variant={selectedTypes.includes(type) ? 'default' : 'outline'}
                      className={`cursor-pointer ${selectedTypes.includes(type) ? 'bg-blue-600 hover:bg-blue-600' : ''}`}
                      onClick={() => toggleRecordType(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          <Tabs 
            defaultValue="all" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid grid-cols-4 mb-6 bg-blue-100">
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
              <TabsTrigger value="surgeries">Surgeries</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {filteredRecords.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-blue-600">
                    No records found matching your criteria
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredRecords.map((record) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <RecordCard record={record} />
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="consultations">
              {filteredRecords.filter(r => r.type === 'consultation').length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-blue-600">
                    No consultation records found
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredRecords
                    .filter(r => r.type === 'consultation')
                    .map((record) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <RecordCard record={record} />
                      </motion.div>
                    ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="surgeries">
              {filteredRecords.filter(r => r.type === 'surgery').length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-blue-600">
                    No surgery records found
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredRecords
                    .filter(r => r.type === 'surgery')
                    .map((record) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <RecordCard record={record} />
                      </motion.div>
                    ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reports">
              {filteredRecords.filter(r => r.type === 'report').length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-blue-600">
                    No report records found
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredRecords
                    .filter(r => r.type === 'report')
                    .map((record) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <RecordCard record={record} />
                      </motion.div>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

const RecordCard = ({ record }: { record: Consultation | Surgery | Report }) => {
  const getTypeColor = (type: RecordType) => {
    switch(type) {
      case 'consultation': return 'bg-blue-100 text-blue-700';
      case 'surgery': return 'bg-red-100 text-red-700';
      case 'report': return 'bg-amber-100 text-amber-700';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className={`h-10 w-10 rounded-full ${getTypeColor(record.type)} flex items-center justify-center mt-1 flex-shrink-0`}>
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium text-blue-600">{record.title}</h3>
                  <Badge variant="outline" className={getTypeColor(record.type)}>
                    {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-blue-600 mt-1">{record.date}</p>
                
                {record.type === 'consultation' && (
                  <p className="text-smtext-blue-600 mt-2">
                    With {(record as Consultation).doctor}
                  </p>
                )}
                
                {record.type === 'surgery' && (
                  <p className="text-smtext-blue-600 mt-2">
                    {(record as Surgery).description}
                  </p>
                )}
                
                {record.type === 'report' && (
                  <p className="text-smtext-blue-600 mt-2">
                    {(record as Report).fileType} • {(record as Report).fileSize}
                  </p>
                )}
              </div>
            </div>
            
            {record.type === 'consultation' && (record as Consultation).notes && (
              <div className="mt-3 pl-14">
                <p className="text-smtext-blue-600 bg-blue-50 p-3 rounded">
                  {(record as Consultation).notes}
                </p>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 sm:flex-col sm:gap-1 sm:items-end">
            {record.type === 'report' && (
              <>
                {(record as Report).previewUrl && (
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                )}
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </>
            )}
            {record.type !== 'report' && (
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                View Details
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecords;