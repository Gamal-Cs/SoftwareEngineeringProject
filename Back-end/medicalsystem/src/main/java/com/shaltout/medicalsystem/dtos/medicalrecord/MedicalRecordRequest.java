package com.shaltout.medicalsystem.dtos.medicalrecord;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class MedicalRecordRequest {

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @Size(max = 2000, message = "Medical history must be at most 2000 characters")
    private String medicalHistory;

    @Size(max = 2000, message = "Medications must be at most 2000 characters")
    private String medications;

    @Size(max = 4000, message = "Treatment records must be at most 4000 characters")
    private String treatmentRecords;

    @Size(max = 2000, message = "Lab results must be at most 2000 characters")
    private String labResults;

    @Size(max = 1000, message = "Immunization records must be at most 1000 characters")
    private String immunizationRecords;

    private String documentUrl;
}
