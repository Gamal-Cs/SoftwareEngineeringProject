package com.shaltout.medicalsystem.repository;

import com.shaltout.medicalsystem.entities.Patient;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

}
/*

@Repository
public class PatientRepository {

    @Autowired
    private EntityManager entityManager;

    public Patient findByName(String name) {
        return entityManager.createNamedQuery("Patient.findByNameNative", Patient.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    public Patient findById(Long patientId){
        return entityManager.createNamedQuery("Patient.findByIdNative", Patient.class)
                .setParameter("patientId", patientId)
                .getSingleResult();
    }
}*/