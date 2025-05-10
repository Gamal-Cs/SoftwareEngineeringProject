package com.shaltout.medicalsystem.controller;

import com.shaltout.medicalsystem.dtos.patient.PatientRequest;
import com.shaltout.medicalsystem.dtos.patient.PatientResponse;
import com.shaltout.medicalsystem.service.patient.IPatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/patients")
@RequiredArgsConstructor
@Tag(name = "Patient API", description = "Operations related to patient management")
public class PatientController {

    private final IPatientService patientService;

    @Operation(summary = "Create a new patient", description = "Only users with ROLE_DOCTOR or ROLE_ADMIN can create patients")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Patient created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "403", description = "Access denied")
    })
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @PostMapping
    public ResponseEntity<PatientResponse> createPatient(@Valid @RequestBody PatientRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(patientService.createPatient(request));
    }

    @Operation(summary = "Get patient by ID", description = "Patients can view their own record; doctors/admins can view any")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Patient record retrieved successfully"),
            @ApiResponse(responseCode = "403", description = "Access denied"),
            @ApiResponse(responseCode = "404", description = "Patient not found")
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR') or (hasRole('PATIENT') and @patientSecurity.isOwner(authentication, #id))")
    @GetMapping("/{id}")
    public ResponseEntity<PatientResponse> getPatientById(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @Operation(summary = "Update patient by ID", description = "Only doctors and admins can update patients")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Patient updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "403", description = "Access denied"),
            @ApiResponse(responseCode = "404", description = "Patient not found")
    })
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<PatientResponse> updatePatient(@PathVariable Long id, @Valid @RequestBody PatientRequest request) {
        return ResponseEntity.ok(patientService.updatePatient(id, request));
    }

    @Operation(summary = "Delete patient by ID", description = "Only admins can delete patients")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Patient deleted successfully"),
            @ApiResponse(responseCode = "403", description = "Access denied"),
            @ApiResponse(responseCode = "404", description = "Patient not found")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}
