package com.shaltout.medicalsystem.service.patient;

import com.shaltout.medicalsystem.dtos.patient.PatientRequest;
import com.shaltout.medicalsystem.dtos.patient.PatientResponse;
import com.shaltout.medicalsystem.entities.Patient;
import com.shaltout.medicalsystem.entities.User;
import com.shaltout.medicalsystem.exceptions.ResourceNotFoundException;
import com.shaltout.medicalsystem.repository.PatientRepository;
import com.shaltout.medicalsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService implements IPatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public PatientResponse createPatient(PatientRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));

        Patient patient = new Patient();
        patient.setUser(user);
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setNationalId(request.getNationalId());

        Patient savedPatient = patientRepository.save(patient);
        return mapToResponse(savedPatient);
    }

    @Override
    public List<PatientResponse> getAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PatientResponse getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));
        return mapToResponse(patient);
    }

    @Override
    public PatientResponse updatePatient(Long id, PatientRequest request) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));

        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setNationalId(request.getNationalId());

        Patient updatedPatient = patientRepository.save(patient);
        return mapToResponse(updatedPatient);
    }

    @Override
    public void deletePatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));
        patientRepository.delete(patient);
    }

    private PatientResponse mapToResponse(Patient patient) {
        PatientResponse response = modelMapper.map(patient, PatientResponse.class);
        return response;
    }
}
