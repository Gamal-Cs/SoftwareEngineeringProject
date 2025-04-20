package com.shaltout.medicalsystem.entities;

import jakarta.persistence.*;

@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialty;
    private String phone;
    private String availability;

    @OneToOne
    private User user;
}
