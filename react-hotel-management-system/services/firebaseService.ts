import { User, Room, Reservation, RoomType, RoomFeature, Product } from '../types';

// A mock user that is always "logged in"
const mockAdminUser: User = { id: 'admin-user', email: 'admin@hotel.com' };

// --- MOCK DATABASE ---
let mockRooms: Room[] = [];

let mockReservations: Reservation[] = [];

let mockProducts: Product[] = [];

const simulateDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- AUTH MOCK FUNCTIONS ---
// No authentication, always return the mock admin user.
export const getCurrentUser = async (): Promise<User | null> => {
  await simulateDelay(100);
  return mockAdminUser;
};


// --- ROOMS MOCK FUNCTIONS ---
export interface RoomFilters {
    type?: RoomType | '';
    availability?: 'available' | 'all';
    features?: RoomFeature[];
}

export interface RoomSort {
    key: 'pricePerNight' | 'type';
    order: 'asc' | 'desc';
}

export const getRooms = async (filters: RoomFilters = {}, sort: RoomSort = {key: 'pricePerNight', order: 'asc'}): Promise<Room[]> => {
    await simulateDelay(700);
    let rooms = [...mockRooms];

    // Filtering
    if (filters.type) {
        rooms = rooms.filter(r => r.type === filters.type);
    }
    if (filters.availability === 'available') {
        rooms = rooms.filter(r => r.isAvailable);
    }
    if (filters.features && filters.features.length > 0) {
        rooms = rooms.filter(r => filters.features!.every(f => r.features.includes(f)));
    }

    // Sorting
    rooms.sort((a, b) => {
        if (sort.key === 'pricePerNight') {
            return sort.order === 'asc' ? a.pricePerNight - b.pricePerNight : b.pricePerNight - a.pricePerNight;
        }
        if (sort.key === 'type') {
            return sort.order === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
        }
        return 0;
    });

    return rooms;
};


export const getRoomById = async (roomId: string): Promise<Room | undefined> => {
    await simulateDelay(200);
    return mockRooms.find(r => r.id === roomId);
};

export const addRoom = async (roomData: Omit<Room, 'id' | 'isAvailable'>): Promise<Room> => {
    await simulateDelay(500);
    const newRoom: Room = {
        ...roomData,
        id: `room-${Date.now()}`,
        isAvailable: true,
    };
    mockRooms.push(newRoom);
    return newRoom;
};

// --- RESERVATIONS MOCK FUNCTIONS ---
export const getReservationsForUser = async (userId: string): Promise<Reservation[]> => {
    await simulateDelay(600);
    const userReservations = mockReservations.filter(r => r.userId === userId);
    const populatedReservations = await Promise.all(
        userReservations.map(async res => {
            const room = await getRoomById(res.roomId);
            return { ...res, room };
        })
    );
    return populatedReservations;
};

export const getReservationById = async (reservationId: string): Promise<Reservation | undefined> => {
    await simulateDelay(300);
    return mockReservations.find(r => r.id === reservationId);
}

export const addReservation = async (reservation: Omit<Reservation, 'id'>): Promise<Reservation> => {
    await simulateDelay(800);
    const newReservation: Reservation = { ...reservation, id: `res-${Date.now()}` };
    mockReservations.push(newReservation);
    
    // Mark room as unavailable
    mockRooms = mockRooms.map(room => room.id === reservation.roomId ? { ...room, isAvailable: false } : room);

    return newReservation;
};

export const updateReservation = async (reservationId: string, updates: Partial<Reservation>): Promise<Reservation> => {
    await simulateDelay(800);
    let reservation = mockReservations.find(r => r.id === reservationId);
    if (!reservation) throw new Error('Reservation not found');

    reservation = { ...reservation, ...updates };
    mockReservations = mockReservations.map(r => r.id === reservationId ? reservation! : r);
    return reservation;
};

export const deleteReservation = async (reservationId: string): Promise<void> => {
    await simulateDelay(500);
    const reservation = mockReservations.find(r => r.id === reservationId);
    if (!reservation) throw new Error('Reservation not found');
    
    // Mark room as available again
    mockRooms = mockRooms.map(room => room.id === reservation.roomId ? { ...room, isAvailable: true } : room);
    
    mockReservations = mockReservations.filter(r => r.id !== reservationId);
};

// --- PRODUCTS MOCK FUNCTIONS ---
export const getProducts = async (): Promise<Product[]> => {
    await simulateDelay(700);
    // Returning a copy to prevent direct mutation of the mock db array
    return [...mockProducts];
};

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    await simulateDelay(500);
    const newProduct: Product = {
        ...productData,
        id: `prod-${Date.now()}`,
    };
    mockProducts.push(newProduct);
    return newProduct;
};
