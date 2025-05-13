import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import blueServiceCard from "@/components/blueServiceCard";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Stethoscope,
  Calendar,
  Users,
  Clock,
  Shield,
  Award,
  Heart
} from "lucide-react";

const services = [
  {
    title: "blue Checkup",
    imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=700&q=80",
    description: "Comprehensive oral exams to detect and prevent blue issues early.",
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    features: ["Complete oral examination", "X-rays if needed", "Oral cancer screening", "Personalized treatment plan"],
    duration: "30-45 mins",
    priceRange: "$75-$150"
  },
  {
    title: "Teeth Cleaning",
    imageUrl: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=700&q=80",
    description: "Professional cleaning to remove plaque, tartar, and stains for a healthy smile.",
    icon: <Award className="h-6 w-6 text-blue-600" />,
    features: ["Plaque and tartar removal", "Teeth polishing", "Fluoride treatment", "Gum health evaluation"],
    duration: "45-60 mins",
    priceRange: "$100-$200"
  },
  {
    title: "blue Implants",
    imageUrl: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=700&q=80",
    description: "Permanent solutions for missing teeth with natural-looking blue implants.",
    icon: <Heart className="h-6 w-6 text-blue-600" />,
    features: ["Titanium implant placement", "Custom crown fabrication", "Bone grafting if needed", "Lifetime solution"],
    duration: "Multiple visits",
    priceRange: "$1,700-$3,000 per tooth"
  },
  {
    title: "Oral Surgery",
    imageUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=700&q=80",
    description: "Safe and effective surgical procedures for complex blue needs.",
    icon: <Stethoscope className="h-6 w-6 text-blue-600" />,
    features: ["Wisdom teeth removal", "blue bone grafts", "Tooth extractions", "Corrective jaw surgery"],
    duration: "Varies by procedure",
    priceRange: "$200-$3,700"
  },
  {
    title: "Teeth Whitening",
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=700&q=80",
    description: "Brighten your smile with advanced, gentle whitening treatments.",
    icon: <Award className="h-6 w-6 text-blue-600" />,
    features: ["Professional whitening", "Custom trays", "In-office treatment", "Take-home kits"],
    duration: "60-90 mins",
    priceRange: "$200-$600"
  }
];

const testimonials = [
  {
    content: "The team at Dentics is exceptional. They made me feel comfortable throughout my treatment and the results are amazing!",
    author: {
      name: "Sarah Johnson",
      role: "Patient since 2020",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    rating: 5
  },
  {
    content: "Professional, caring, and thorough. The entire staff goes above and beyond to ensure a great experience.",
    author: {
      name: "Michael Chen",
      role: "Patient since 2019",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    rating: 5
  },
  {
    content: "The best blue care I've ever received. The team is knowledgeable and the facility is state-of-the-art.",
    author: {
      name: "Emily Rodriguez",
      role: "Patient since 2021",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    rating: 5
  }
];

const features = [
  "We are certified", 
  "Expert Doctors", 
  "Excellent Services", 
  "Experienced staff"
];

export default function LandingPage() {
  return (
    <PageLayout>
      <HeroSection
        title="Where smiles shine and care comes first."
        description="Experience premium blue care in a welcoming environment designed for your confidence and comfort."
      />

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
              <div className="lg:w-1/2">
              <motion.img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Modern blue clinic interior"
                className="rounded-xl shadow-xl w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-300"
                whileHover={{ scale: 1.01 }}
                loading="lazy"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 leading-tight">
                Premium blue Care with a Personal Touch
              </h2>
              <p className="text-blue-600 mb-8 leading-relaxed text-lg">
                Our specialized blue facility provides comprehensive oral care using the latest technology. 
                From routine checkups to advanced cosmetic procedures, our experienced team delivers 
                personalized treatment plans for optimal oral health.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((text, index) => (
                  <motion.div 
                    key={text}
                    className="flex items-center bg-blue-50/50 p-4 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-2 rounded-full bg-blue-600 mr-3">
                      <Check className="text-blue-600 h-5 w-5" />
                    </div>
                    <span className="font-mediumtext-blue-600">{text}</span>
                  </motion.div>
                ))}
                  </div>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-600">
                  <Link to="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
          </div>
        </section>

        {/* Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-blue-600 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Comprehensive blue Services
            </motion.h2>
            <p className="text-blue-600 text-lg">
              We offer a full range of blue treatments to keep your smile healthy and beautiful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col justify-center items-center bg-white p-8 rounded-xl shadow-lg border border-blue-600"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                Don't See What You Need?
              </h3>
              <p className="text-blue-600 mb-6 text-center">
                We offer many more specialized services. Contact us to learn about our full range of treatments.
              </p>
              <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Link to="/services">View All Services</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unified Dashboard Access Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Access Your Dashboard
            </h2>
            <p className="text-blue-600 text-lg">
              Manage your blue care experience with our easy-to-use portals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Patient Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full p-8 text-center flex flex-col items-center shadow-md hover:shadow-xl transition-shadow">
                <div className="p-4 bg-blue-600/30 rounded-full mb-6">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Patient Portal</h3>
                <p className="text-blue-600 mb-6 flex-grow">
                  Manage appointments, view treatment history, and access your blue records
                </p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-600">
                  <Link to="/patient-dashboard">
                    Patient Login <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>

            {/* Doctor Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full p-8 text-center flex flex-col items-center shadow-md hover:shadow-xl transition-shadow">
                <div className="p-4 bg-blue-600/30 rounded-full mb-6">
                  <Stethoscope className="h-8 w-8 text-blue-600" />
              </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Doctor Portal</h3>
                <p className="text-blue-600 mb-6 flex-grow">
                  Access patient records, manage appointments, and update treatment plans
                </p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-600">
                  <Link to="/doctor-dashboard">
                    Doctor Login <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>

            {/* Reception Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full p-8 text-center flex flex-col items-center shadow-md hover:shadow-xl transition-shadow">
                <div className="p-4 bg-blue-600/30 rounded-full mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Reception Portal</h3>
                <p className="text-blue-600 mb-6 flex-grow">
                  Manage schedules, patient check-ins, and clinic operations
                </p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-600">
                  <Link to="/reception-dashboard">
                    Reception Login <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          </div>
          </div>
        </section>

        {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Patient Testimonials
            </h2>
            <p className="text-blue-600 text-lg">
              Hear from our patients about their experiences at our clinic
            </p>
          </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author.name}
                {...testimonial}
                index={index}
              />
            ))}
              </div>
              
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link to="/testimonials">Read More Testimonials</Link>
            </Button>
                      </div>
                    </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for a Healthier Smile?
            </h2>
            <p className="text-blue-600 text-xl mb-8">
              Schedule your appointment today and experience the Dentics difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link to="/appointment">Book an Appointment</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
          </div>
        </section>
    </PageLayout>
  );
}