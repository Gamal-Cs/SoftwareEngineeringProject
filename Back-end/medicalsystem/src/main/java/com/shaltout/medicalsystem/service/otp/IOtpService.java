package com.shaltout.medicalsystem.service.otp;

public interface IOtpService {
    public String generateOtp();

    public String requestOtp(String emailOrPhoneNumber, String deliveryMethod);

    public String verifyOtp(String emailOrPhoneNumber, String otp);
}
