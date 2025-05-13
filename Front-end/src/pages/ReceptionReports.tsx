import React, { useState } from "react";
import { ReceptionSidebar } from "@/components/ReceptionSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Plus } from "lucide-react";

interface Report {
  id: string;
  title: string;
  date: string;
  type: string;
  status: string;
}

const sampleReports: Report[] = [
  { id: "1", title: "Daily Summary", date: "2024-04-10", type: "Summary", status: "Generated" },
  { id: "2", title: "Patient List", date: "2024-04-10", type: "List", status: "Generated" },
  { id: "3", title: "Appointment Log", date: "2024-04-10", type: "Log", status: "Pending" }
];

export default function ReceptionReports() {
  const [search, setSearch] = useState("");

  const filterReports = (list: Report[]) =>
    list.filter(r =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="flex min-h-screen bg-blue-50">
      <ReceptionSidebar activePath="/reception/reports" />
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Reports</h1>
          <Button className="bg-blue-600 hover:bg-blue-600 gap-2">
            <Plus className="h-4 w-4" />
            New Report
          </Button>
        </div>
        <div className="mb-6">
          <Input
            placeholder="Search by title or type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterReports(sampleReports).length > 0 ? (
            filterReports(sampleReports).map(report => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-700" />
                      <span className="font-medium">{report.title}</span>
                    </div>
                    <Badge className={report.status === 'Generated' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {report.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-600 mb-1">
                    <Calendar className="h-4 w-4" />
                    {report.date}
                  </div>
                  <div className="text-sm text-blue-600">Type: {report.type}</div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-mediumtext-blue-600">No reports found</h3>
              <p className="text-blue-600">Reports will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 