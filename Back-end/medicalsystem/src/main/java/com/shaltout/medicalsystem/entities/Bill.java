package com.shaltout.medicalsystem.entities;

import com.shaltout.medicalsystem.enums.BillStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter @Setter
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "Bill.findByPatientIdNative",
                query = "SELECT * FROM bills WHERE patient_id = :patientId",
                resultClass = Bill.class
        ),
        @NamedNativeQuery(
                name = "Bill.findByIdNative",
                query = "SELECT * FROM bills WHERE id = :billId",
                resultClass = Bill.class
        )
})
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal amount;

    private LocalDate issueDate;

    @Enumerated(EnumType.STRING)
    private BillStatus status;

    private String description;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @OneToOne(mappedBy = "bill", cascade = CascadeType.ALL)
    private Payment payment;

}