import React, { useState } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { CreditCard, Calendar, Lock, CheckCircle2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "credit" | "debit";
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "credit",
    last4: "4242",
    expiry: "12/25",
    isDefault: true
  },
  {
    id: "2",
    type: "debit",
    last4: "5678",
    expiry: "09/24",
    isDefault: false
  }
];

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>(mockPaymentMethods[0].id);
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle2 className="h-16 w-16 text-green-700 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Payment Successful!</h2>
              <p className="text-blue-600 mb-6">
                Your payment has been processed successfully. A receipt has been sent to your email.
              </p>
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-600 text-white"
              >
                <a href="/dashboard">Return to Dashboard</a>
              </Button>
            </motion.div>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SectionTitle
        title="Make a Payment"
        subtitle="Secure and easy payment processing"
      />

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Payment Amount</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">$</span>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8"
                      placeholder="0.00"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <Label>Select Payment Method</Label>
                  <div className="space-y-3 mt-2">
                    {mockPaymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedMethod === method.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-blue-500 hover:border-blue-600"
                        }`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedMethod === method.id}
                          onChange={() => setSelectedMethod(method.id)}
                          className="mr-3"
                        />
                        <div className="flex items-center flex-grow">
                          <CreditCard className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <p className="font-medium">
                              {method.type === "credit" ? "Credit Card" : "Debit Card"} ending in {method.last4}
                            </p>
                            <p className="text-sm text-blue-600">
                              Expires {method.expiry}
                              {method.isDefault && " • Default"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-sm text-blue-600">
                  <Lock className="h-4 w-4 mr-2" />
                  Your payment information is secure and encrypted
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-600 text-white"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 