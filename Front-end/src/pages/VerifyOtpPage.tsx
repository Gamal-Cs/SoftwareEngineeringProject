
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNavbar } from "@/components/MainNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();
  
  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto focus next input
      if (value !== '' && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, we'll simulate a successful verification
    // In a real app, you would validate the OTP and then redirect
    navigate('/'); // Redirect to the dashboard or appropriate page
  };
  
  const handleResend = () => {
    // Implement resend OTP logic
    alert('OTP resent!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      
      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-cyan-100 to-blue-50">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="max-w-md mx-auto bg-gradient-to-r from-cyan-200 to-blue-100 p-8 rounded-3xl">
              <h2 className="text-3xl font-bold text-blue-600 mb-4">Welcome</h2>
              <p className="text-blue-600 mb-8">
                We are glad to see you again! Please login to access your account.
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Validate OTP</h1>
              <p className="text-center mb-6">
                Please enter the verification code we sent to 12*****90
              </p>
              
              <form onSubmit={handleVerify} className="space-y-8">
                <div className="flex justify-center space-x-4 mb-6">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      className="w-16 h-16 text-center text-xl"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength={1}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-600">
                  Verify
                </Button>
                
                <div className="text-center">
                  <p>
                    Didn't receive the code?{" "}
                    <button 
                      type="button" 
                      onClick={handleResend} 
                      className="text-blue-600 hover:underline"
                    >
                      Resend code
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
