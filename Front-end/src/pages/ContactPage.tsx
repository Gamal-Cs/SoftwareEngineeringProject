import React from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { ContactForm } from "@/components/forms/ContactForm";
import type { ContactFormData } from "@/components/forms/ContactForm";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "+1 (555) 123-4567",
    description: "Call us for any questions",
    action: {
      label: "Call Now",
      href: "tel:+15551234567"
    }
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@dentics.com",
    description: "We'll respond as soon as possible",
    action: {
      label: "Email Us",
      href: "mailto:contact@dentics.com"
    }
  },
  {
    icon: MapPin,
    title: "Address",
    content: "123 blue Street",
    description: "Ahmedabad, Gujarat, India",
    action: {
      label: "Get Directions",
      href: "https://maps.google.com?q=123+blue+Street+Ahmedabad"
    }
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon - Sat: 9:00 AM - 6:00 PM",
    description: "Sunday: Closed",
    action: {
      label: "Book Appointment",
      href: "/appointment"
    }
  }
];

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
        variant: "default"
      });
      
      console.log("Form submitted:", data);
    } catch (error) {
    toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
    });
    }
  };

  return (
    <PageLayout>
      <SectionTitle
        title="Contact Us"
        subtitle="Get in touch with our team for any questions or concerns about your blue care."
      />

      <section className="py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col items-center text-center p-6 h-full">
                    <div className="p-3 rounded-full bg-blue-600/80 mb-4 group-hover:bg-blue-600 transition-colors">
                      <info.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">{info.title}</h3>
                    <p className="text-blue-600 mb-1">{info.content}</p>
                    <p className="text-sm text-blue-600 mb-4">{info.description}</p>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-auto w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <a href={info.action.href}>{info.action.label}</a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
                  </div>
                  
          {/* Form and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-8"
            >
              <Card className="p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Send us a message</h2>
                <ContactForm onSubmit={handleSubmit} />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="blue Clinic Interior"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </Card>

              <Card className="overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.70717947!2d72.43965509160159!3d23.0204975656776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1609242409605!5m2!1sen!2sus"
                width="100%"
                  height="300"
                style={{ border: 0 }}
                  allowFullScreen
                loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  aria-label="Our location on Google Maps"
                />
              </Card>

              <Card className="p-6 bg-blue-50 border-blue-600">
                <h3 className="font-semibold text-lg text-blue-600 mb-3">Emergency Contact</h3>
                <p className="text-blue-600 mb-4">
                  For blue emergencies outside of working hours, please call our emergency line.
                </p>
                <Button variant="destructive" className="w-full" asChild>
                  <a href="tel:+15551234567">Emergency: +1 (555) 987-6543</a>
                </Button>
              </Card>
            </motion.div>
          </div>
          </div>
        </section>
    </PageLayout>
  );
}