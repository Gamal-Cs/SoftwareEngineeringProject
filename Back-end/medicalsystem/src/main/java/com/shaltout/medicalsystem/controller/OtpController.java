package com.shaltout.medicalsystem.controller;

import com.shaltout.medicalsystem.service.otp.IOtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    @Autowired
    private IOtpService otpService;

    // Request OTP
    @PostMapping("/request")
    public String requestOtp(@RequestParam String emailOrPhoneNumber, @RequestParam String deliveryMethod) {
        return otpService.requestOtp(emailOrPhoneNumber, deliveryMethod);
    }

    // Verify OTP
    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String emailOrPhoneNumber, @RequestParam String otp) {
        return otpService.verifyOtp(emailOrPhoneNumber, otp);
    }
}