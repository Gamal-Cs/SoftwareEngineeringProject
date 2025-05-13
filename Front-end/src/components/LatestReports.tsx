
import React from "react";
import { FileText, Download, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Report {
  title: string;
  icon?: React.ReactNode;
}

interface LatestReportsProps {
  reports: Report[];
}

export function LatestReports({ reports }: LatestReportsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Latest reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report, index) => (
            <div key={index} className="border rounded-lg p-3 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded bg-blue-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium">{report.title}</span>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-blue-700 hover:text-blue-600">
                  <Download className="h-5 w-5" />
                </button>
                <button className="p-1 text-blue-700 hover:text-blue-600">
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
