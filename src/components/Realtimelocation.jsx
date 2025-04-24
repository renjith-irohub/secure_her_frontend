import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { rtLocationAPI } from '../services/locationServices';

const Realtimelocation = () => {
  const [phone, setPhone] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  // Fetch real-time locations based on the phone number entered
  const { data: userLocation, error } = useQuery({
    queryKey: ['realTimeLocation', searchPhone],
    queryFn: () => rtLocationAPI(searchPhone),
    enabled: !!searchPhone,
  });
console.log(userLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error('Error getting location:', error)
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📍 Live Location Tracker</h2>

      {/* Search Input */}
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="p-3 rounded-xl shadow-md w-80 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setSearchPhone(phone)}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Map Display */}
      <iframe
        width="85%"
        height="400"
        className="rounded-xl shadow-lg"
        src={`https://www.google.com/maps?q=${userLocation?.location?.latitude || currentLocation.location?.latitude},${userLocation?.location?.longitude || currentLocation.location?.longitude}&z=15&output=embed`}
        allowFullScreen
      ></iframe>

      {/* Error Message */}
      {error && <p className="text-red-500 text-lg mt-4">⚠️ {error.message}</p>}

      {/* Searched User Location */}
      {userLocation && (
        <div className="mt-6 w-4/5 bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">📌 Searched Location: {userLocation.location.latitude}, {userLocation.location.longitude}</p>
          <p className="text-sm text-gray-500">🕒 Last updated: {userLocation?.time ? new Date(userLocation.time).toLocaleString() : 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default Realtimelocation;
