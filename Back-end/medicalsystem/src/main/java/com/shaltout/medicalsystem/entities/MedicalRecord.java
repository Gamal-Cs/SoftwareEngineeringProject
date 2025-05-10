package com.shaltout.medicalsystem.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
//@NamedNativeQueries({
//        @NamedNativeQuery(
//                name = "MedicalRecord.findByPatientIdNative",
//                query = "SELECT * FROM medical_records WHERE patient_id = :patientId",
//                resultClass = MedicalRecord.class
//        ),
//        @NamedNativeQuery(
//                name = "MedicalRecord.findByIdNative",
//                query = "SELECT * FROM medical_records WHERE id = :recordId",
//                resultClass = MedicalRecord.class
//        )
//})

@NoArgsConstructor
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to the patient this record belongs to
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    // Summary of patient's medical history (illnesses, surgeries, allergies)
    @Column(length = 2000)
    private String medicalHistory;

    // Current medications and prescriptions
    @Column(length = 2000)
    private String medications;

    // Treatment notes, progress updates, observations
    @Column(length = 4000)
    private String treatmentRecords;

    // Lab results, diagnostic reports references or summaries
    @Column(length = 2000)
    private String labResults;

    // Immunization history
    @Column(length = 1000)
    private String immunizationRecords;

    // Date when this record was created or last updated
    private LocalDateTime lastUpdated;

    // Optional: link to documents or files (e.g., scanned reports)
    private String documentUrl;

    // Audit fields
    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;
}
