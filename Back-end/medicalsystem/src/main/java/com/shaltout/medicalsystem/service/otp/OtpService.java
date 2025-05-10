package com.shaltout.medicalsystem.service.otp;

import com.shaltout.medicalsystem.entities.Otp;
import com.shaltout.medicalsystem.entities.User;
import com.shaltout.medicalsystem.repository.OtpRepository;
import com.shaltout.medicalsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;


@Service
@RequiredArgsConstructor
public class OtpService implements IOtpService{

    private final OtpRepository otpRepository;

    private final UserRepository userRepository;

    private final JavaMailSender mailSender;

    @Override
    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    @Override
    public String requestOtp(String emailOrPhoneNumber, String deliveryMethod) {
        // Check if user exists
        Optional<User> userOpt = userRepository.findByEmailOrPhoneNumber(emailOrPhoneNumber);
        if (userOpt.isEmpty()) {
            return "User not found with email or phone number: " + emailOrPhoneNumber;
        }

        User user = userOpt.get();
        String otp = generateOtp();
        LocalDateTime now = LocalDateTime.now();

        // Save OTP to database
        Otp otpEntity = new Otp();
        otpEntity.setIdentifier(emailOrPhoneNumber);
        otpEntity.setOtp(otp);
        otpEntity.setCreatedAt(now);
        otpEntity.setExpiresAt(now.plusMinutes(5));
        otpRepository.save(otpEntity);

        // Send OTP based on delivery method
        if ("email".equalsIgnoreCase(deliveryMethod) && user.getEmail() != null) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Your OTP Code");
            message.setText("Your OTP is: " + otp + ". It is valid for 5 minutes.");
            mailSender.send(message);
            return "OTP sent to email: " + user.getEmail();
        } else if ("sms".equalsIgnoreCase(deliveryMethod) && user.getPhoneNumber() != null) {
            // Placeholder for SMS integration (e.g., Twilio)
            sendSms(user.getPhoneNumber(), "Your OTP is: " + otp + ". It is valid for 5 minutes.");
            return "OTP sent to phone: " + user.getPhoneNumber();
        } else {
            return "Invalid delivery method or missing contact details";
        }
    }

    @Override
    public String verifyOtp(String emailOrPhoneNumber, String otp) {
        Optional<Otp> otpEntityOpt = otpRepository.findById(emailOrPhoneNumber);
        if (otpEntityOpt.isEmpty()) {
            return "No OTP found for: " + emailOrPhoneNumber;
        }

        Otp otpEntity = otpEntityOpt.get();
        boolean isValid = otpEntity.getOtp().equals(otp) &&
                LocalDateTime.now().isBefore(otpEntity.getExpiresAt());

        if (isValid) {
            otpRepository.delete(otpEntity); // Delete OTP after verification
            return "OTP verified successfully";
        } else {
            return "Invalid or expired OTP";
        }
    }

    // Placeholder for SMS sending (e.g., using Twilio)
    private void sendSms(String phoneNumber, String message) {
        // Implement SMS integration here (e.g., Twilio API)
        System.out.println("SMS sent to " + phoneNumber + ": " + message);
    }
}