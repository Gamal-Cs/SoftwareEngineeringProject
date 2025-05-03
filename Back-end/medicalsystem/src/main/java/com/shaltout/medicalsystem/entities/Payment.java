package com.shaltout.medicalsystem.entities;

import com.shaltout.medicalsystem.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@Entity
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "Payment.findByPatientIdNative",
                query = "SELECT * FROM payments WHERE patient_id = :patientId",
                resultClass = Payment.class
        ),
        @NamedNativeQuery(
                name = "Payment.findByIdNative",
                query = "SELECT * FROM payments WHERE id = :paymentId",
                resultClass = Payment.class
        )
})
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime paymentDate;

    private String method; // e.g. "CASH", "CREDIT_CARD", "PAYPAL", etc.

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String transactionId;

    @OneToOne
    @JoinColumn(name = "bill_id")
    private Bill bill;

    // Getters and setters (or use Lombok)
}