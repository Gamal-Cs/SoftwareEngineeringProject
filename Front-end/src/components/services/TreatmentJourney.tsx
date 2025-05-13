
import React from "react";

export const TreatmentJourney = () => {
  const steps = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "Meet with our team for a comprehensive examination and personalized treatment plan."
    },
    {
      step: 2,
      title: "Treatment Discussion",
      description: "Review options, ask questions, and finalize your personalized treatment approach."
    },
    {
      step: 3,
      title: "Expert Care",
      description: "Receive high-quality treatment in a comfortable, state-of-the-art environment."
    },
    {
      step: 4,
      title: "Follow-Up & Maintenance",
      description: "Ensure optimal results with tailored aftercare and regular maintenance visits."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Your Treatment Journey</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div className="text-center" key={step.step}>
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">{step.step}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">{step.title}</h3>
              <p className="text-blue-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
