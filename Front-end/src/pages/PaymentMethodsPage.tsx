import React, { useState } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Star,
  Calendar,
  AlertCircle
} from "lucide-react";

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

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <PageLayout>
      <SectionTitle
        title="Payment Methods"
        subtitle="Manage your payment methods securely"
      />

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-blue-600">Saved Payment Methods</h2>
              <Button
                onClick={() => setIsAddingNew(true)}
                className="bg-blue-600 hover:bg-blue-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Card
              </Button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <Card key={method.id}>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium">
                            {method.type === "credit" ? "Credit Card" : "Debit Card"} ending in {method.last4}
                          </p>
                          <p className="text-sm text-blue-600">
                            Expires {method.expiry}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {method.isDefault ? (
                          <span className="flex items-center text-sm text-blue-600">
                            <Star className="h-4 w-4 mr-1 fill-current" />
                            Default
                          </span>
                        ) : (
                          <Button
                            variant="ghost"
                            onClick={() => handleSetDefault(method.id)}
                            className="text-blue-600 hover:text-blue-600"
                          >
                            Set as Default
                          </Button>
                        )}
                        {showDeleteConfirm === method.id ? (
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(method.id)}
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowDeleteConfirm(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDeleteConfirm(method.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {isAddingNew && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <Card>
                  <form className="space-y-6 p-6">
                    <div>
                      <Label>Card Number</Label>
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Expiry Date</Label>
                        <Input
                          type="text"
                          placeholder="MM/YY"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label>CVV</Label>
                        <Input
                          type="text"
                          placeholder="123"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Cardholder Name</Label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="flex items-center text-sm text-blue-600">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Your card information is secure and encrypted
                    </div>
                    <div className="flex justify-end space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddingNew(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-600 text-white"
                      >
                        Add Card
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 