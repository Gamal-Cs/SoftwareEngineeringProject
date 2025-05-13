
import React from "react";
import { PrescriptionBottle } from "@/components/icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Medication {
  name: string;
  dosage: string;
  icon?: React.ReactNode;
}

interface MedicationsListProps {
  medications: Medication[];
}

export function MedicationsList({ medications }: MedicationsListProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Recent medications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((medication, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {medication.icon || (
                  <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center">
                    <PrescriptionBottle className="h-5 w-5 text-blue-600" />
                  </div>
                )}
                <span className="font-medium">{medication.name}</span>
              </div>
              <div className="text-sm text-blue-600">{medication.dosage}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
