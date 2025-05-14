import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import { FaMapMarkerAlt,FaRoute } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import { safeRouteAPI, getReportAPI } from '../services/saferouteServices';
import { reportViewAPI } from '../services/reportServices';

// Sample Kerala places (replace with your actual array)
const keralaPlaces = [
  'Thiruvananthapuram',
  'Kochi',
  'Kozhikode',
  'Kollam',
  'Thrissur',
];

// Geocoding function using Nominatim
const getCoordinates = async (placeName) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`
  );
  const data = await response.json();
  if (data.length === 0) throw new Error('Location not found');
  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
};

const Saferoutes = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [routePath, setRoutePath] = useState([]);

  // Fetch incident data from both APIs
  const { data: reportData1 = [], isLoading: isLoading1, isError: isError1, error: error1 } = useQuery({
    queryKey: ['reports'],
    queryFn: getReportAPI,
  });

  const { data: reportData2 = [], isLoading: isLoading2, isError: isError2, error: error2 } = useQuery({
    queryKey: ['coordinates'],
    queryFn: reportViewAPI,
  });

  // Fetch safe route data
  const {
    data: routeData,
    refetch,
    isFetching,
    isError: isRouteError,
    error: routeError,
  } = useQuery({
    queryKey: ['safeRoute', startCoords, endCoords],
    queryFn: () =>
      safeRouteAPI({
        startLatitude: startCoords?.lat,
        startLongitude: startCoords?.lng,
        endLatitude: endCoords?.lat,
        endLongitude: endCoords?.lng,
      }),
    enabled: false,
  });

  // Update route path when routeData changes
  React.useEffect(() => {
    if (routeData?.path) {
      // Assuming routeData.path contains an array of { latitude, longitude }
      const path = routeData.path.map((point) => [point.latitude, point.longitude]);
      setRoutePath(path);
    }
  }, [routeData]);

  const getSafeRoute = async () => {
    try {
      const startC = await getCoordinates(start);
      const endC = await getCoordinates(end);
      setStartCoords(startC);
      setEndCoords(endC);
      setRoutePath([]); // Clear previous route
      refetch();
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      alert('Error generating route. Please check locations and try again.');
    }
  };

  // Combine and normalize report data from both sources
  const allReports = [
    ...(reportData1 || []).map((report) => ({
      lat: report.latitude || report.location?.latitude,
      lng: report.longitude || report.location?.longitude,
      reportType: report.reportType || 'Incident',
    })),
    ...(reportData2 || []).map((report) => ({
      lat: report.location?.latitude,
      lng: report.location?.longitude,
      reportType: report.reportType || 'Incident',
    })),
  ].filter((report) => report.lat && report.lng);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-4xl font-extrabold text-green-900 mb-8">🌍 Safe Routes & Incident Map</h2>

      {/* Input Form */}
      <div className="w-3/4 bg-white p-8 rounded-2xl shadow-2xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-lg font-semibold text-gray-800">Starting Point</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-600" />
              <input
                list="places"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full pl-10 pr-4 py-3 mt-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Choose starting location"
              />
              <datalist id="places">
                {keralaPlaces.map((place, index) => (
                  <option key={index} value={place} />
                ))}
              </datalist>
            </div>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-800">Destination</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-600" />
              <input
                list="places"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full pl-10 pr-4 py-3 mt-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Choose destination"
              />
            </div>
          </div>
        </div>
        <button
          onClick={getSafeRoute}
          disabled={isFetching}
          className={`w-full py-3 rounded-lg text-lg flex items-center justify-center space-x-2 shadow-md transition duration-300 ${
            isFetching
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-700 text-white hover:bg-green-800'
          }`}
        >
          <FaRoute />
          <span>{isFetching ? 'Fetching Route...' : 'Get Safe Route'}</span>
        </button>
      </div>

      {/* Loading and Error States */}
      {(isLoading1 || isLoading2) && (
        <p className="text-blue-500 text-center">Loading map data...</p>
      )}
      {(isError1 || isError2) && (
        <p className="text-red-500 text-center">
          Error: {error1?.message || error2?.message || 'Failed to load incidents'}
        </p>
      )}
      {isRouteError && (
        <p className="text-red-500 text-center">Error: {routeError?.message || 'Failed to fetch route'}</p>
      )}

      {/* Leaflet Map */}
      <div className="w-3/4">
        <MapContainer
          center={[10.8505, 76.2711]} // Center on Kerala, India
          zoom={7}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Incident Markers */}
          {allReports.map((report, index) => (
            <Marker key={`report-${index}`} position={[report.lat, report.lng]}>
              <Popup>{report.reportType}</Popup>
            </Marker>
          ))}
          

          {/* Start and End Markers */}
          {startCoords && (
         <Marker position={[startCoords.lat, startCoords.lng]}>
              <Popup>Start: {start}</Popup>
         </Marker>
          )}
          {endCoords && (
            <Marker position={[endCoords.lat, endCoords.lng]}>
              <Popup>End: {end}</Popup>
            </Marker>
          )}

          {/* Route Polyline */}
          {routePath.length > 0 && (
            <Polyline positions={routePath} color="blue" weight={5} opacity={0.7} />
          )}
        </MapContainer>
      </div>

      {/* Google Maps Link (if available) */}
      {routeData?.googleMapsUrl && (
        <div className="mt-4 w-3/4">
          <a
            href={routeData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-lg"
          >
            Open Safe Route in Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default Saferoutes;