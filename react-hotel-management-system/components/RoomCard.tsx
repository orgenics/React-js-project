import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Room, RoomFeature } from '../types';
import { Button } from './ui/Button';

interface RoomCardProps {
  room: Room;
}

const FeatureIcon: React.FC<{ feature: RoomFeature }> = ({ feature }) => {
    // Fix: Changed JSX.Element to React.JSX.Element to fix "Cannot find namespace 'JSX'".
    const iconMap: Record<RoomFeature, React.JSX.Element> = {
        [RoomFeature.WIFI]: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.393 8.393a15.5 15.5 0 0121.214 0" /></svg>,
        [RoomFeature.TV]: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        [RoomFeature.AC]: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        [RoomFeature.BALCONY]: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" /></svg>,
        [RoomFeature.OCEAN_VIEW]: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945C21.43 11.96 22 13.414 22 15c0 3.314-4.03 6-9 6s-9-2.686-9-6c0-1.586.57-3.04 1.555-4zM8 5a2 2 0 100-4 2 2 0 000 4z" /></svg>,
    };
    return <div className="flex items-center space-x-2 text-gray-600" title={feature}>{iconMap[feature]}<span>{feature}</span></div>;
}


const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
      <img className="w-full h-56 object-cover object-center" src={room.imageUrl} alt={`View of ${room.type} room`} />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{room.type} Room #{room.roomNumber}</h2>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${room.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {room.isAvailable ? 'Available' : 'Booked'}
            </span>
        </div>
        <p className="text-gray-600 flex-grow">{room.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {room.features.map(feature => <FeatureIcon key={feature} feature={feature} />)}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <p className="text-xl font-semibold text-indigo-600">
            ${room.pricePerNight}<span className="text-sm font-normal text-gray-500">/night</span>
          </p>
          <Button onClick={() => navigate(`/book/${room.id}`)} disabled={!room.isAvailable}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
