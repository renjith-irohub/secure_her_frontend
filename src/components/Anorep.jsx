import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { reportViewAPI } from '../services/reportServices';
import { useNavigate } from 'react-router-dom';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Anorep = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationNames, setLocationNames] = useState({});
  const navigate = useNavigate();

  const { data: reports = [], isLoading, isError } = useQuery({
    queryKey: ['reports'],
    queryFn: reportViewAPI,
  });

  useEffect(() => {
    const fetchLocationNames = async () => {
      const locationsToFetch = reports.filter(
        ({ location }) => location && !locationNames[`${location.latitude},${location.longitude}`]
      );
  
      const fetchPromises = locationsToFetch.map(async ({ location }) => {
        const key = `${location.latitude},${location.longitude}`;
        try {
          console.log(`Fetching location for: ${key}`);
          
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();
          
          console.log(`API Response for ${key}:`, data);
          
          if (data.status === "OK" && data.results.length > 0) {
            return { key, name: data.results[0].formatted_address };
          } else {
            console.error(`Failed to fetch address for ${key}, API status: ${data.status}`);
            return { key, name: "Unknown Location" };
          }
        } catch (error) {
          console.error(`Error fetching location for ${key}:`, error);
          return { key, name: "Unknown Location" };
        }
      });
  
      const results = await Promise.all(fetchPromises);
      setLocationNames((prev) => {
        const newLocationNames = { ...prev };
        results.forEach(({ key, name }) => {
          newLocationNames[key] = name;
        });
        return newLocationNames;
      });
    };
  
    if (reports.length > 0) {
      fetchLocationNames();
    }
  }, [reports]);
  

  const filteredReports = reports.filter(
    (report) => report.reportType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p className="text-gray-600 text-lg">Loading reports...</p>;
  if (isError) return <p className="text-red-600 text-lg">Failed to fetch reports.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <button
        onClick={() => navigate('/myanorepview')}
        className="absolute top-25 right-4 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        View My Reports
      </button>
      <h2 className="text-4xl font-extrabold text-red-800 mb-8">📋 Incident Reports</h2>
      <p className="text-lg  font-bold text-gray-700 mb-6">Review submitted reports and help ensure community safety.</p>
      <input
        type="text"
        placeholder="Search by incident type or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-3/4 px-4 py-3 mb-8 border rounded-lg focus:ring-2 focus:ring-red-400 transition duration-200"
      />
      <div className="w-3/4 grid gap-6">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => {
            const latitude = report.location?.latitude || 0;
            const longitude = report.location?.longitude || 0;
            const key = `${latitude},${longitude}`;
            return (
              <div key={report._id} className="bg-white p-8 rounded-2xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl">
                <h3 className="text-2xl font-semibold text-red-600">{report.reportType}</h3>
                <p className="text-gray-900 mt-4"><strong className="text-red-700">Incident Details:</strong> {report.incidentDetails}</p>
                <p className="text-gray-900 mt-2">
                  <strong className="text-red-700">Location:</strong> {report?.place}
                  <a
                    href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-700 underline ml-2"
                  >
                    View on Map
                  </a>
                </p>
                {!report.anonymous && <p className="text-gray-900 mt-2"><strong className="text-red-700">Reporter:</strong> {report.userId?.username}</p>}
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 text-lg">No reports available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Anorep;
