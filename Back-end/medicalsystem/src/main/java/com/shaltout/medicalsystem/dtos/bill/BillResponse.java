package com.shaltout.medicalsystem.dtos.bill;

import com.shaltout.medicalsystem.enums.BillStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class BillResponse {

    private Long id;

    private Long patientId;

    private BigDecimal amount;

    private LocalDate issueDate;

    private LocalDate dueDate;

    private BillStatus status;

    private List<Long> paymentIds;
}
