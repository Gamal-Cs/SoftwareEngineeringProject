package com.shaltout.medicalsystem.service.doctor;

import com.shaltout.medicalsystem.dtos.doctor.DoctorRequest;
import com.shaltout.medicalsystem.dtos.doctor.DoctorResponse;

import java.util.List;

public interface IDoctorService {

    DoctorResponse createDoctor(DoctorRequest request);

    List<DoctorResponse> getAllDoctors();

    DoctorResponse getDoctorById(Long id);

    DoctorResponse updateDoctor(Long id, DoctorRequest request);

    void deleteDoctor(Long id);
}
