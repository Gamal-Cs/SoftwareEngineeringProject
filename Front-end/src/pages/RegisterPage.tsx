// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainNavbar } from "@/components/MainNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Shared mock user data
const mockUsers = [
  {
    phoneNumber: "01011300098",
    password: "password123",
    role: "PATIENT",
    user: { id: "1", name: "Yumna Shaheen", role: "PATIENT", email: "yumnashaheen6@gmail.com" },
  },
  {
    phoneNumber: "01011300098",
    password: "doctor123",
    role: "DOCTOR",
    user: { id: "2", name: "Dr. Yumna Shaheen", role: "DOCTOR", email: "yumnashaheen6@gmail.com" },
  },
  {
    phoneNumber: "01011300098",
    password: "reception123",
    role: "RECEPTION",
    user: { id: "3", name: "Receptionist", role: "RECEPTION", email: "receptionist@gmail.com" },
  },
];

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    role: "PATIENT",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      setForm({ ...form, [name]: value.replace(/\D/g, "").slice(0, 10) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    if (form.phoneNumber.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      setIsLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }
    if (!form.username || !form.firstName || !form.lastName) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      // Check for existing user
      if (
        mockUsers.some((u) => u.phoneNumber === form.phoneNumber) ||
        mockUsers.some((u) => u.user.email === form.email)
      ) {
        throw new Error("Phone number or email already registered.");
      }

      // Simulate registration
      const newUser = {
        phoneNumber: form.phoneNumber,
        password: form.password,
        role: form.role.toUpperCase(),
        user: {
          id: String(mockUsers.length + 1),
          name: `${form.firstName} ${form.lastName}`,
          role: form.role.toUpperCase(),
          email: form.email,
        },
      };
      mockUsers.push(newUser);
      console.log("User registered", newUser);

      toast({
        title: "Registration Successful",
        description: "Please log in to continue.",
      });
      navigate("/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed.");
      toast({
        title: "Registration Failed",
        description: err.message || "An error occurred during registration.",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
          >
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
              Register
            </h2>
            {error && (
              <div
                className="text-red-700 bg-red-50 p-3 rounded"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="username" className="text-blue-600">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                required
                className="mt-1 border-blue-600 focus:border-blue-700"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-blue-600">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 border-blue-600 focus:border-blue-700"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-blue-600">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="mt-1 border-blue-600 focus:border-blue-700"
              />
            </div>
            <div>
              <Label htmlFor="firstName" className="text-blue-600">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="mt-1 border-blue-600 focus:border-blue-700"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-blue-600">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="mt-1 border-blue-600 focus:border-blue-700"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="text-blue-600">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Enter your 10-digit phone number"
                value={form.phoneNumber}
                onChange={handleChange}
                required
                className={`mt-1 border-blue-600 focus:border-blue-700 ${
                  form.phoneNumber && form.phoneNumber.length !== 10
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-blue-600">
                Role
              </Label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="mt-1 w-full border border-blue-600 focus:border-blue-700 rounded-md p-3 bg-white text-blue-600"
                required
              >
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
                <option value="RECEPTION">Reception</option>
              </select>
            </div>
            <Button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <div className="text-center mt-4 text-blue-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign in here
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}