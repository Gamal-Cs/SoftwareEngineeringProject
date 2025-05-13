import { AppointmentResponse } from '@/services/appointmentService';
import { MedicalRecordResponse } from '@/services/medicalRecordService';
import { BillResponse } from '@/services/billService';

export type Appointment = AppointmentResponse;
export type MedicalRecord = MedicalRecordResponse;
export type Bill = BillResponse;

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: number;
  userId: number;
  specialization: string;
  licenseNumber: string;
  user: User;
}

export interface Patient {
  id: number;
  userId: number;
  dateOfBirth: string;
  gender: string;
  bloodType?: string;
  allergies?: string[];
  user: User;
} 