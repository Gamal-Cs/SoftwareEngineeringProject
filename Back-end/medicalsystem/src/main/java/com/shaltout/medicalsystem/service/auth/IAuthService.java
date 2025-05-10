package com.shaltout.medicalsystem.service.auth;

import com.shaltout.medicalsystem.dtos.auth.AuthRequest;
import com.shaltout.medicalsystem.dtos.auth.AuthResponse;
import com.shaltout.medicalsystem.dtos.auth.RegisterRequest;

public interface IAuthService {

    AuthResponse login(AuthRequest request);

    void register(RegisterRequest request);
}
