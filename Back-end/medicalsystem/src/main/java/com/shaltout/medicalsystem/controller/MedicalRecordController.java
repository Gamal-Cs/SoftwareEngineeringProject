package com.shaltout.medicalsystem.controller;

import com.shaltout.medicalsystem.dtos.medicalrecord.MedicalRecordRequest;
import com.shaltout.medicalsystem.dtos.medicalrecord.MedicalRecordResponse;
import com.shaltout.medicalsystem.service.medicalrecord.IMedicalRecordService;
import io.swagger.v3.oas.annotations.Operation;
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
@RequestMapping("${api.prefix}/medical-records")
@RequiredArgsConstructor
@Tag(name = "Medical Record API", description = "Operations related to medical records")
public class MedicalRecordController {

    private final IMedicalRecordService medicalRecordService;

    @Operation(summary = "Create a new medical record")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Medical record created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PostMapping
    public ResponseEntity<MedicalRecordResponse> createMedicalRecord(@Valid @RequestBody MedicalRecordRequest request) {
        MedicalRecordResponse response = medicalRecordService.createMedicalRecord(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all medical records")
    @ApiResponse(responseCode = "200", description = "List of medical records retrieved successfully")
    @GetMapping
    public ResponseEntity<List<MedicalRecordResponse>> getAllMedicalRecords() {
        List<MedicalRecordResponse> records = medicalRecordService.getAllMedicalRecords();
        return ResponseEntity.ok(records);
    }

    @Operation(summary = "Get medical record by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Medical record found"),
            @ApiResponse(responseCode = "404", description = "Medical record not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecordResponse> getMedicalRecordById(@PathVariable Long id) {
        MedicalRecordResponse response = medicalRecordService.getMedicalRecordById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Update medical record by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Medical record updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Medical record not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecordResponse> updateMedicalRecord(
            @PathVariable Long id,
            @Valid @RequestBody MedicalRecordRequest request) {
        MedicalRecordResponse response = medicalRecordService.updateMedicalRecord(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Delete medical record by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Medical record deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Medical record not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalRecord(@PathVariable Long id) {
        medicalRecordService.deleteMedicalRecord(id);
        return ResponseEntity.noContent().build();
    }
    @Operation(summary = "Get medical records by patient ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of medical records retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "No medical records found for the given patient ID")
    })
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecordResponse>> getMedicalRecordsByPatientId(@PathVariable Long patientId) {
        List<MedicalRecordResponse> records = medicalRecordService.getMedicalRecordsByPatientId(patientId);
        return ResponseEntity.ok(records);
    }
}
