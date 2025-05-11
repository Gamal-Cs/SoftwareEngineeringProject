package com.shaltout.medicalsystem.service.appointment;

import com.shaltout.medicalsystem.dtos.appointment.AppointmentRequest;
import com.shaltout.medicalsystem.dtos.appointment.AppointmentResponse;

import java.util.List;

public interface IAppointmentService {

    AppointmentResponse createAppointment(AppointmentRequest request);

    List<AppointmentResponse> getAllAppointments();

    AppointmentResponse getAppointmentById(Long id);

    AppointmentResponse updateAppointment(Long id, AppointmentRequest request);

    void deleteAppointment(Long id);

    List<AppointmentResponse> getAppointmentsByPatientId(Long patientId);

    List<AppointmentResponse> getAppointmentsByDoctorId(Long doctorId);
}
