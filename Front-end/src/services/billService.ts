import { api } from './api';

export interface BillItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BillRequest {
  patientId: number;
  amount: number;
  description: string;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  items: BillItem[];
  paymentMethod?: string;
  notes?: string;
}

export interface BillResponse {
  id: number;
  patientId: number;
  amount: number;
  description: string;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  items: BillItem[];
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  patient?: {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
}

export const billService = {
  // Create a new bill
  createBill: async (request: BillRequest): Promise<BillResponse> => {
    try {
      const response = await api.post<BillResponse>('/bills', request);
      return response.data;
    } catch (error) {
      console.error('Error creating bill:', error);
      throw error;
    }
  },

  // Get all bills
  getAllBills: async (): Promise<BillResponse[]> => {
    try {
      const response = await api.get<BillResponse[]>('/bills');
      return response.data;
    } catch (error) {
      console.error('Error fetching bills:', error);
      throw error;
    }
  },

  // Get bill by ID
  getBillById: async (id: number): Promise<BillResponse> => {
    try {
      const response = await api.get<BillResponse>(`/bills/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bill ${id}:`, error);
      throw error;
    }
  },

  // Update a bill
  updateBill: async (id: number, request: BillRequest): Promise<BillResponse> => {
    try {
      const response = await api.put<BillResponse>(`/bills/${id}`, request);
      return response.data;
    } catch (error) {
      console.error(`Error updating bill ${id}:`, error);
      throw error;
    }
  },

  // Delete a bill
  deleteBill: async (id: number): Promise<void> => {
    try {
      await api.delete(`/bills/${id}`);
    } catch (error) {
      console.error(`Error deleting bill ${id}:`, error);
      throw error;
    }
  },

  // Get bills by patient ID
  getBillsByPatientId: async (patientId: number): Promise<BillResponse[]> => {
    try {
      const response = await api.get<BillResponse[]>(`/bills/patient/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bills for patient ${patientId}:`, error);
      throw error;
    }
  },

  getBillsByStatus: async (status: string): Promise<BillResponse[]> => {
    try {
      const response = await api.get<BillResponse[]>(`/bills/status/${status}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bills with status ${status}:`, error);
      throw error;
    }
  },

  markBillAsPaid: async (id: number, paymentMethod: string): Promise<BillResponse> => {
    try {
      const response = await api.post<BillResponse>(`/bills/${id}/pay`, { paymentMethod });
      return response.data;
    } catch (error) {
      console.error(`Error marking bill ${id} as paid:`, error);
      throw error;
    }
  }
}; 