package com.shaltout.medicalsystem.repository;

import com.shaltout.medicalsystem.entities.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

}
/*
*
* @Repository
public class MedicalRecordRepository {

    @Autowired
    private EntityManager entityManager;

    public MedicalRecord findByPatientId(Long patientId) {
        return entityManager.createNamedQuery("MedicalRecord.findByPatientIdNative", MedicalRecord.class)
                .setParameter("patientId", patientId)
                .getSingleResult();
    }

    public MedicalRecord findById(Long recordId) {
        return entityManager.createNamedQuery("MedicalRecord.findByIdNative", MedicalRecord.class)
                .setParameter("recordId", recordId)
                .getSingleResult();
    }
}*/