package com.shaltout.medicalsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@Entity
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "Doctor.findBySpecializationNative",
                query = "SELECT * FROM doctors WHERE specialization = :specialization",
                resultClass = Doctor.class
        ),
        @NamedNativeQuery(
                name = "Doctor.findByIdNative",
                query = "SELECT * FROM doctors WHERE id = :doctorId",
                resultClass = Doctor.class
        )
})
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String fullName;

    private String specialization;

    @Email
    private String email;

    private String phone;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<MedicalRecord> medicalRecords;

}