package com.shaltout.medicalsystem.service.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendGreetingEmail(String to, String username) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Welcome to Our Medical Site!");
        message.setText("Hello " + username + ",\n\nThanks for registering with us!\n\nBest regards,\nMedical Island Team");
        mailSender.send(message);
    }
}
