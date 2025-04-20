package com.shaltout.medicalsystem.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String diagnosis;
    private String prescriptions;
    private String notes;
    private LocalDate date;

    @ManyToOne
    private Patient patient;

    @ManyToOne
    private Doctor doctor;
}
