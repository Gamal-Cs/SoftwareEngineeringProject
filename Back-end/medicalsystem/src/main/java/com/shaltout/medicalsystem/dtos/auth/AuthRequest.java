package com.shaltout.medicalsystem.dtos.auth;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {

    @Email(message = "Email should be valid")
    @Nullable
    private String email;

    @NotBlank(message = "mobile is required")
    private String mobile;

    @NotBlank(message = "Password is required")
    private String password;
}

