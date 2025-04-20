package com.shaltout.medicalsystem.entities;

import com.shaltout.medicalsystem.enums.BillStatus;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private LocalDate dateIssued;

    @Enumerated(EnumType.STRING)
    private BillStatus status;

    @OneToOne
    private Appointment appointment;
}
