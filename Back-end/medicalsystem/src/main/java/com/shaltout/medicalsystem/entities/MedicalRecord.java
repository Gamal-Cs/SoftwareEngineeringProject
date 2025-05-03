package com.shaltout.medicalsystem.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter @Setter
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "MedicalRecord.findByPatientIdNative",
                query = "SELECT * FROM medical_records WHERE patient_id = :patientId",
                resultClass = MedicalRecord.class
        ),
        @NamedNativeQuery(
                name = "MedicalRecord.findByIdNative",
                query = "SELECT * FROM medical_records WHERE id = :recordId",
                resultClass = MedicalRecord.class
        )
})
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @Lob
    private String diagnosis;

    @Lob
    private String treatment;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}