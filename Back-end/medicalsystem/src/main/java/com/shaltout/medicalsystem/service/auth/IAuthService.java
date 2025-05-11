package com.shaltout.medicalsystem.service.auth;

import com.shaltout.medicalsystem.dtos.auth.AuthRequest;
import com.shaltout.medicalsystem.dtos.auth.AuthResponse;
import com.shaltout.medicalsystem.dtos.auth.RegisterRequest;
import com.shaltout.medicalsystem.dtos.user.UserResponse;
import com.shaltout.medicalsystem.security.UserPrincipal;

public interface IAuthService {

    AuthResponse login(AuthRequest request);

    void register(RegisterRequest request);

    UserResponse getCurrentUser();
}
