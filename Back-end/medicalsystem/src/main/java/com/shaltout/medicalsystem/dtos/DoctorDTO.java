package com.shaltout.medicalsystem.dtos;

import lombok.Data;

@Data
public class DoctorDTO {
    private Long id;
    private String name;
    private String specialization;
}