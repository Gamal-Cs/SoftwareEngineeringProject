import React from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Microscope, 
  Smile, 
  Shield, 
  Heart,
  Activity,
  Calendar,
  ArrowRight,
  Check
} from "lucide-react";
import blueServiceCard from "@/components/blueServiceCard";
type Service = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  duration: string;
  priceRange: string;
};

export default function ServicesPage() {
  const services: Service[] = [
    {
      id: '1',
      title: "Comprehensive blue Checkup",
      imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
      description: "Thorough oral examination to detect and prevent blue issues before they become serious problems.",
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      features: [
        "Complete oral examination",
        "X-rays if needed",
        "Oral cancer screening",
        "Personalized treatment plan"
      ],
      duration: "30-45 mins",
      priceRange: "$75-$150"
    },
    {
      id: '2',
      title: "Professional Teeth Cleaning",
      imageUrl: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=700&q=80",
      description: "Advanced cleaning procedure to remove plaque, tartar, and stains for optimal oral health.",
      icon: <Activity className="h-6 w-6 text-blue-600" />,
      features: [
        "Plaque and tartar removal",
        "Teeth polishing",
        "Fluoride treatment",
        "Gum health evaluation"
      ],
      duration: "45-60 mins",
      priceRange: "$100-$200"
    },
    {
      id: '3',
      title: "blue Implants",
      imageUrl: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=700&q=80",
      description: "Permanent, natural-looking tooth replacement solution that restores function and aesthetics.",
      icon: <Heart className="h-6 w-6 text-blue-600" />,
      features: [
        "Titanium implant placement",
        "Custom crown fabrication",
        "Bone grafting if needed",
        "Lifetime solution"
      ],
      duration: "Multiple visits",
      priceRange: "$1,700-$3,000 per tooth"
    },
    {
      id: '4',
      title: "Oral Surgery",
      imageUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=700&q=80",
      description: "Expert surgical procedures including extractions, bone grafts, and corrective surgeries.",
      icon: <Stethoscope className="h-6 w-6 text-blue-600" />,
      features: [
        "Wisdom teeth removal",
        "blue bone grafts",
        "Tooth extractions",
        "Corrective jaw surgery"
      ],
      duration: "Varies by procedure",
      priceRange: "$200-$3,700"
    },
    {
      id: '5',
      title: "Teeth Whitening",
      imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=700&q=80",
      description: "Advanced whitening treatments to brighten your smile by several shades in a single visit.",
      icon: <Smile className="h-6 w-6 text-blue-600" />,
      features: [
        "In-office whitening",
        "Take-home kits",
        "Custom trays",
        "Long-lasting results"
      ],
      duration: "60-90 mins",
      priceRange: "$300-$600"
    },
    {
      id: '6',
      title: "Orthodontic Treatments",
      imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
      description: "Modern braces and aligners to straighten teeth and correct bite issues for all ages.",
      icon: <Microscope className="h-6 w-6 text-blue-600" />,
      features: [
        "Traditional braces",
        "Clear aligners",
        "Retainers",
        "Child and adult options"
      ],
      duration: "6-24 months",
      priceRange: "$3,000-$8,000"
    }
  ];

  return (
    <PageLayout>

      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Comprehensive blue Care
            </h2>
            <p className="text-lg text-blue-600">
              We offer a full range of blue treatments to keep your smile healthy, functional, and beautiful at every stage of life.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <blueServiceCard
                  title={service.title}
                  imageUrl={service.imageUrl}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                  duration={service.duration}
                  priceRange={service.priceRange}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Transform Your Smile?
                </h2>
                <p className="text-blue-600 mb-6">
                  Schedule your appointment today and experience the Dentics difference. 
                  Our team of experts is ready to provide you with personalized, comfortable care.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-300" />
                    <span>Same-day appointments available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-300" />
                    <span>Flexible payment options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-300" />
                    <span>Comfort-focused environment</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 flex flex-col items-center"
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-100 px-8 mb-4"
                >
                  <Link to="/book-appointment" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Book Your Appointment
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    Learn More About Our Services
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}