package com.shaltout.medicalsystem.service.user;

import com.shaltout.medicalsystem.dtos.user.UserRequest;
import com.shaltout.medicalsystem.dtos.user.UserResponse;
import com.shaltout.medicalsystem.enums.Role;
import jakarta.transaction.Transactional;

import java.util.List;

public interface IUserService {

    UserResponse createUser(UserRequest request);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse updateUser(Long id, UserRequest request);

    void deleteUser(Long id);

    List<Role> getAllRoles();
}
