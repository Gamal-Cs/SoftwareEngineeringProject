package com.shaltout.medicalsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter @Setter
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "Patient.findByNameNative",
                query = "SELECT * FROM patients WHERE name = :name",
                resultClass = Patient.class
        ),
        @NamedNativeQuery(
                name = "Patient.findByIdNative",
                query = "SELECT * FROM patients WHERE id = :patientId",
                resultClass = Patient.class
        ),
        @NamedNativeQuery(
                name = "Patient.findAllNative",
                query = "SELECT * FROM patients",
                resultClass = Patient.class
        )
})
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String fullName;

    @Email
    private String email;

    private String phone;

    private LocalDate dateOfBirth;

    private String gender;

    private String address;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<MedicalRecord> medicalRecords;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Bill> bills;

}