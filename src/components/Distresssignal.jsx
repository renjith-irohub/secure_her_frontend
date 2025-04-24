import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  resolvedAPI,
  signalViewAPI,
  deleteSignalAPI,
} from "../services/signalServices";

const Distresssignal = () => {
  const queryClient = useQueryClient()
  const location = useLocation();
  const incomingSignal = location.state?.signal || null;

  const [signals, setSignals] = useState([]);

const { data: fetchedSignals, refetch } = useQuery({
  queryKey: ['distress-signals'],
  queryFn: signalViewAPI,
});

console.log(fetchedSignals);

  // Resolve signal mutation
  const resolveMutation = useMutation({
    mutationFn: resolvedAPI,
    mutationKey:['distress-resolved']
  });

  const handleResolveSignal = (id) => {
    resolveMutation.mutateAsync({ id }).then((data)=>{
      queryClient.invalidateQueries({queryKey:['distress-signals']})
    })
  };

  // Delete signal mutation
  const deleteMutation = useMutation({
    mutationFn: deleteSignalAPI,
    mutationKey:['delete-distress']     
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this signal?");
    if (confirmDelete) {
      deleteMutation.mutateAsync(id).then((data)=>{
        queryClient.invalidateQueries({queryKey:['distress-signals']})
      })
    }
  };

  if (fetchedSignals?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
        No distress signals available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-15 py-30 space-y-6 pb-30">
      {fetchedSignals?.map((signal) => (
        <div
          key={signal._id}
          className="bg-white shadow-lg p-6 rounded-2xl max-w-xl w-full relative transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          
        >
          {/* Delete icon top right */}
          <button
            onClick={() => handleDelete(signal._id)}
            className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
            title="Delete signal"
          >
            ❌
          </button>

          <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
            🚨 Distress Signal Details
          </h2>

          <div className="space-y-4 text-lg">
          <p>
          <span className="font-semibold">Location:</span>{" "}
                {typeof signal.location === 'object' ? (
                  <a
                    href={`https://www.google.com/maps?q=${signal.location.latitude},${signal.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Location
                  </a>
                ) : (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(signal.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Location
                  </a>
                )}
              </p>

            <p>
              <span className="font-semibold">Time: </span>{" "}
              {signal.timestamp
                ? new Date(signal.timestamp).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  }).toLowerCase()
                : signal.createdAt
                ? new Date(signal.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  }).toLowerCase()
                : "N/A"}
            </p>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-bold ${
                  signal.status?.toLowerCase() === "resolved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {signal.status || "Pending"}
              </span>
            </p>
          </div>

          {signal.status !== "resolved" && (
            <button
              onClick={() => handleResolveSignal(signal._id)}
              className="mt-6 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition duration-300 ease-in-out w-full"
            >
              ✅ Mark as Resolved
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Distresssignal;
