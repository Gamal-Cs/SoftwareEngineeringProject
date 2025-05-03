package com.shaltout.medicalsystem.repository;

import com.shaltout.medicalsystem.entities.Appointment;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Appointment findByPatientId(Long patientId);

    Appointment findByDoctorId(Long doctorId);
}
//
//@Repository
//public class AppointmentRepositoryCustom {
//
//    @Autowired
//    private EntityManager entityManager;
//
//    public Appointment findByPatientId(Long patientId) {
//        return entityManager.createNamedQuery("Appointment.findByPatientIdNative", Appointment.class)
//                .setParameter("patientId", patientId)
//                .getSingleResult();
//    }
//
//    public Appointment findByDoctorId(Long doctorId) {
//        return entityManager.createNamedQuery("Appointment.findByDoctorIdNative", Appointment.class)
//                .setParameter("doctorId", doctorId)
//                .getSingleResult();
//    }
//}