package com.shaltout.medicalsystem.service.patient;

import com.shaltout.medicalsystem.dtos.patient.PatientRequest;
import com.shaltout.medicalsystem.dtos.patient.PatientResponse;

import java.util.List;

public interface IPatientService {

    PatientResponse createPatient(PatientRequest request);

    List<PatientResponse> getAllPatients();

    PatientResponse getPatientById(Long id);

    PatientResponse updatePatient(Long id, PatientRequest request);

    void deletePatient(Long id);
}
