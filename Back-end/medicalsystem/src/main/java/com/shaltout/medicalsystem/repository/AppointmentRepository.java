package com.shaltout.medicalsystem.repository;

import com.shaltout.medicalsystem.entities.Appointment;
import com.shaltout.medicalsystem.entities.Doctor;
import com.shaltout.medicalsystem.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Appointment findByPatientId(Long patientId);

    Appointment findByDoctorId(Long doctorId);

    List<Appointment> findByPatient(Patient patient);

    List<Appointment> findByDoctor(Doctor doctor);
}