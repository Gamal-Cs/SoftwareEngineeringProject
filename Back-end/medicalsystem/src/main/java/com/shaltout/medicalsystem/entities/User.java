package com.shaltout.medicalsystem.entities;

import jakarta.persistence.*;
import com.shaltout.medicalsystem.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter @Setter

@NamedNativeQueries({
        @NamedNativeQuery(
                name = "User.findByUsernameNative",
                query = "SELECT * FROM users WHERE username = :username",
                resultClass = User.class
        ),
        @NamedNativeQuery(
                name = "User.findByEmailNative",
                query = "SELECT * FROM users WHERE email = :email",
                resultClass = User.class
        )
})

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    @Email
    @NotBlank(message = "Email is required")
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean enabled = true;

    // Relationships (optional - if user links to doctor or patient)
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Doctor doctor;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Patient patient;

}
