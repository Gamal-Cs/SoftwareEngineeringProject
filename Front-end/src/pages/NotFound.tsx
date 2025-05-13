import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "next-themes";
// import * as Sentry from "@sentry/react"; // Optional: Uncomment for Sentry integration

const NotFound = () => {
  const location = useLocation();
  const controls = useAnimation();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { theme } = useTheme();

  // Error logging with enhanced context
  const logError = React.useCallback((pathname: string) => {
    const errorContext = {
      pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    };
    console.error("404 Error: User attempted to access non-existent route:", errorContext);
    // Optional: Sentry integration
    // Sentry.captureMessage("404 Not Found", {
    //   level: "warning",
    //   extra: errorContext,
    // });
  }, []);

  // Log error on pathname change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      logError(location.pathname);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [location.pathname, logError]);

  // Focus heading on mount for accessibility
  useEffect(() => {
    headingRef.current?.focus();
    controls.start("visible");
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const svgVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5,
        repeat: 2,
        repeatType: "reverse" as const
      },
    },
  };

  // Retry current URL
  const handleRetry = () => {
    window.location.reload();
  };

  // Dynamic error message
  const errorMessage = `The page at "${location.pathname}" doesn't exist. It may have been moved, deleted, or never existed.`;

  // Suggested pages based on current path
  const getSuggestedPages = () => {
    const path = location.pathname.toLowerCase();
    const baseSuggestions = [
      { to: "/", label: "Home", icon: "🏠" },
      { to: "/services", label: "Services", icon: "🦷" },
      { to: "/contact", label: "Contact", icon: "✉️" },
    ];

    if (path.includes("patient")) {
      return [
        { to: "/patient-dashboard", label: "Patient Dashboard", icon: "👤" },
        { to: "/appointments", label: "Appointments", icon: "📅" },
        ...baseSuggestions,
      ];
    }

    if (path.includes("doctor")) {
      return [
        { to: "/doctor-dashboard", label: "Doctor Dashboard", icon: "👨‍⚕️" },
        { to: "/schedule", label: "Schedule", icon: "📋" },
        ...baseSuggestions,
      ];
    }

    return baseSuggestions;
  };

  return (
    <>

      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-600 dark:to-blue-600 px-4"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        role="alert"
        aria-labelledby="not-found-heading"
      >
        <div className="max-w-md w-full mx-auto p-8 text-center bg-white dark:bg-blue-850 rounded-xl shadow-lg">
          <motion.div variants={itemVariants}>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme === "dark" ? "#86efac" : "#059669"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-6"
              variants={svgVariants}
              aria-hidden="true"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </motion.svg>
          </motion.div>
          
          <motion.h1
            ref={headingRef}
            id="not-found-heading"
            className="text-6xl font-bold text-blue-600 dark:text-blue-600 mb-4"
            variants={itemVariants}
            tabIndex={-1}
          >
            404
          </motion.h1>
          
          <motion.h2
            className="text-2xl font-semibold text-blue-600 dark:text-blue-500 mb-4"
            variants={itemVariants}
          >
            Page Not Found
          </motion.h2>
          
          <motion.p
            className="text-blue-600 dark:text-blue-600 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            {errorMessage}
          </motion.p>
          
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-600 text-white"
                aria-label="Return to homepage"
              >
                <Link to="/">Return to Home</Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-600 dark:hover:bg-blue-600"
                onClick={handleRetry}
                aria-label="Retry current page"
              >
                Retry Page
              </Button>
            </div>
            
            <div className="pt-4 border-t border-blue-500 dark:border-blue-600">
              <h3 className="text-sm font-mediumtext-blue-600 dark:text-blue-600 mb-4">
                You might be looking for:
              </h3>
              <ul className="grid grid-cols-2 gap-3 text-sm">
                {getSuggestedPages().map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-600 transition-colors text-blue-600 dark:text-blue-600"
                      aria-label={`Navigate to ${link.label}`}
                    >
                      <span className="text-lg">{link.icon}</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-sm text-blue-600 dark:text-blue-600 pt-4">
              Still can't find what you need?{" "}
              <Link
                to="/contact"
                className="font-medium text-blue-600 hover:text-blue-600 dark:text-blue-600 dark:hover:text-blue-600 transition-colors"
                aria-label="Contact our support team"
              >
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default React.memo(NotFound);