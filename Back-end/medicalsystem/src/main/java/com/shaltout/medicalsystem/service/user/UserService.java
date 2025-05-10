package com.shaltout.medicalsystem.service.user;

import com.shaltout.medicalsystem.dtos.user.UserRequest;
import com.shaltout.medicalsystem.dtos.user.UserResponse;
import com.shaltout.medicalsystem.entities.User;
import com.shaltout.medicalsystem.enums.Role;
import com.shaltout.medicalsystem.exceptions.ResourceNotFoundException;
import com.shaltout.medicalsystem.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public UserResponse createUser(UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new IllegalArgumentException("Username is already taken");
        }

        // Map UserRequest to User entity
        User user = modelMapper.map(request, User.class);

        // Encode password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Set roles
        Set<Role> roles = request.getRoles();
        user.setRoles(roles);

        User saved = userRepository.save(user);

        // Map User entity to UserResponse DTO
        return modelMapper.map(saved, UserResponse.class);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return modelMapper.map(user, UserResponse.class);
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        modelMapper.map(request, user);

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if (request.getRoles() != null) {
            Set<Role> roles = request.getRoles();
            user.setRoles(roles);
        }
        User updated = userRepository.save(user);
        return modelMapper.map(updated, UserResponse.class);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(user);
    }

    @Transactional
    @Override
    public void upgradeUserRole(Long userId, Role roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRoles().contains(roleName)) {
            user.getRoles().add(roleName);
            userRepository.save(user);
        }
    }
}
