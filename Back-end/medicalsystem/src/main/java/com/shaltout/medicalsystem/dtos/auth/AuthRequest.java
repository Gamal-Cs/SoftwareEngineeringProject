package com.shaltout.medicalsystem.dtos.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {

    @NotBlank(message = "Username (email or phone number) is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;
}

