package com.shaltout.medicalsystem.dtos;

import lombok.Data;

@Data
public class AppointmentDTO {
    private Long id;
    private String patientName;
    private String doctorName;
    private String appointmentDate;
    private String status;

}
