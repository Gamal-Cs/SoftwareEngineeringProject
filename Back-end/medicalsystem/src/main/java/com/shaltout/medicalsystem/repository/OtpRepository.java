package com.shaltout.medicalsystem.repository;

import com.shaltout.medicalsystem.entities.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpRepository extends JpaRepository<Otp, String> {

}
