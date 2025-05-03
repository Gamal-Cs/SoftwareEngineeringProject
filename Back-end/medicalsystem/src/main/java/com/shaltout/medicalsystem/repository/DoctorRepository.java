package com.shaltout.medicalsystem.repository;

import com.shaltout.medicalsystem.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

}
//@Repository
//public class DoctorRepository {
//
//    @Autowired
//    private EntityManager entityManager;
//
//    public Doctor findBySpecialization(String specialization) {
//        return entityManager.createNamedQuery("Doctor.findBySpecializationNative", Doctor.class)
//                .setParameter("specialization", specialization)
//                .getSingleResult();
//    }
//
//    public Doctor findById(Long doctorId) {
//        return entityManager.createNamedQuery("Doctor.findByIdNative", Doctor.class)
//                .setParameter("doctorId", doctorId)
//                .getSingleResult();
//    }
//}