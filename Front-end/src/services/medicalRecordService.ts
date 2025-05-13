import { api } from './api';

export interface MedicalRecordRequest {
  patientId: number;
  doctorId: number;
  diagnosis: string;
  treatment: string;
  notes?: string;
  prescription?: string;
  followUpDate?: string;
  symptoms?: string[];
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
}

export interface MedicalRecordResponse {
  id: number;
  patientId: number;
  doctorId: number;
  diagnosis: string;
  treatment: string;
  notes?: string;
  prescription?: string;
  followUpDate?: string;
  symptoms?: string[];
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  createdAt: string;
  updatedAt: string;
  patient?: {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
  };
  doctor?: {
    id: number;
    firstName: string;
    lastName: string;
    specialization: string;
  };
}

export const medicalRecordService = {
  // Create a new medical record
  createMedicalRecord: async (request: MedicalRecordRequest): Promise<MedicalRecordResponse> => {
    try {
      const response = await api.post<MedicalRecordResponse>('/medical-records', request);
      return response.data;
    } catch (error) {
      console.error('Error creating medical record:', error);
      throw error;
    }
  },

  // Get all medical records
  getAllMedicalRecords: async (): Promise<MedicalRecordResponse[]> => {
    try {
      const response = await api.get<MedicalRecordResponse[]>('/medical-records');
      return response.data;
    } catch (error) {
      console.error('Error fetching medical records:', error);
      throw error;
    }
  },

  // Get medical record by ID
  getMedicalRecordById: async (id: number): Promise<MedicalRecordResponse> => {
    try {
      const response = await api.get<MedicalRecordResponse>(`/medical-records/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching medical record ${id}:`, error);
      throw error;
    }
  },

  // Update a medical record
  updateMedicalRecord: async (id: number, request: MedicalRecordRequest): Promise<MedicalRecordResponse> => {
    try {
      const response = await api.put<MedicalRecordResponse>(`/medical-records/${id}`, request);
      return response.data;
    } catch (error) {
      console.error(`Error updating medical record ${id}:`, error);
      throw error;
    }
  },

  // Delete a medical record
  deleteMedicalRecord: async (id: number): Promise<void> => {
    try {
      await api.delete(`/medical-records/${id}`);
    } catch (error) {
      console.error(`Error deleting medical record ${id}:`, error);
      throw error;
    }
  },

  // Get medical records by patient ID
  getMedicalRecordsByPatientId: async (patientId: number): Promise<MedicalRecordResponse[]> => {
    try {
      const response = await api.get<MedicalRecordResponse[]>(`/medical-records/patient/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching medical records for patient ${patientId}:`, error);
      throw error;
    }
  },

  getMedicalRecordsByDoctorId: async (doctorId: number): Promise<MedicalRecordResponse[]> => {
    try {
      const response = await api.get<MedicalRecordResponse[]>(`/medical-records/doctor/${doctorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching medical records for doctor ${doctorId}:`, error);
      throw error;
    }
  }
}; 