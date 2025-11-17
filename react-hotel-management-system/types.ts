
export interface User {
  id: string;
  email: string;
}

export enum RoomType {
  SINGLE = 'Single',
  DOUBLE = 'Double',
  SUITE = 'Suite',
  PENTHOUSE = 'Penthouse'
}

export enum RoomFeature {
  WIFI = 'WiFi',
  TV = 'TV',
  AC = 'Air Conditioning',
  BALCONY = 'Balcony',
  OCEAN_VIEW = 'Ocean View',
}

export interface Room {
  id: string;
  roomNumber: number;
  type: RoomType;
  pricePerNight: number;
  isAvailable: boolean;
  features: RoomFeature[];
  imageUrl: string;
  description: string;
}

export interface Reservation {
  id: string;
  userId: string;
  roomId: string;
  checkInDate: string; // ISO string format YYYY-MM-DD
  checkOutDate: string; // ISO string format YYYY-MM-DD
  guests: number;
  room?: Room; // Optional: populated for display
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}
