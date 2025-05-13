
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HistoryItemProps {
  title: string;
  date: string;
  description: string;
  type: "consultation" | "surgery" | "report";
}

const HistoryItem = ({ title, date, description, type }: HistoryItemProps) => {
  const bgColor = {
    consultation: "bg-blue-50",
    surgery: "bg-red-50",
    report: "bg-yellow-50"
  };

  return (
    <Card className={`${bgColor[type]} border-0 shadow-sm mb-4`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{title}</h3>
          <span className="text-sm text-blue-600">{date}</span>
        </div>
        <p className="text-smtext-blue-600">{description}</p>
        
        {type === "report" && (
          <div className="mt-4">
            <div className="flex space-x-2 mb-2">
              <div className="w-8 h-10 bg-red-100 rounded flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-700">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div className="w-8 h-10 bg-blue-100 rounded flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-blue-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
              <span>2 attachments:</span>
              <button className="ml-4 flex items-center text-blue-600 hover:text-blue-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download all files
              </button>
              <button className="ml-4 flex items-center text-blue-600 hover:text-blue-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View all files
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export function MedicalHistory() {
  const historyItems: HistoryItemProps[] = [
    {
      title: "Consultation",
      date: "25 March, 2023",
      description: "Consultation with Dr. XYZ",
      type: "consultation"
    },
    {
      title: "Surgery",
      date: "20 April, 2022",
      description: "Retinal detachment surgery operated by Dr. XYZ and Dr. ABC",
      type: "surgery"
    },
    {
      title: "Reports",
      date: "18 June, 2022",
      description: "X ray reports",
      type: "report"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Medical history</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {historyItems.map((item, index) => (
            <HistoryItem key={index} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
