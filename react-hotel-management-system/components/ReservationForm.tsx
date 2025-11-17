
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Reservation, Room } from '../types';
import { useAuth } from '../hooks/useAuth';
import * as firebaseService from '../services/firebaseService';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Spinner } from './ui/Spinner';

const ReservationForm: React.FC = () => {
  const { roomId, reservationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [room, setRoom] = useState<Room | null>(null);

  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(reservationId);

  const loadData = useCallback(async () => {
    setFormLoading(true);
    setError(null);
    try {
        if (isEditing) {
            const reservation = await firebaseService.getReservationById(reservationId!);
            if (!reservation) throw new Error('Reservation not found.');
            const fetchedRoom = await firebaseService.getRoomById(reservation.roomId);
            if (!fetchedRoom) throw new Error('Associated room not found.');
            setRoom(fetchedRoom);
            setCheckInDate(reservation.checkInDate);
            setCheckOutDate(reservation.checkOutDate);
            setGuests(reservation.guests);
        } else {
            const fetchedRoom = await firebaseService.getRoomById(roomId!);
            if (!fetchedRoom) throw new Error('Room not found.');
            setRoom(fetchedRoom);
        }
    } catch(err: any) {
        setError(err.message || 'Failed to load data.');
    } finally {
        setFormLoading(false);
    }
  }, [isEditing, reservationId, roomId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !room) return;
    setLoading(true);
    setError(null);

    const reservationData: Omit<Reservation, 'id'> = {
      userId: user.id,
      roomId: room.id,
      checkInDate,
      checkOutDate,
      guests,
    };

    try {
        if(isEditing) {
            await firebaseService.updateReservation(reservationId!, reservationData);
        } else {
            await firebaseService.addReservation(reservationData);
        }
      navigate('/reservations');
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };
  
  if (formLoading) return <Spinner />;
  if (error && !room) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{isEditing ? 'Edit Your Reservation' : 'Book Your Stay'}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {room && (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <img src={room.imageUrl} alt={room.type} className="w-full h-64 object-cover rounded-md mb-4"/>
                <h2 className="text-2xl font-bold">{room.type} Room #{room.roomNumber}</h2>
                <p className="text-gray-600 mt-2">{room.description}</p>
                <p className="text-xl font-semibold text-indigo-600 mt-4">${room.pricePerNight}<span className="text-sm font-normal text-gray-500">/night</span></p>
            </div>
        )}
        <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Check-in Date"
                    id="checkInDate"
                    type="date"
                    required
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                />
                <Input
                    label="Check-out Date"
                    id="checkOutDate"
                    type="date"
                    required
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate || new Date().toISOString().split('T')[0]}
                />
                <Input
                    label="Number of Guests"
                    id="guests"
                    type="number"
                    required
                    min="1"
                    max="4"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="pt-2">
                    <Button type="submit" className="w-full" isLoading={loading}>
                    {isEditing ? 'Update Reservation' : 'Confirm Booking'}
                    </Button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
