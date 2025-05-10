package com.shaltout.medicalsystem.dtos.patient;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PatientRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @NotBlank(message = "National ID is required")
    @Size(max = 50, message = "National ID must be at most 50 characters")
    private String nationalId;
}
