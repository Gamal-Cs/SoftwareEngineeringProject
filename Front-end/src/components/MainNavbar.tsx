import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import DentalLogo from "./DentalLogo";

export function MainNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
    { path: "/patient/dashboard", label: "Patient Portal" },
    { path: "/doctor/dashboard", label: "Doctor Portal" },
    { path: "/reception/dashboard", label: "Reception Portal" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"} border-b`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-blue-600 hover:text-blue-600 transition-colors"
            aria-label="DentalCare Home"
          >
            <DentalLogo size={32} />
            <span className="text-xl">DentalCare</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                location.pathname === link.path
                  ? "text-blue-600 bg-blue-50"
                  : "text-blue-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button 
            asChild 
            variant="default" 
            className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-600 transition-colors shadow-sm"
          >
            <Link to="/login">Login</Link>
          </Button>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-mdtext-blue-600 hover:text-blue- hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  location.pathname === link.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-blue-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              variant="default"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-600"
              onClick={closeMobileMenu}
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}