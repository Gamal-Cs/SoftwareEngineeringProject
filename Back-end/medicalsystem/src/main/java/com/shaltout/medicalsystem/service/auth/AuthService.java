package com.shaltout.medicalsystem.service.auth;

import com.shaltout.medicalsystem.dtos.auth.AuthRequest;
import com.shaltout.medicalsystem.dtos.auth.AuthResponse;
import com.shaltout.medicalsystem.dtos.auth.RegisterRequest;
import com.shaltout.medicalsystem.entities.User;
import com.shaltout.medicalsystem.repository.UserRepository;
import com.shaltout.medicalsystem.security.JwtService;
import com.shaltout.medicalsystem.security.UserPrincipal;
import com.shaltout.medicalsystem.service.email.EmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        if (authentication == null) {
            throw new BadCredentialsException("Invalid email or password");
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String token = jwtService.generateToken(userPrincipal);
        return new AuthResponse(token);
    }

    @Override
    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmailOrPhoneNumber(request.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUserName(request.getUserName());
        user.setRoles(request.getRole());
        userRepository.save(user);
        emailService.sendGreetingEmail(request.getEmail(), request.getUserName());
    }
}
