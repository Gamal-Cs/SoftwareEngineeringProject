package com.shaltout.medicalsystem.dtos.bill;

import com.shaltout.medicalsystem.enums.BillStatus;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class BillRequest {

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be positive")
    private BigDecimal amount;

    @NotNull(message = "Issue date is required")
    private LocalDate issueDate;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    @NotNull(message = "Bill status is required")
    private BillStatus status;
}
