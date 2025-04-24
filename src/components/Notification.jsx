import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { distressSignalAPI } from '../services/signalServices';
import { markAsReadAPI } from '../services/notificationServices';

function Notification() {
  const queryClient = useQueryClient();

  const { data: distressSignals, isLoading, error } = useQuery({
    queryKey: ['distressSignals'],
    queryFn: distressSignalAPI,
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id) => markAsReadAPI({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['distressSignals']);
    },
  });

  const openLocation = (coordinates) => {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  if (isLoading) return <p className="text-center text-xl mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-xl mt-10">Error loading distress signals.</p>;

  return (
    <div className="bg-gray-100 p-10 w-full pb-100">
      <h1 className="text-3xl font-bold mb-8 text-center">Notifications</h1>

      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        {distressSignals?.length > 0 ? (
          distressSignals.map((signal) => (
            <div
              key={signal._id}
              className="bg-white p-6 rounded-2xl shadow-xl transform-gpu transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <h2 className="text-2xl font-semibold mb-2">{signal.name}</h2>
              <p className="text-gray-700 text-lg mb-1">
                <span className="font-medium">Message: {signal.message}</span>
              </p>
              <p className="text-gray-600 text-lg">
                Time: {signal.date ? new Date(signal.date).toLocaleString() : 'N/A'}
              </p>

              <div className="flex items-center gap-4 mt-5 flex-wrap">
                <button
                  onClick={() => markAsReadMutation.mutate(signal._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-base"
                >
                  ✅ Mark as read
                </button>

                {signal.coordinates && (
                  <button
                    onClick={() => openLocation(signal.coordinates)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-base"
                  >
                    📍 View Location
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-xl">No new notifications.</p>
        )}
      </div>
    </div>
  );
}

export default Notification;
