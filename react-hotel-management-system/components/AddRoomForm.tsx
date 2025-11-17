import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as firebaseService from '../services/firebaseService';
import { RoomType, RoomFeature } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Select } from './ui/Select';

const AddRoomForm: React.FC = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [type, setType] = useState<RoomType>(RoomType.SINGLE);
  const [pricePerNight, setPricePerNight] = useState('');
  const [features, setFeatures] = useState<RoomFeature[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFeatureChange = (feature: RoomFeature) => {
    setFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!roomNumber || !pricePerNight || !description || !imageUrl) {
        setError('Please fill out all fields.');
        setLoading(false);
        return;
    }

    try {
      const newRoomData = {
        roomNumber: parseInt(roomNumber),
        type,
        pricePerNight: parseFloat(pricePerNight),
        features,
        imageUrl,
        description,
      };
      await firebaseService.addRoom(newRoomData);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to add room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Add a New Room</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Room Number"
              id="roomNumber"
              type="number"
              required
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              min="100"
            />
            <Input
              label="Price Per Night ($)"
              id="pricePerNight"
              type="number"
              required
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              min="1"
            />
          </div>
          
          <Select label="Room Type" id="type" value={type} onChange={(e) => setType(e.target.value as RoomType)}>
            {Object.values(RoomType).map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
          
          <Input
            label="Image URL"
            id="imageUrl"
            type="text"
            required
            placeholder="e.g., https://picsum.photos/seed/room.../600/400"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.values(RoomFeature).map(feature => (
                <label key={feature} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={features.includes(feature)}
                    onChange={() => handleFeatureChange(feature)}
                  />
                  <span className="text-sm text-gray-600">{feature}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                  id="description"
                  rows={4}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          
          <div className="pt-2">
            <Button type="submit" className="w-full" isLoading={loading}>
              Add Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomForm;
