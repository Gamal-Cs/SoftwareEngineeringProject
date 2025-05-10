package com.shaltout.medicalsystem.dtos.payment;

import com.shaltout.medicalsystem.enums.PaymentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotNull(message = "Amount is required")
    private Double amount;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;

    private PaymentStatus status; // Optional: can be set by system or client

    private String transactionId; // Optional: if available from payment gateway
}
