import React from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Download,
  Receipt,
  CreditCard,
  Calendar,
  CheckCircle2,
  XCircle
} from "lucide-react";

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: "completed" | "failed" | "pending";
  description: string;
  paymentMethod: {
    type: "credit" | "debit";
    last4: string;
  };
}

const mockPayments: Payment[] = [
  {
    id: "PAY-001",
    date: "2024-03-15",
    amount: 150.00,
    status: "completed",
    description: "blue Cleaning",
    paymentMethod: {
      type: "credit",
      last4: "4242"
    }
  },
  {
    id: "PAY-002",
    date: "2024-03-10",
    amount: 75.00,
    status: "completed",
    description: "X-Ray",
    paymentMethod: {
      type: "debit",
      last4: "5678"
    }
  },
  {
    id: "PAY-003",
    date: "2024-03-05",
    amount: 200.00,
    status: "failed",
    description: "Cavity Filling",
    paymentMethod: {
      type: "credit",
      last4: "4242"
    }
  },
  {
    id: "PAY-004",
    date: "2024-03-01",
    amount: 50.00,
    status: "pending",
    description: "Consultation",
    paymentMethod: {
      type: "credit",
      last4: "4242"
    }
  }
];

export default function PaymentHistoryPage() {
  const getStatusColor = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-blue-600";
    }
  };

  const getStatusIcon = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "pending":
        return <Calendar className="h-5 w-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <SectionTitle
        title="Payment History"
        subtitle="View and manage your payment records"
      />

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-blue-600">Recent Payments</h2>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export History
              </Button>
            </div>

            <div className="space-y-4">
              {mockPayments.map((payment, index) => (
                <Card key={payment.id} index={index}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-blue-600">
                            {payment.paymentMethod.type === "credit" ? "Credit Card" : "Debit Card"} ending in {payment.paymentMethod.last4}
                          </p>
                          <p className="text-sm text-blue-600">
                            {new Date(payment.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`flex items-center ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          <span className="ml-2 capitalize">{payment.status}</span>
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-600"
                        >
                          <Receipt className="h-4 w-4 mr-2" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-blue-600">{payment.description}</p>
                        <p className="text-sm text-blue-600">Transaction ID: {payment.id}</p>
                      </div>
                      <p className="text-xl font-semibold text-blue-600">
                        ${payment.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Load More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 