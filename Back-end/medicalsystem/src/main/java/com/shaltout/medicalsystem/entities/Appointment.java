package com.shaltout.medicalsystem.entities;

import com.shaltout.medicalsystem.enums.AppointmentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "Appointment.findByPatientIdNative",
                query = "SELECT * FROM appointments WHERE patient_id = :patientId",
                resultClass = Appointment.class
        ),
        @NamedNativeQuery(
                name = "Appointment.findByDoctorIdNative",
                query = "SELECT * FROM appointments WHERE doctor_id = :doctorId",
                resultClass = Appointment.class
        )
})
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime appointmentDate;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}