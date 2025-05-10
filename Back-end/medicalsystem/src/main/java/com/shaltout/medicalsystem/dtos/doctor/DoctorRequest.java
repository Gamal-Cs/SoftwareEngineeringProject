package com.shaltout.medicalsystem.dtos.doctor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    @NotBlank(message = "License number is required")
    private String licenseNumber;
}
/*
userId
specialization
licenseNumber
 */