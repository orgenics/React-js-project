
import React, { useState, useEffect, useCallback } from 'react';
import { Reservation } from '../types';
import { useAuth } from '../hooks/useAuth';
import * as firebaseService from '../services/firebaseService';
import { Spinner } from './ui/Spinner';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchReservations = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const userReservations = await firebaseService.getReservationsForUser(user.id);
      setReservations(userReservations);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch reservations.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleCancel = async (reservationId: string) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await firebaseService.deleteReservation(reservationId);
        setReservations(prev => prev.filter(r => r.id !== reservationId));
      } catch (err: any) {
        alert(err.message || 'Failed to cancel reservation.');
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Reservations</h1>
      {reservations.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">You have no reservations.</p>
            <Button className="mt-4" onClick={() => navigate('/')}>
              Browse Rooms
            </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {reservations.map(res => (
            <div key={res.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {res.room && (
                    <img src={res.room.imageUrl} alt={res.room.type} className="w-full sm:w-48 h-48 sm:h-32 object-cover rounded-md"/>
                )}
                <div className="flex-grow">
                    <h2 className="text-xl font-bold">{res.room?.type} Room #{res.room?.roomNumber}</h2>
                    <p className="text-gray-600 mt-1">
                        <strong>Check-in:</strong> {new Date(res.checkInDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <strong>Check-out:</strong> {new Date(res.checkOutDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <strong>Guests:</strong> {res.guests}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button variant="secondary" onClick={() => navigate(`/edit-reservation/${res.id}`)} className="w-full sm:w-auto">Edit</Button>
                    <Button variant="danger" onClick={() => handleCancel(res.id)} className="w-full sm:w-auto">Cancel</Button>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationList;
