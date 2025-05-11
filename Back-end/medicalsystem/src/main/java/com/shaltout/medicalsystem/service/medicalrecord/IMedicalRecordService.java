package com.shaltout.medicalsystem.service.medicalrecord;

import com.shaltout.medicalsystem.dtos.medicalrecord.MedicalRecordRequest;
import com.shaltout.medicalsystem.dtos.medicalrecord.MedicalRecordResponse;

import java.util.List;

public interface IMedicalRecordService {
    MedicalRecordResponse createMedicalRecord(MedicalRecordRequest request);
    List<MedicalRecordResponse> getAllMedicalRecords();
    MedicalRecordResponse getMedicalRecordById(Long id);
    MedicalRecordResponse updateMedicalRecord(Long id, MedicalRecordRequest request);
    void deleteMedicalRecord(Long id);

    List<MedicalRecordResponse> getMedicalRecordsByPatientId(Long patientId);
}
