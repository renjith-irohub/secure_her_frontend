import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { comsviewAPI, mycomsviewAPI, offerSupportAPI, markCompletedAPI } from '../services/comsServices';
import { useSelector } from 'react-redux';

const Communitysupport = () => {
  const queryClient = useQueryClient();
  const [showRequests, setShowRequests] = useState(false);
  const [showMyRequests, setShowMyRequests] = useState(false);
  const userId = useSelector((state) => state.auth.id);

  // Fetch all requests and the logged-in user's requests
  const { data: requests = [], isLoading, isError } = useQuery({
    queryKey: ['comsview'],
    queryFn: comsviewAPI,
  });

  const { data: myRequests = [], isLoading: myLoading, isError: myError } = useQuery({
    queryKey: ['mycomsview'],
    queryFn: mycomsviewAPI,
  });

  // Mutation to offer support
  const supportMutation = useMutation({
    mutationFn: (id) => offerSupportAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['comsview']);
      alert('You’ve offered support! Stay connected and stay safe.');
    },
    onError: () => {
      alert('Failed to offer support. Please try again.');
    },
  });

  // Mutation to mark the request as completed
  const completeMutation = useMutation({
    mutationFn: (id) => markCompletedAPI(id),
    onSuccess: () => {
      alert('Request marked as completed.');
      queryClient.invalidateQueries(['comsview']);
      queryClient.invalidateQueries(['mycomsview']);
    },
    onError: () => {
      alert('Failed to mark as completed. Please try again.');
    },
  });

  // Handle offering support
  const handleSupport = (id) => {
    supportMutation.mutate(id);
  };

  // Handle marking as completed
  const handleComplete = (id) => {
    completeMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">🤝 Community Support</h2>

      <div className="w-3/4 bg-white p-6 rounded-2xl shadow-lg">
        <h3
          className="text-2xl font-semibold text-blue-700 mb-4 cursor-pointer"
          onClick={() => setShowRequests(!showRequests)}
        >
          {showRequests ? '▼' : '▶'} All Support Requests
        </h3>
        {showRequests && (
          <>
            {isLoading && <p className="text-gray-600 text-lg">Loading support requests...</p>}
            {isError && <p className="text-red-600 text-lg">Failed to load requests. Please try again later.</p>}
            {!isLoading && !isError && requests.length > 0 ? (
              <ul className="space-y-4">
                {requests?.map((request) => (
                  <li key={request._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <p className="text-gray-1000">{request.userId?.username}</p>
                    <p className="text-gray-800">🆘 {request.requestDetails}</p>
                    <p className="text-lg font-semibold mt-2">
                      <a
                        href={`https://www.google.com/maps?q=${request.location.latitude},${request.location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Location
                      </a>
                    </p>
                    <p className="text-md text-green-700">Status: {request.status}</p>
                    {request.status !== 'completed' && (
                      <button
                        onClick={() => handleSupport(request._id)}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 cursor-pointer"
                      >
                        Offer Support
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              !isLoading && <p className="text-gray-600 text-lg">No support requests at the moment. Check back later!</p>
            )}
          </>
        )}
      </div>

      <div className="w-3/4 bg-white p-6 rounded-2xl shadow-lg mt-10">
        <h3
          className="text-2xl font-semibold text-blue-700 mb-4 cursor-pointer"
          onClick={() => setShowMyRequests(!showMyRequests)}
        >
          {showMyRequests ? '▼' : '▶'} 📌 View My Requests
        </h3>
        {showMyRequests && (
          <>
            {myLoading && <p className="text-gray-600 text-lg">Loading your requests...</p>}
            {myError && <p className="text-red-600 text-lg">Failed to load your requests. Please try again later.</p>}
            {!myLoading && !myError && myRequests.length > 0 ? (
              <ul className="space-y-4">
                {myRequests.map((request) => (
                  <li key={request._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <p className="text-gray-800">🆘 {request.requestDetails}</p>
                    <p className="text-lg font-semibold mt-2">
                      <a
                        href={`https://www.google.com/maps?q=${request.location.latitude},${request.location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Location
                      </a>
                    </p>
                    <p className="text-md text-green-700">Status: {request.status}</p>
                    {request.status !== 'completed' && (
                      <button
                        onClick={() => handleComplete(request._id)}
                        className="mt-3 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              !myLoading && <p className="text-gray-600 text-lg">You have no active requests.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Communitysupport;
