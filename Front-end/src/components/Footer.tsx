import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar } from "lucide-react";
import DentalLogo from "@/components/DentalLogo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Doctors", path: "/doctors" },
    { name: "Contact", path: "/contact" }
  ];

  const patientPortal = [
    { name: "Dashboard", path: "/patient/dashboard" },
    { name: "Appointments", path: "/appointments" },
    { name: "Prescriptions", path: "/prescriptions" },
    { name: "Medical Records", path: "/medical-records" },
    { name: "Billing", path: "/billing" }
  ];

  const services = [
    { name: "General Dentistry", path: "/services/general" },
    { name: "Cosmetic Dentistry", path: "/services/cosmetic" },
    { name: "Orthodontics", path: "/services/orthodontics" },
    { name: "Pediatric Dentistry", path: "/services/pediatric" },
    { name: "Oral Surgery", path: "/services/surgery" }
  ];

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5 text-teal-700" />,
      title: "Emergency Call",
      value: "7897896543",
      subtitle: "Available 24/7"
    },
    {
      icon: <Clock className="h-5 w-5 text-teal-700" />,
      title: "Clinic Hours",
      value: "Mon-Fri, 10:00AM - 7:00PM",
      subtitle: "Sat 9:00AM - 3:00PM"
    },
    {
      icon: <Mail className="h-5 w-5 text-teal-700" />,
      title: "Email Us",
      value: "Denticsclinic@gmail.com",
      subtitle: "Response within 24 hours"
    }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
      url: "#"
    },
    {
      name: "Instagram",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
      url: "#"
    },
    {
      name: "Twitter",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      url: "#"
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      ),
      url: "#"
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Clinic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3">
              <DentalLogo size={40} />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-blue-700 bg-clip-text text-transparent">
                Dentics
              </h3>
            </div>
            <p className="text-blue-600 leading-relaxed">
              Your trusted partner for comprehensive blue care. We provide exceptional services with a personal touch.
            </p>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-teal-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-white">3B- Sector 41, Gandhi Chowk</p>
                <p className="text-blue-600">Ahmedabad, Gujarat 370058</p>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-teal-700 transition-colors p-2 rounded-full hover:bg-blue-600"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-white border-b border-blue-600 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.path}
                    className="text-blue-600 hover:text-teal-700 transition-colors flex items-center gap-3 group"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Patient Portal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-white border-b border-blue-600 pb-2">
              Patient Portal
            </h3>
            <ul className="space-y-3">
              {patientPortal.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.path}
                    className="text-blue-600 hover:text-teal-700 transition-colors flex items-center gap-3 group"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-white border-b border-blue-600 pb-2">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <motion.li 
                  key={service.name}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={service.path}
                    className="text-blue-600 hover:text-teal-700 transition-colors flex items-center gap-3 group"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactInfo.map((contact, index) => (
            <motion.div 
              key={index}
              className="bg-blue-600 rounded-xl p-6 hover:bg-blue-600 transition-colors group"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-full group-hover:bg-teal-700/10 group-hover:text-teal-700 transition-colors">
                  {contact.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 group-hover:text-white transition-colors">
                    {contact.title}
                  </h4>
                  <p className="text-white font-medium">{contact.value}</p>
                  <p className="text-sm text-blue-600">{contact.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

       

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-t border-blue-600 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-600 text-sm">
              © {new Date().getFullYear()} Dentics blue Clinic. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link 
                to="/privacy-policy" 
                className="text-blue-600 hover:text-teal-700 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-blue-600 hover:text-teal-700 text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/sitemap" 
                className="text-blue-600 hover:text-teal-700 text-sm transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}