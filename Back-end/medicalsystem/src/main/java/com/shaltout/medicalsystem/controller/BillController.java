package com.shaltout.medicalsystem.controller;

import com.shaltout.medicalsystem.dtos.bill.BillRequest;
import com.shaltout.medicalsystem.dtos.bill.BillResponse;
import com.shaltout.medicalsystem.service.bill.IBillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("${api.prefix}/bills")
@RequiredArgsConstructor
@Tag(name = "Bill API", description = "Endpoints for managing bills")
public class BillController {

    private final IBillService billService;

    @Operation(summary = "Create a new bill", description = "Creates a new bill for a patient.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Bill created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PostMapping
    public ResponseEntity<BillResponse> createBill(@Valid @RequestBody BillRequest request) {
        BillResponse response = billService.createBill(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all bills", description = "Retrieves a list of all bills.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "List of bills retrieved successfully")
    })
    @GetMapping
    public ResponseEntity<List<BillResponse>> getAllBills() {
        List<BillResponse> bills = billService.getAllBills();
        return ResponseEntity.ok(bills);
    }

    @Operation(summary = "Get bill by ID", description = "Retrieve a single bill by its unique ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Bill found"),
            @ApiResponse(responseCode = "404", description = "Bill not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<BillResponse> getBillById(
            @Parameter(description = "ID of the bill to retrieve", required = true)
            @PathVariable Long id) {
        BillResponse response = billService.getBillById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Update a bill", description = "Update an existing bill by its ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Bill updated successfully"),
            @ApiResponse(responseCode = "404", description = "Bill not found"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PutMapping("/{id}")
    public ResponseEntity<BillResponse> updateBill(
            @Parameter(description = "ID of the bill to update", required = true)
            @PathVariable Long id,
            @Valid @RequestBody BillRequest request) {
        BillResponse response = billService.updateBill(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Delete a bill", description = "Delete an existing bill by its ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Bill deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Bill not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(
            @Parameter(description = "ID of the bill to delete", required = true)
            @PathVariable Long id) {
        billService.deleteBill(id);
        return ResponseEntity.noContent().build();
    }
    @Operation(summary = "Get bills by patient ID", description = "Retrieve all bills associated with a specific patient ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Bills found"),
            @ApiResponse(responseCode = "404", description = "No bills found for the given patient ID")
    })
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<BillResponse>> getBillsByPatientId(
            @Parameter(description = "ID of the patient to retrieve bills for", required = true)
            @PathVariable Long patientId) {
        List<BillResponse> bills = billService.getBillsByPatientId(patientId);
        return ResponseEntity.ok(bills);
    }
}
