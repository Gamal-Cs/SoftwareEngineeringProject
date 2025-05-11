package com.shaltout.medicalsystem.repository;

import com.shaltout.medicalsystem.entities.Bill;
import com.shaltout.medicalsystem.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    List<Bill> findByPatient(Patient patient);
}
/*
*
*
@Repository
public class BillRepository {

    @Autowired
    private EntityManager entityManager;

    public Bill findByPatientId(Long patientId) {
        return entityManager.createNamedQuery("Bill.findByPatientIdNative", Bill.class)
                .setParameter("patientId", patientId)
                .getSingleResult();
    }

    public Bill findById(Long billId) {
        return entityManager.createNamedQuery("Bill.findByIdNative", Bill.class)
                .setParameter("billId", billId)
                .getSingleResult();
    }
}*/