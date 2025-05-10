package com.shaltout.medicalsystem.dtos.patient;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PatientResponse {

    private Long id;

    private Long userId;

    private String userFirstName;

    private String userLastName;

    private String userEmail;

    private LocalDate dateOfBirth;

    private String nationalId;
}
