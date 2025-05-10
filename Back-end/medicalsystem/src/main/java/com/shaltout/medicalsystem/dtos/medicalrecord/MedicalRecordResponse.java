package com.shaltout.medicalsystem.dtos.medicalrecord;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
@Getter
@Setter
public class MedicalRecordResponse {

    private Long id;

    private Long patientId;

    private String patientFirstName;

    private String patientLastName;

    private String medicalHistory;

    private String medications;

    private String treatmentRecords;

    private String labResults;

    private String immunizationRecords;

    private String documentUrl;

    private LocalDateTime lastUpdated;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;
}

