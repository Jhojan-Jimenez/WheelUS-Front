import { z } from 'zod';
import {
  userLogSchema,
  userModifySchema,
  userRegSchema,
  vehicleModifySchema,
  vehicleRegSchema,
} from './formValidators';

export type userRegData = z.infer<typeof userRegSchema>;
export type userLogData = z.infer<typeof userLogSchema>;
export type userModifyData = z.infer<typeof userModifySchema>;
export type vehicleRegData = z.infer<typeof vehicleRegSchema>;
export type vehicelModifyData = z.infer<typeof vehicleModifySchema>;
export interface AuthContextType {
  user: UserSchema | null;
  vehicle: VehicleSchema | null;
  setUser: (user: UserSchema) => void;
  signup: (data: userRegData) => Promise<void>;
  signin: ({ email, password }: userLogData) => Promise<void>;
  signout: () => void;
  refreshUser: () => Promise<void>;
}
export interface RoleContextType {
  currentRole: 'passenger' | 'driver';
  setCurrentRole: (role: 'passenger' | 'driver') => void;
}

export interface UserSchema {
  id: string;
  contact: string;
  email: string;
  lastname: string;
  name: string;
  notifications?: NotificationSchema[];
  password: string;
  photo?: string;
  rides: RideSchema[];
  vehicle_plate: string;
}

export interface NotificationSchema {
  type: string;
  content: string;
  timestamp: Date;
}

export interface RideSchema {
  id: string;
  available_seats: number;
  departure: string;
  destination: string;
  fee: number;
  isActive: boolean;
  origin: string;
  route: string[];
  vehicle_plate: string;
  point?: string;
  passengers?: RidePassangerSchema[];
}
export interface CreateRideSchema {
  available_seats: number;
  departure: Date;
  destination: string;
  fee: number;
  origin: string;
  route: string[];
  vehicle_plate: string;
}
export interface VehicleSchema {
  SOAT: string;
  brand: string;
  id_driver: string;
  model: string;
  photo: string;
  plate: string;
  rides: string[];
  seats: string;
}

export interface RidesParams {
  spots: number;
  start: string;
  end: string;
  page: number;
}

export interface MessageSchema {
  chatId: number;
  receiverId: string;
  senderId: string;
  content: string;
  timestamp: FirestoreTimestamp;
}
export interface ChatSchema {
  chatId: string;
  users: string[];
  createdAt: FirestoreTimestamp;
  unreadCounts: {
    [userId: string]: number;
  };
  lastMessage: string;
  lastMessageTimestamp: FirestoreTimestamp;
}

export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}
export interface RidePassangerSchema {
  userId: string;
  cantidad: number;
  arrivalPoint: string[];
}
