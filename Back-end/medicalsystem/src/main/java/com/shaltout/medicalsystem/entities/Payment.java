package com.shaltout.medicalsystem.entities;

import com.shaltout.medicalsystem.enums.PaymentStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String paymentId;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String payerEmail;
    private LocalDateTime paymentDate;
    private double amount;

    @OneToOne
    private Bill bill;
}
