import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, ArrowRight, CalendarCheck, HeartPulse } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface HeroSectionProps {
  title: string;
  description: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-blue-50 to-blue-50 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-100 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Section: Text and Buttons */}
          <motion.div className="lg:w-1/2 text-blue-600" variants={itemVariants}>
            <motion.h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold mb-6 leading-tight tracking-tight text-blue-600"
              variants={itemVariants}
            >
              Where <span className="text-blue-600 px-2 py-1 rounded-md">smiles shine</span> and care comes first
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl mb-8 max-w-[600px] text-blue-600 leading-relaxed"
              variants={itemVariants}
            >
              Where healthy smiles begin: blending cutting-edge blue technology with gentle preventive care and tailored treatments—all in a welcoming environment designed for your confidence and comfort.
            </motion.p>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg border border-blue-100"
              variants={itemVariants}
            >
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-600 hover:to-blue-600 text-white group flex-1 flex items-center gap-2 px-6 py-4 rounded-lg transition-all hover:shadow-lg"
                >
                  <Link to="/book-appointment" className="flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5" />
                    Book an Appointment
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-[#f3eeff] hover:border-blue-600 hover:text-blue-600 group flex-1 flex items-center gap-2 px-6 py-4 rounded-lg transition-all"
                >
                  <Link to="/reschedule" className="flex items-center justify-center">
                    Reschedule & Book
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-blue-600">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Shivranjani cross road, Memnagar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center gap-2 sm:ml-auto">
                  <div className="p-2 bg-[#f3eeff] rounded-lg">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section: Image with Stats */}
          <motion.div className="lg:w-1/2 relative mt-12 lg:mt-0" variants={itemVariants}>
            <motion.div
              className="relative w-full h-[500px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute top-0 right-0 w-full lg:w-[450px] h-full bg-white rounded-tl-[120px] rounded-br-[120px] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80"
                  alt="Professional dentist with patient"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              {/* Floating card 1 - positioned to not overlap main image */}
              <motion.div
                className="absolute bottom-0 left-0 bg-white p-5 rounded-xl shadow-xl w-72"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#f3eeff] rounded-lg">
                    <HeartPulse className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-600">Pain-Free Treatments</p>
                    <p className="text-xs text-blue-600">Advanced anesthesia techniques</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating card 2 - positioned to not overlap main image */}
              <motion.div
                className="absolute top-8 right-0 bg-blue-600 p-5 rounded-xl shadow-xl w-64 text-white"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Emergency Contact</p>
                    <p className="text-xs opacity-90">24/7 available</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);