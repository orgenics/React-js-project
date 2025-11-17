
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Room, RoomType, RoomFeature } from '../types';
import * as firebaseService from '../services/firebaseService';
import RoomCard from './RoomCard';
import { Spinner } from './ui/Spinner';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useState<firebaseService.RoomFilters>({
    availability: 'all',
    type: '',
    features: []
  });

  const [sort, setSort] = useState<firebaseService.RoomSort>({
    key: 'pricePerNight',
    order: 'asc'
  });

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedRooms = await firebaseService.getRooms(filters, sort);
      setRooms(fetchedRooms);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch rooms.');
    } finally {
      setLoading(false);
    }
  }, [filters, sort]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleFeatureChange = (feature: RoomFeature) => {
    setFilters(prev => {
      const newFeatures = prev.features?.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...(prev.features || []), feature];
      return { ...prev, features: newFeatures };
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [key, order] = e.target.value.split('-') as [firebaseService.RoomSort['key'], firebaseService.RoomSort['order']];
    setSort({ key, order });
  };
  
  const resetFilters = () => {
    setFilters({ availability: 'all', type: '', features: [] });
    setSort({ key: 'pricePerNight', order: 'asc' });
  };

  const areFiltersActive = filters.type !== '' || filters.availability !== 'all' || (filters.features && filters.features.length > 0);


  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <Select label="Sort By" name="sort" value={`${sort.key}-${sort.order}`} onChange={handleSortChange}>
            <option value="pricePerNight-asc">Price: Low to High</option>
            <option value="pricePerNight-desc">Price: High to Low</option>
            <option value="type-asc">Type: A to Z</option>
            <option value="type-desc">Type: Z to A</option>
          </Select>
          <Select label="Filter by Type" name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All Types</option>
            {Object.values(RoomType).map(type => <option key={type} value={type}>{type}</option>)}
          </Select>
          <Select label="Availability" name="availability" value={filters.availability} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="available">Available Only</option>
          </Select>
           <div>
            <Button variant="secondary" onClick={resetFilters} className="w-full">Reset Filters</Button>
           </div>
        </div>
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Features</label>
            <div className="flex flex-wrap gap-2">
                {Object.values(RoomFeature).map(feature => (
                    <button 
                      key={feature} 
                      onClick={() => handleFeatureChange(feature)} 
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filters.features?.includes(feature) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      {feature}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {loading && <Spinner />}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && rooms.length === 0 && (
          <>
            {!areFiltersActive ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-md">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Your hotel has no rooms yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Get started by adding your first room. It will appear here.
                    </p>
                    <div className="mt-6">
                        <Button variant="primary" onClick={() => navigate('/add-room')}>
                            Add Your First Room
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 bg-white rounded-lg shadow-md">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No rooms found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {areFiltersActive ? "Try adjusting your search or filter settings." : "There are currently no rooms available for booking."}
                    </p>
                    {areFiltersActive && (
                        <div className="mt-6">
                            <Button variant="secondary" onClick={resetFilters}>
                            Reset Filters
                            </Button>
                        </div>
                    )}
                </div>
            )}
          </>
      )}
      {!loading && !error && rooms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map(room => <RoomCard key={room.id} room={room} />)}
        </div>
      )}
    </div>
  );
};

export default RoomList;
