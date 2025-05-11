package com.shaltout.medicalsystem.service.payment;

import com.shaltout.medicalsystem.dtos.payment.PaymentRequest;
import com.shaltout.medicalsystem.dtos.payment.PaymentResponse;

import java.util.List;

public interface IPaymentService {
    PaymentResponse createPayment(PaymentRequest request);
    List<PaymentResponse> getAllPayments();
    PaymentResponse getPaymentById(Long id);
    PaymentResponse updatePayment(Long id, PaymentRequest request);

    List<PaymentResponse> getPaymentsByPatientId(Long patientId);
}
