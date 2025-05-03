package com.shaltout.medicalsystem.repository;

import com.shaltout.medicalsystem.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}

/*
*
*
@Repository
public class PaymentRepository {

    @Autowired
    private EntityManager entityManager;

    public Payment findByPatientId(Long patientId) {
        return entityManager.createNamedQuery("Payment.findByPatientIdNative", Payment.class)
                .setParameter("patientId", patientId)
                .getSingleResult();
    }

    public Payment findById(Long paymentId) {
        return entityManager.createNamedQuery("Payment.findByIdNative", Payment.class)
                .setParameter("paymentId", paymentId)
                .getSingleResult();
    }
}*/