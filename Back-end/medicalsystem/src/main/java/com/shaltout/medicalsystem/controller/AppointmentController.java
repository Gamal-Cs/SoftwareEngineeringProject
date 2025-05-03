package com.shaltout.medicalsystem.controller;

import com.shaltout.medicalsystem.entities.Appointment;
import com.shaltout.medicalsystem.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Create a new appointment
    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.createAppointment(appointment);
    }

    // Get appointment by patient ID
    @GetMapping("/patient/{patientId}")
    public Appointment getAppointmentByPatientId(@PathVariable Long patientId) {
        return appointmentService.findAppointmentByPatientId(patientId);
    }

    // Get appointment by doctor ID
    @GetMapping("/doctor/{doctorId}")
    public Appointment getAppointmentByDoctorId(@PathVariable Long doctorId) {
        return appointmentService.findAppointmentByDoctorId(doctorId);
    }

    // Update appointment by ID
    @PutMapping("/{appointmentId}")
    public Appointment updateAppointment(@PathVariable Long appointmentId, @RequestBody Appointment appointmentDetails) {
        return appointmentService.updateAppointment(appointmentId, appointmentDetails);
    }

    // Delete appointment by ID
    @DeleteMapping("/{appointmentId}")
    public void deleteAppointment(@PathVariable Long appointmentId) {
        appointmentService.deleteAppointment(appointmentId);
    }
}
