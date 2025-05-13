import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainNavbar } from "@/components/MainNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

type UserType = "doctor" | "patient" | "reception";

// Mock user data for authentication
const mockUsers = [
  {
    phoneNumber: "1011300098",
    password: "password123",
    role: "PATIENT",
    user: { id: "1", name: "Yumna Shaheen", role: "PATIENT", email: "yumnashaheen6@gmail.com" },
  },
  {
    phoneNumber: "1011300098",
    password: "doctor123",
    role: "DOCTOR",
    user: { id: "2", name: "Dr. Yumna Shaheen", role: "DOCTOR", email: "yumnashaheen6@gmail.com" },
  },
  {
    phoneNumber: "1011300098",
    password: "reception123",
    role: "RECEPTION",
    user: { id: "3", name: "Receptionist", role: "RECEPTION", email: "receptionist@gmail.com" },
  },
];

export default function LoginPage() {
  const [userType, setUserType] = useState<UserType>("patient");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log("LoginPage rendered", { userType, phone, isLoading });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log("handleLogin called", { phone, password, userType });

    // Client-side validation
    if (phone.length !== 10) {
      toast({
        title: "Invalid Input",
        description: "Phone number must be exactly 10 digits.",
        variant: "destructive",
      });
      setError("Phone number must be exactly 10 digits.");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Invalid Input",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate authentication
      const user = mockUsers.find(
        (u) =>
          u.phoneNumber === phone &&
          u.password === password &&
          u.role === userType.toUpperCase()
      );

      if (!user) {
        throw new Error("Invalid phone number, password, or role.");
      }

      const { user: userData, role } = user;
      const token = `mock-jwt-token-${userData.id}`;
      console.log("Login successful", { userData, token });

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });

      // Redirect based on role
      switch (role) {
        case "PATIENT":
          console.log("Navigating to /patient/dashboard");
          navigate("/patient/dashboard");
          break;
        case "DOCTOR":
          console.log("Navigating to /doctor/dashboard");
          navigate("/doctor/dashboard");
          break;
        case "RECEPTION":
          console.log("Navigating to /reception/dashboard");
          navigate("/reception/dashboard");
          break;
        default:
          console.warn(`Unknown role: ${role}`);
          navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      setError(error.message);
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <MainNavbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-xl bg-white">
            {/* Welcome Section */}
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 text-white">
              <div className="h-full flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Welcome Back
                  </h2>
                  <p className="text-lg md:text-xl mb-8 text-blue-100">
                    We're glad to see you again! Please login to access your personalized dental care portal.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-500/30 mr-4">
                        <Check className="h-5 w-5" />
                      </div>
                      <span>Access your dental records</span>
                    </div>
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-500/30 mr-4">
                        <Check className="h-5 w-5" />
                      </div>
                      <span>Manage appointments</span>
                    </div>
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-500/30 mr-4">
                        <Check className="h-5 w-5" />
                      </div>
                      <span>Secure and private</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Login Form Section */}
            <div className="lg:w-1/2 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-blue-600 mb-2">
                    Sign In
                  </h1>
                  <p className="text-blue-600">Access your Dentics account</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                {/* User Type Selector */}
                <div className="mb-8">
                  <Label className="block text-center mb-4 text-blue-600">
                    I am a:
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {(["patient", "doctor", "reception"] as UserType[]).map(
                      (type) => (
                        <Button
                          key={type}
                          variant={userType === type ? "default" : "outline"}
                          className={`capitalize ${
                            userType === type
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "hover:bg-blue-100"
                          }`}
                          onClick={() => setUserType(type)}
                          type="button"
                        >
                          {type}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="phone" className="block mb-2">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your 10-digit phone number"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      required
                      className={`py-3 px-4 ${
                        phone && phone.length !== 10 ? "border-red-500" : ""
                      }`}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="py-3 px-4 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <div className="text-center text-sm text-blue-600 mt-6">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Register here
                    </Link>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}