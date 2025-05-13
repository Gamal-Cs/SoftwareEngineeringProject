
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ServicesCTA = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Schedule Your Visit?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contact us today to book an appointment with our experienced blue team.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
            <Link to="/book-appointment">Book Online</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
