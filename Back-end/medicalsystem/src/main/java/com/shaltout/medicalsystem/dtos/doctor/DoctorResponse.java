package com.shaltout.medicalsystem.dtos.doctor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorResponse {

    private Long id;
    private Long userId;
    private String userFirstName;
    private String userLastName;
    private String specialization;
    private String licenseNumber;
}
