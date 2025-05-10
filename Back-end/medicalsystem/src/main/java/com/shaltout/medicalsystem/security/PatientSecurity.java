package com.shaltout.medicalsystem.security;

import org.springframework.security.core.Authentication;
import com.shaltout.medicalsystem.entities.Patient;
import com.shaltout.medicalsystem.entities.User;
import com.shaltout.medicalsystem.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("patientSecurity")
@RequiredArgsConstructor
public class PatientSecurity {

    private final PatientRepository patientRepository;

    public boolean isOwner(Authentication authentication, Long patientId) {
        String currentUserEmail = authentication.getName(); // get logged-in username/email
        Patient patient = patientRepository.findById(patientId).orElse(null);
        if (patient == null) return false; // resource not found

        User user = patient.getUser();
        return user != null && user.getEmail().equals(currentUserEmail);
    }
}
