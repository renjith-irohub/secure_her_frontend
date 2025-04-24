import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { reportViewAPI } from '../services/reportServices';


const Mapcomponent = () => {
  const { data: coordinates = [], isLoading, isError, error } = useQuery({
    queryKey: ['coordinates'],
    queryFn: reportViewAPI,
  });
console.log(coordinates);

  return (
    <div className="w-full">
      {isLoading && <p className="text-blue-500 text-center">Loading map data...</p>}
      {isError && <p className="text-red-500 text-center">Error: {error.message}</p>}

      <MapContainer center={[40.7128, -74.0060]} zoom={3} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates.map((coord) => (
          <Marker key={coord._id} position={[coord.location.latitude, coord.location.longitude]}>
            <Popup>{coord.reportType}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapcomponent;
