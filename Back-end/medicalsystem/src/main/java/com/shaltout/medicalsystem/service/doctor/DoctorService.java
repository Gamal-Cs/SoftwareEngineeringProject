package com.shaltout.medicalsystem.service.doctor;

import com.shaltout.medicalsystem.dtos.doctor.DoctorRequest;
import com.shaltout.medicalsystem.dtos.doctor.DoctorResponse;
import com.shaltout.medicalsystem.entities.Doctor;
import com.shaltout.medicalsystem.entities.User;
import com.shaltout.medicalsystem.exceptions.ResourceNotFoundException;
import com.shaltout.medicalsystem.repository.DoctorRepository;
import com.shaltout.medicalsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService implements IDoctorService {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public DoctorResponse createDoctor(DoctorRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));

        Doctor doctor = new Doctor();
        doctor.setUser(user);
        doctor.setSpecialization(request.getSpecialization());
        doctor.setLicenseNumber(request.getLicenseNumber());

        Doctor savedDoctor = doctorRepository.save(doctor);
        return mapToResponse(savedDoctor);
    }

    @Override
    public List<DoctorResponse> getAllDoctors() {
        return doctorRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DoctorResponse getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));
        return mapToResponse(doctor);
    }

    @Override
    public DoctorResponse updateDoctor(Long id, DoctorRequest request) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));

        doctor.setUser(user);
        doctor.setSpecialization(request.getSpecialization());
        doctor.setLicenseNumber(request.getLicenseNumber());

        Doctor updatedDoctor = doctorRepository.save(doctor);
        return mapToResponse(updatedDoctor);
    }

    @Override
    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));
        doctorRepository.delete(doctor);
    }

    private DoctorResponse mapToResponse(Doctor doctor) {
        DoctorResponse response = modelMapper.map(doctor, DoctorResponse.class);
        return response;
    }
}
