package com.shaltout.medicalsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@Entity
//@NamedNativeQueries({
//        @NamedNativeQuery(
//                name = "Doctor.findBySpecializationNative",
//                query = "SELECT * FROM doctors WHERE specialization = :specialization",
//                resultClass = Doctor.class
//        ),
//        @NamedNativeQuery(
//                name = "Doctor.findByIdNative",
//                query = "SELECT * FROM doctors WHERE id = :doctorId",
//                resultClass = Doctor.class
//        )
//})

@NoArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String specialization;

    @Column(unique = true)
    private String licenseNumber;

    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointments;
}
