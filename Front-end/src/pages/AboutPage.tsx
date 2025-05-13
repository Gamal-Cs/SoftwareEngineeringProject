import React from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Award,
  Users,
  Clock,
  Heart,
  Star,
  Check,
  Smile,
  Stethoscope,
  Shield,
  Calendar,
  Phone,
  MapPin
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stats = [
  {
    icon: Award,
    value: "25+",
    label: "Years of Experience",
    description: "Serving our community with excellence since 1998",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Users,
    value: "10k+",
    label: "Happy Patients",
    description: "Trusted by thousands of families",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Emergency Care",
    description: "Always here when you need us",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Heart,
    value: "100%",
    label: "Patient Satisfaction",
    description: "Your comfort is our priority",
    color: "bg-purple-100 text-purple-600"
  }
];

const team = [
  {
    name: "Dr. Sarah Johnson",
    role: "Lead Dentist",
    imageUrl: "/team/sarah-johnson.jpg",
    specialties: ["General Dentistry", "Cosmetic Procedures"],
    experience: "15 years",
    education: "DDS, Harvard University"
  },
  {
    name: "Dr. Michael Chen",
    role: "Orthodontist",
    imageUrl: "/team/michael-chen.jpg",
    specialties: ["Braces", "Aligners", "Invisalign"],
    experience: "12 years",
    education: "DMD, University of Pennsylvania"
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Pediatric Dentist",
    imageUrl: "/team/emily-rodriguez.jpg",
    specialties: ["Children's Dentistry", "Preventive Care"],
    experience: "10 years",
    education: "DDS, UCLA School of Dentistry"
  }
];

const testimonials = [
  {
    id: 1,
    content: "The team at Dentics is exceptional. They made me feel comfortable throughout my treatment and the results are amazing!",
    author: {
      name: "Sarah Johnson",
      role: "Patient since 2020",
      imageUrl: "/testimonials/sarah-johnson.jpg"
    },
    rating: 5,
    treatment: "Teeth Whitening"
  },
  {
    id: 2,
    content: "Professional, caring, and thorough. The entire staff goes above and beyond to ensure a great experience. My Invisalign treatment was flawless!",
    author: {
      name: "Michael Chen",
      role: "Patient since 2019",
      imageUrl: "/testimonials/michael-chen.jpg"
    },
    rating: 5,
    treatment: "Invisalign"
  },
  {
    id: 3,
    content: "The best blue care I've ever received. The team is knowledgeable and the facility is state-of-the-art. My kids actually look forward to their checkups!",
    author: {
      name: "Emily Rodriguez",
      role: "Patient since 2021",
      imageUrl: "/testimonials/emily-rodriguez.jpg"
    },
    rating: 5,
    treatment: "Family Dentistry"
  }
];

const services = [
  {
    name: "General Dentistry",
    description: "Comprehensive oral health care including exams, cleanings, and fillings",
    icon: Stethoscope
  },
  {
    name: "Cosmetic Dentistry",
    description: "Enhance your smile with veneers, whitening, and other cosmetic procedures",
    icon: Smile
  },
  {
    name: "Orthodontics",
    description: "Straighten teeth with traditional braces or clear aligner therapy",
    icon: Shield
  }
];

const AnimatedCard = ({ children, index }: { children: React.ReactNode, index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
        {children}
      </Card>
    </motion.div>
  );
};

