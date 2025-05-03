package com.shaltout.medicalsystem.service;

import com.shaltout.medicalsystem.entities.Appointment;
import com.shaltout.medicalsystem.exceptions.InvalidInputException;
import com.shaltout.medicalsystem.exceptions.ResourceNotFoundException;
import com.shaltout.medicalsystem.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository; // Basic CRUD methods

    // Create an appointment
    public Appointment createAppointment(Appointment appointment) {
        if (appointment == null || appointment.getAppointmentDate() == null) {
            throw new InvalidInputException("Appointment date must not be null");
        }
        return appointmentRepository.save(appointment);
    }

    // Find appointment by patient ID
    public Appointment findAppointmentByPatientId(Long patientId) {
        if (patientId == null || patientId <= 0) {
            throw new InvalidInputException("Invalid patient ID");
        }

        Appointment appointment = appointmentRepository.findByPatientId(patientId);
        if (appointment == null) {
            throw new ResourceNotFoundException("Appointment", "patientId", patientId);
        }
        return appointment;
    }

    // Find appointment by doctor ID
    public Appointment findAppointmentByDoctorId(Long doctorId) {
        if (doctorId == null || doctorId <= 0) {
            throw new InvalidInputException("Invalid doctor ID");
        }

        Appointment appointment = appointmentRepository.findByDoctorId(doctorId);
        if (appointment == null) {
            throw new ResourceNotFoundException("Appointment", "doctorId", doctorId);
        }
        return appointment;
    }

    // Example: update an appointment
    public Appointment updateAppointment(Long appointmentId, Appointment appointmentDetails) {
        Appointment existingAppointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (existingAppointment == null) {
            throw new ResourceNotFoundException("Appointment", "id", appointmentId);
        }

        // Update the appointment with new details
        existingAppointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
        existingAppointment.setDoctor(appointmentDetails.getDoctor());
        existingAppointment.setPatient(appointmentDetails.getPatient());

        return appointmentRepository.save(existingAppointment);
    }

    // Example: delete an appointment
    public void deleteAppointment(Long appointmentId) {
        Appointment existingAppointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (existingAppointment == null) {
            throw new ResourceNotFoundException("Appointment", "id", appointmentId);
        }
        appointmentRepository.delete(existingAppointment);
    }
}
