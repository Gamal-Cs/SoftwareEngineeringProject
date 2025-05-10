package com.shaltout.medicalsystem.entities;

import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Data
public class Otp {
    @Id
    private String identifier;
    private String otp;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
}