export default function AboutPage() {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout>
      <SectionTitle
        title="About Us"
        subtitle="Your trusted partner in blue care since 1998"
      />

        {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Compassionate Care, Exceptional Results
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              At Dentics, we combine cutting-edge technology with a gentle touch to provide
              the highest quality blue care in a comfortable environment.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-100"
              >
                <Link to="/book-appointment">Book Appointment</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/services">Our Services</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedCard key={stat.label} index={index}>
                <div className="text-center h-full flex flex-col">
                  <div className={`p-4 rounded-full ${stat.color} w-fit mx-auto mb-6`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-4xl font-bold text-blue-600 mb-3">{stat.value}</h3>
                  <p className="text-lg font-semibold text-blue-600 mb-3">{stat.label}</p>
                  <p className="text-blue-600 mt-auto">{stat.description}</p>
                </div>
              </AnimatedCard>
            ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
      <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <img 
                  src="/clinic-building.jpg" 
                  alt="Our Clinic" 
                  className="rounded-xl shadow-lg w-full h-auto" 
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-600 rounded-full">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Our Location</p>
                      <p className="text-sm text-blue-600">123 blue Street</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-4 bg-blue-600 text-blue-600">
                Our Journey
              </Badge>
              <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Story</h2>
              <p className="text-blue-600 mb-6 leading-relaxed">
                Founded in 1998 by Dr. Robert Smith, Dentics began as a small practice with a big vision: 
                to revolutionize blue care through compassion, innovation, and excellence. Today, under the 
                leadership of Dr. Sarah Johnson, we've grown into a premier blue center serving thousands 
                of patients with state-of-the-art technology and a team of dedicated professionals.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {["Modern Technology", "Expert Team", "Patient-Focused", "Comprehensive Care"].map((text, index) => (
                  <motion.div 
                    key={text}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-2 rounded-full bg-blue-600 mr-3">
                      <Check className="text-blue-600 h-5 w-5" />
                    </div>
                    <span className="font-medium">{text}</span>
                  </motion.div>
                ))}
              </div>
              <Button 
                asChild 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Link to="/about/history">Learn More About Our History</Link>
              </Button>
            </motion.div>
          </div>
          </div>
        </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Services"
            subtitle="Comprehensive blue care for the whole family"
          />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedCard key={service.name} index={index}>
                <div className="flex flex-col h-full">
                  <div className="p-3 bg-blue-600 rounded-full w-fit mb-6">
                    <service.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 mb-3">{service.name}</h3>
                  <p className="text-blue-600 mb-6 flex-grow">{service.description}</p>
                  <Link 
                    to={`/services#${service.name.toLowerCase().replace(' ', '-')}`}
                    className="text-blue-600 font-medium inline-flex items-center hover:underline"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </AnimatedCard>
            ))}
          </div>
              </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Meet Our Team"
            subtitle="Experienced professionals dedicated to your blue health"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <AnimatedCard key={member.name} index={index}>
                <div className="text-center">
                  <Avatar className="w-32 h-32 mx-auto mb-6">
                    <AvatarImage src={member.imageUrl} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-blue-600 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-blue-600 text-sm mb-4">{member.education}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {member.specialties.map((specialty) => (
                      <Badge 
                        key={specialty}
                        variant="secondary"
                        className="text-sm"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-blue-600 text-sm">Experience: {member.experience}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
              </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="What Our Patients Say"
            subtitle="Real experiences from our valued patients"
          />
          
          {/* Desktop Testimonials */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard key={testimonial.id} index={index}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-700 fill-current" />
                    ))}
                  </div>
                  <p className="text-blue-600 mb-6 italic flex-grow">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={testimonial.author.imageUrl} />
                      <AvatarFallback>{testimonial.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-blue-600">{testimonial.author.name}</h4>
                      <p className="text-sm text-blue-600">{testimonial.author.role}</p>
                      <p className="text-xs text-blue-600 mt-1">Treatment: {testimonial.treatment}</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
              </div>
              
          {/* Mobile Testimonials Carousel */}
          <div className="md:hidden relative overflow-hidden">
            <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                  <Card className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-700 fill-current" />
                        ))}
                </div>
                      <p className="text-blue-600 mb-6 italic flex-grow">"{testimonial.content}"</p>
                      <div className="flex items-center">
                        <Avatar className="w-12 h-12 mr-4">
                          <AvatarImage src={testimonial.author.imageUrl} />
                          <AvatarFallback>{testimonial.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-blue-600">{testimonial.author.name}</h4>
                          <p className="text-sm text-blue-600">{testimonial.author.role}</p>
                          <p className="text-xs text-blue-600 mt-1">Treatment: {testimonial.treatment}</p>
              </div>
                </div>
              </div>
                  </Card>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${activeTestimonial === index ? 'bg-blue-600' : 'bg-blue-600'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Experience the Dentics Difference?
            </h2>
            <p className="text-xl mb-8">
              Join our family of satisfied patients and discover why we're the preferred choice for blue care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-100"
              >
                <Link to="/book-appointment">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Your Appointment
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/contact">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Us
                </Link>
            </Button>
            </div>
          </motion.div>
          </div>
        </section>
    </PageLayout>
  );
}