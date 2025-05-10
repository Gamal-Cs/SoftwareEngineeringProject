package com.shaltout.medicalsystem.service.bill;

import com.shaltout.medicalsystem.dtos.bill.BillRequest;
import com.shaltout.medicalsystem.dtos.bill.BillResponse;

import java.util.List;

public interface IBillService {

    BillResponse createBill(BillRequest request);

    List<BillResponse> getAllBills();

    BillResponse getBillById(Long id);

    BillResponse updateBill(Long id, BillRequest request);

    void deleteBill(Long id);
}
