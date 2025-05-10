package com.shaltout.medicalsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter @Setter
//@NamedNativeQueries({
//        @NamedNativeQuery(
//                name = "Patient.findByNameNative",
//                query = "SELECT * FROM patients WHERE name = :name",
//                resultClass = Patient.class
//        ),
//        @NamedNativeQuery(
//                name = "Patient.findByIdNative",
//                query = "SELECT * FROM patients WHERE id = :patientId",
//                resultClass = Patient.class
//        ),
//        @NamedNativeQuery(
//                name = "Patient.findAllNative",
//                query = "SELECT * FROM patients",
//                resultClass = Patient.class
//        )
//})

@NoArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate dateOfBirth;

    @Column(unique = true)
    private String nationalId;

    @OneToMany(mappedBy = "patient")
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "patient")
    private List<Bill> bills;
}
