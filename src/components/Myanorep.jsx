import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { myreportViewAPI } from '../services/reportServices';
import { useNavigate } from 'react-router-dom';

const Myreports = () => {
  const navigate = useNavigate();

  const { data: myReports, isLoading, isError } = useQuery({
    queryKey: ['reports'],
    queryFn: myreportViewAPI,
  });

  if (isLoading) return <p className="text-gray-600 text-lg">Loading your reports...</p>;
  if (isError) return <p className="text-red-600 text-lg">Failed to fetch your reports.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 relative w-full">
      <button 
        onClick={() => navigate('/anorepview')} 
        className="absolute top-10 right-10 bg-blue-700 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-blue-800 transition duration-200"
      >
        Back to Reports
      </button>
      <h2 className="text-4xl font-extrabold text-blue-800 mb-8">📋 My Reports</h2>
      <p className="text-lg font-bold text-gray-700 mb-6">Review your submitted reports.</p>
      <div className="w-3/4 grid gap-6">
        {myReports.length > 0 ? (
          myReports.map((report) => {
            const latitude = report.location?.latitude || 0;
            const longitude = report.location?.longitude || 0;
            const hasValidLocation = latitude !== 0 && longitude !== 0;

            return (
              <div key={report._id} className="bg-white p-8 rounded-2xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl relative">
                {!report.anonymous && (
                  <p className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-lg font-semibold shadow-md">
                    Identified ✅
                  </p>
                )}
                <h3 className="text-2xl font-semibold text-blue-600">{report.reportType}</h3>
                <p className="text-gray-900 mt-4">
                  <strong className="text-blue-700">Incident Details:</strong> {report.incidentDetails}
                </p>
                <p className="text-gray-900 mt-2">
                  <strong className="text-blue-700">Location:</strong> {report?.place || 'Unknown'}
                  {hasValidLocation && (
                    <a
                      href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline ml-2"
                    >
                      View on Map
                    </a>
                  )}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 text-lg"><center>No reports available..</center></p>
        )}
      </div>
    </div>
  );
};

export default Myreports;
