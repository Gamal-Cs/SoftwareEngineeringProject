import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Appointment from "./pages/Appointment";
import BookAppointment from "./pages/BookAppointment";
import Prescription from "./pages/Prescription";
import MedicalRecords from "./pages/MedicalRecords";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorPatientsPage from "./pages/DoctorPatientsPage";
import DoctorSchedulePage from "./pages/DoctorSchedulePage";
import PatientDashboard from "./pages/PatientDashboard";
import PatientMedicalRecords from "./pages/PatientMedicalRecords";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import PatientAppointments from "./pages/PatientAppointments";
import PatientPrescriptions from "./pages/PatientPrescriptions";
import PatientRecords from "./pages/PatientRecords";
import PatientDoctors from "./pages/PatientDoctors";
import ReceptionAppointments from "./pages/ReceptionAppointments";
import ReceptionPatients from "./pages/ReceptionPatients";
import ReceptionReports from "./pages/ReceptionReports";
import RegisterPage from "./pages/RegisterPage";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/patient" element={<Index />} />
      <Route path="/patient/dashboard" element={<PatientDashboard />} />
      <Route path="/patient/appointments" element={<PatientAppointments />} />
      <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
      <Route path="/patient/records" element={<PatientRecords />} />
      <Route path="/patient/doctors" element={<PatientDoctors />} />
      <Route path="/patient/medical-records" element={<PatientMedicalRecords />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/prescription" element={<Prescription />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      <Route path="/doctor/appointments" element={<DoctorAppointments />} />
      <Route path="/doctor/patients" element={<DoctorPatientsPage />} />
      <Route path="/doctor/schedule" element={<DoctorSchedulePage />} />
      <Route path="/reception/dashboard" element={<ReceptionDashboard />} />
      <Route path="/reception/appointments" element={<ReceptionAppointments />} />
      <Route path="/reception/patients" element={<ReceptionPatients />} />
      <Route path="/reception/reports" element={<ReceptionReports />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;