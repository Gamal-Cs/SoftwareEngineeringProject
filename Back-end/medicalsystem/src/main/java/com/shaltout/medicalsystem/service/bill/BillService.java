package com.shaltout.medicalsystem.service.bill;

import com.shaltout.medicalsystem.dtos.bill.BillRequest;
import com.shaltout.medicalsystem.dtos.bill.BillResponse;
import com.shaltout.medicalsystem.entities.Bill;
import com.shaltout.medicalsystem.entities.Patient;
import com.shaltout.medicalsystem.exceptions.ResourceNotFoundException;
import com.shaltout.medicalsystem.repository.BillRepository;
import com.shaltout.medicalsystem.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillService implements IBillService {

    private final BillRepository billRepository;
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    @Override
    public BillResponse createBill(BillRequest request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", request.getPatientId()));

        Bill bill = new Bill();
        bill.setPatient(patient);
        bill.setAmount(request.getAmount());
        bill.setIssueDate(request.getIssueDate());
        bill.setDueDate(request.getDueDate());
        bill.setStatus(request.getStatus());

        Bill savedBill = billRepository.save(bill);
        return mapToResponse(savedBill);
    }

    @Override
    public List<BillResponse> getAllBills() {
        return billRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BillResponse getBillById(Long id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bill", "id", id));
        return mapToResponse(bill);
    }

    @Override
    public BillResponse updateBill(Long id, BillRequest request) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bill", "id", id));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", request.getPatientId()));

        bill.setPatient(patient);
        bill.setAmount(request.getAmount());
        bill.setIssueDate(request.getIssueDate());
        bill.setDueDate(request.getDueDate());
        bill.setStatus(request.getStatus());

        Bill updatedBill = billRepository.save(bill);
        return mapToResponse(updatedBill);
    }

    @Override
    public void deleteBill(Long id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bill", "id", id));
        billRepository.delete(bill);
    }

    @Override
    public List<BillResponse> getBillsByPatientId(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", patientId));
        return billRepository.findByPatient(patient)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private BillResponse mapToResponse(Bill bill) {
        BillResponse response = modelMapper.map(bill, BillResponse.class);

        // Map payment IDs for simplicity; you can extend to payment summaries if needed
        if (bill.getPayments() != null) {
            response.setPaymentIds(
                    bill.getPayments().stream()
                            .map(payment -> payment.getId())
                            .collect(Collectors.toList())
            );
        }

        return response;
    }
}
