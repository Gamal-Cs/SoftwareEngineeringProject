package com.shaltout.medicalsystem.entities;

import com.shaltout.medicalsystem.enums.BillStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter @Setter
//@NamedNativeQueries({
//        @NamedNativeQuery(
//                name = "Bill.findByPatientIdNative",
//                query = "SELECT * FROM bills WHERE patient_id = :patientId",
//                resultClass = Bill.class
//        ),
//        @NamedNativeQuery(
//                name = "Bill.findByIdNative",
//                query = "SELECT * FROM bills WHERE id = :billId",
//                resultClass = Bill.class
//        )
//})
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Patient patient;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private LocalDate issueDate;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BillStatus status;

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payments;
}
