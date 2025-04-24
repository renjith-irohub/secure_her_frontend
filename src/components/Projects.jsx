import React from "react";
import { FaMapMarkerAlt, FaBell, FaUsers, FaBook, FaRoute, FaExclamationTriangle } from "react-icons/fa";

const features = [
  { id: 1, category: "Safety Features", image: "images/1.png", title: "Real-Time Location Tracking", icon: <FaMapMarkerAlt className="text-blue-500 text-3xl" /> },
  { id: 2, category: "Emergency Assistance", image: "images/2.png", title: "Distress Signal", icon: <FaBell className="text-red-500 text-3xl" /> },
  { id: 3, category: "Community Support", image: "images/3.png", title: "Community Support", icon: <FaUsers className="text-green-500 text-3xl" /> },
  { id: 4, category: "Education & Awareness", image: "images/4.png", title: "Educational Resources", icon: <FaBook className="text-purple-500 text-3xl" /> },
  { id: 5, category: "Safe Routes", image: "images/5.png", title: "Safe Routes", icon: <FaRoute className="text-orange-500 text-3xl" /> },
  { id: 6, category: "Anonymous Reporting", image: "images/6.png", title: "Anonymous Reporting", icon: <FaExclamationTriangle className="text-yellow-500 text-3xl" /> },
];

const MapEmbed = ({ location }) => {
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=${encodeURIComponent(location)}`;

  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-full max-w-4xl h-96">
        <iframe
          src={googleMapsUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white shadow-lg rounded-lg p-6">
              <div className="relative">
                <img src={feature.image} alt={feature.title} className="w-full h-64 object-cover rounded-lg" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition">
                  {feature.icon}
                </div>
              </div>
              <h2 className="text-xl font-semibold mt-4">{feature.title}</h2>
            </div>
          ))}
        </div>
        <h1 className="text-4xl font-bold my-10">Location</h1>
        <MapEmbed location="Eiffel Tower Paris France" />
      </div>
    </div>
  );
};

export default Projects;
