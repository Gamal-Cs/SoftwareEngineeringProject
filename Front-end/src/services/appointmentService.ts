import { api } from './api';

export interface AppointmentRequest {
  patientId: number;
  doctorId: number;
  startTime: string;
  endTime: string;
  appointmentDate: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

export interface AppointmentResponse {
  id: number;
  patientId: number;
  doctorId: number;
  startTime: string;
  endTime: string;
  appointmentDate: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  patient?: {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  doctor?: {
    id: number;
    firstName: string;
    lastName: string;
    specialization: string;
  };
}

export const appointmentService = {
  // Create a new appointment
  createAppointment: async (request: AppointmentRequest): Promise<AppointmentResponse> => {
    try {
      const response = await api.post<AppointmentResponse>('/appointments', request);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  // Get all appointments
  getAllAppointments: async (): Promise<AppointmentResponse[]> => {
    try {
      const response = await api.get<AppointmentResponse[]>('/appointments');
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  // Get appointment by ID
  getAppointmentById: async (id: number): Promise<AppointmentResponse> => {
    try {
      const response = await api.get<AppointmentResponse>(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error);
      throw error;
    }
  },

  // Update an appointment
  updateAppointment: async (id: number, request: AppointmentRequest): Promise<AppointmentResponse> => {
    try {
      const response = await api.put<AppointmentResponse>(`/appointments/${id}`, request);
      return response.data;
    } catch (error) {
      console.error(`Error updating appointment ${id}:`, error);
      throw error;
    }
  },

  // Delete an appointment
  deleteAppointment: async (id: number): Promise<void> => {
    try {
      await api.delete(`/appointments/${id}`);
    } catch (error) {
      console.error(`Error deleting appointment ${id}:`, error);
      throw error;
    }
  },

  // Get appointments by patient ID
  getAppointmentsByPatientId: async (patientId: number): Promise<AppointmentResponse[]> => {
    try {
      const response = await api.get<AppointmentResponse[]>(`/appointments/patient/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointments for patient ${patientId}:`, error);
      throw error;
    }
  },

  // Get appointments by doctor ID
  getAppointmentsByDoctorId: async (doctorId: number): Promise<AppointmentResponse[]> => {
    try {
      const response = await api.get<AppointmentResponse[]>(`/appointments/doctor/${doctorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointments for doctor ${doctorId}:`, error);
      throw error;
    }
  },

  getAppointmentsByDate: async (date: string): Promise<AppointmentResponse[]> => {
    try {
      const response = await api.get<AppointmentResponse[]>(`/appointments/date/${date}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointments for date ${date}:`, error);
      throw error;
    }
  }
}; 