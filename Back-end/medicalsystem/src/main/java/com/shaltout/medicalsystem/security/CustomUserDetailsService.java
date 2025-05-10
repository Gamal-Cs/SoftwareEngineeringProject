package com.shaltout.medicalsystem.security;

import com.shaltout.medicalsystem.entities.User;
import com.shaltout.medicalsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String emailOrPhoneNumber) throws UsernameNotFoundException {
        User user = userRepository.findByEmailOrPhoneNumber(emailOrPhoneNumber)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email: " + emailOrPhoneNumber)
                );
        return new UserPrincipal(user);
    }
}
