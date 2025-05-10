package com.shaltout.medicalsystem.dtos.appointment;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AppointmentResponse {

    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime appointmentDate;
    private String status;

    private String patientFirstName;
    private String patientLastName;
    private String doctorFirstName;
    private String doctorLastName;
}
