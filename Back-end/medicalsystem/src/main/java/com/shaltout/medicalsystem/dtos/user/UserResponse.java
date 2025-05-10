package com.shaltout.medicalsystem.dtos.user;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UserResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String userName;

    private String email;

    private Set<String> roles;

    private Long patientProfileId;

    private Long doctorProfileId;
}
