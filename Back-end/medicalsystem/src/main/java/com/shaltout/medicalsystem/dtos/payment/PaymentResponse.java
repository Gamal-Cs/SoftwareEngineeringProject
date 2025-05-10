package com.shaltout.medicalsystem.dtos.payment;

import com.shaltout.medicalsystem.enums.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PaymentResponse {

    private Long id;

    private Long patientId;

    private Double amount;

    private LocalDateTime paymentDate;

    private String paymentMethod;

    private PaymentStatus status;

    private String transactionId;
}
