package com.shaltout.medicalsystem.entities;

import com.shaltout.medicalsystem.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
//
//@NamedNativeQueries({
//        @NamedNativeQuery(
//                name = "Payment.findByPatientIdNative",
//                query = "SELECT * FROM payments WHERE patient_id = :patientId",
//                resultClass = Payment.class
//        ),
//        @NamedNativeQuery(
//                name = "Payment.findByIdNative",
//                query = "SELECT * FROM payments WHERE id = :paymentId",
//                resultClass = Payment.class
//        )
//})
@Entity
@Getter
@Setter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Payment linked to a Patient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bill_id") // foreign key column for Bill
    private Bill bill;

    private Double amount;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    private String paymentMethod;  // e.g., "Credit Card", "PayPal", "Cash"

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String transactionId; // External payment gateway transaction reference
}
