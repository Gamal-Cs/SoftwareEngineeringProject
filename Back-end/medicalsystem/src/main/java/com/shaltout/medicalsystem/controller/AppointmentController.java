package com.shaltout.medicalsystem.controller;

import com.shaltout.medicalsystem.dtos.appointment.AppointmentRequest;
import com.shaltout.medicalsystem.dtos.appointment.AppointmentResponse;
import com.shaltout.medicalsystem.service.appointment.IAppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/appointments")
@RequiredArgsConstructor
@Tag(name = "Appointment API", description = "Endpoints for managing appointments")
public class AppointmentController {

    private final IAppointmentService appointmentService;

    @Operation(
            summary = "Create a new appointment",
            description = "Creates a new appointment for a patient and doctor."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Appointment created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PostMapping
    public ResponseEntity<AppointmentResponse> createAppointment(
            @Valid @RequestBody AppointmentRequest request) {
        AppointmentResponse response = appointmentService.createAppointment(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Get all appointments",
            description = "Retrieves a list of all appointments."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "List of appointments retrieved successfully")
    })
    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {
        List<AppointmentResponse> responses = appointmentService.getAllAppointments();
        return ResponseEntity.ok(responses);
    }

    @Operation(
            summary = "Get appointment by ID",
            description = "Retrieve a single appointment by its unique ID."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Appointment found"),
            @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> getAppointmentById(
            @Parameter(description = "ID of the appointment to retrieve", required = true)
            @PathVariable Long id) {
        AppointmentResponse response = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Update an appointment",
            description = "Update an existing appointment by its ID."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Appointment updated successfully"),
            @ApiResponse(responseCode = "404", description = "Appointment not found"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponse> updateAppointment(
            @Parameter(description = "ID of the appointment to update", required = true)
            @PathVariable Long id,
            @Valid @RequestBody AppointmentRequest request) {
        AppointmentResponse response = appointmentService.updateAppointment(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Delete an appointment",
            description = "Delete an existing appointment by its ID."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Appointment deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(
            @Parameter(description = "ID of the appointment to delete", required = true)
            @PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
    @Operation(
            summary = "Get appointments by patient ID",
            description = "Retrieve a list of appointments for a specific patient."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "List of appointments retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Patient not found")
    })
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByPatientId(
            @Parameter(description = "ID of the patient to retrieve appointments for", required = true)
            @PathVariable Long patientId) {
        List<AppointmentResponse> responses = appointmentService.getAppointmentsByPatientId(patientId);
        return ResponseEntity.ok(responses);
    }
    @Operation(
            summary = "Get appointments by doctor ID",
            description = "Retrieve a list of appointments for a specific doctor."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "List of appointments retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Doctor not found")
    })
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByDoctorId(
            @Parameter(description = "ID of the doctor to retrieve appointments for", required = true)
            @PathVariable Long doctorId) {
        List<AppointmentResponse> responses = appointmentService.getAppointmentsByDoctorId(doctorId);
        return ResponseEntity.ok(responses);
    }
}
