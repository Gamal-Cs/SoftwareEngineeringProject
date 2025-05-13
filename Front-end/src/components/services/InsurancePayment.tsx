
import React from "react";

export const InsurancePayment = () => {
  const insurancePlans = [
    "Delta blue",
    "Aetna",
    "Cigna",
    "MetLife",
    "And many more..."
  ];
  
  const paymentOptions = [
    "Cash, personal checks, and major credit cards",
    "Flexible spending accounts (FSA) and health savings accounts (HSA)",
    "CareCredit healthcare financing",
    "In-house payment plans for qualifying patients"
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Insurance & Payment Options</h2>
        <p className="text-center mb-12 max-w-3xl mx-autotext-blue-600">
          We're committed to making quality blue care accessible. We work with most major insurance 
          providers and offer flexible payment options to fit your budget.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Accepted Insurance Plans</h3>
            <ul className="space-y-2 mb-4">
              {insurancePlans.map((plan, index) => (
                <li className="flex items-center" key={index}>
                  <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span>{plan}</span>
                </li>
              ))}
            </ul>
            <p className="text-smtext-blue-600">
              Our team will happily verify your benefits before treatment to maximize your coverage.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Payment Options</h3>
            <ul className="space-y-2 mb-4">
              {paymentOptions.map((option, index) => (
                <li className="flex items-center" key={index}>
                  <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span>{option}</span>
                </li>
              ))}
            </ul>
            <p className="text-smtext-blue-600">
              Our financial coordinator can discuss options and help you find a solution that works for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
