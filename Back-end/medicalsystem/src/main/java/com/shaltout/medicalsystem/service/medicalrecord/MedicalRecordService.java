package com.shaltout.medicalsystem.service.medicalrecord;

import com.shaltout.medicalsystem.dtos.medicalrecord.MedicalRecordRequest;
import com.shaltout.medicalsystem.dtos.medicalrecord.MedicalRecordResponse;
import com.shaltout.medicalsystem.entities.MedicalRecord;
import com.shaltout.medicalsystem.entities.Patient;
import com.shaltout.medicalsystem.exceptions.ResourceNotFoundException;
import com.shaltout.medicalsystem.repository.MedicalRecordRepository;
import com.shaltout.medicalsystem.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalRecordService implements IMedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    @Override
    public MedicalRecordResponse createMedicalRecord(MedicalRecordRequest request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", request.getPatientId()));

        MedicalRecord record = new MedicalRecord();
        record.setPatient(patient);
        record.setMedicalHistory(request.getMedicalHistory());
        record.setMedications(request.getMedications());
        record.setTreatmentRecords(request.getTreatmentRecords());
        record.setLabResults(request.getLabResults());
        record.setImmunizationRecords(request.getImmunizationRecords());
        record.setDocumentUrl(request.getDocumentUrl());
        record.setLastUpdated(LocalDateTime.now());

        MedicalRecord saved = medicalRecordRepository.save(record);
        return mapToResponse(saved);
    }

    @Override
    public List<MedicalRecordResponse> getAllMedicalRecords() {
        return medicalRecordRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MedicalRecordResponse getMedicalRecordById(Long id) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRecord", "id", id));
        return mapToResponse(record);
    }

    @Override
    public MedicalRecordResponse updateMedicalRecord(Long id, MedicalRecordRequest request) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRecord", "id", id));

        record.setMedicalHistory(request.getMedicalHistory());
        record.setMedications(request.getMedications());
        record.setTreatmentRecords(request.getTreatmentRecords());
        record.setLabResults(request.getLabResults());
        record.setImmunizationRecords(request.getImmunizationRecords());
        record.setDocumentUrl(request.getDocumentUrl());
        record.setLastUpdated(LocalDateTime.now());

        MedicalRecord updated = medicalRecordRepository.save(record);
        return mapToResponse(updated);
    }

    @Override
    public void deleteMedicalRecord(Long id) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRecord", "id", id));
        medicalRecordRepository.delete(record);
    }

    @Override
    public List<MedicalRecordResponse> getMedicalRecordsByPatientId(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", patientId));
        return medicalRecordRepository.findByPatient(patient)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private MedicalRecordResponse mapToResponse(MedicalRecord record) {
        MedicalRecordResponse response = modelMapper.map(record, MedicalRecordResponse.class);
        return response;
    }
}
