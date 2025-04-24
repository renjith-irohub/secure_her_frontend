import React from "react";
import { FaMapMarkerAlt, FaBell, FaUsers, FaBook, FaRoute, FaExclamationTriangle, FaCog } from "react-icons/fa";

const Services1 = () => {
  const serviceData = [
    { title: "Real-Time Location Tracking", description: "Share your real-time location with trusted contacts for added safety.", icon: <FaMapMarkerAlt className="text-blue-500 text-4xl mx-auto" /> },
    { title: "Distress Signal", description: "Send instant emergency alerts to contacts and authorities with your live location.", icon: <FaBell className="text-red-500 text-4xl mx-auto" /> },
    { title: "Community Support", description: "Connect with nearby users and volunteers for assistance and safety.", icon: <FaUsers className="text-green-500 text-4xl mx-auto" /> },
    { title: "Educational Resources", description: "Access self-defense tips, legal rights information, and safety guidelines.", icon: <FaBook className="text-purple-500 text-4xl mx-auto" /> },
    { title: "Safe Routes", description: "Plan safer routes based on crowd-sourced data and user reviews.", icon: <FaRoute className="text-orange-500 text-4xl mx-auto" /> },
    { title: "Anonymous Reporting", description: "Report incidents of harassment or unsafe situations anonymously.", icon: <FaExclamationTriangle className="text-yellow-500 text-4xl mx-auto" /> },
    { title: "Customizable Settings", description: "Personalize safety preferences, emergency contacts, and privacy options.", icon: <FaCog className="text-gray-500 text-4xl mx-auto" /> },
  ];

  return (
    <div>
      {/* Services Section */}
      <div className="py-16 bg-gray-100 text-center">
        <h1 className="text-4xl font-bold">Services</h1>
        <p className="text-gray-600 mt-2">Empowering women with safety and support solutions.</p>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {serviceData.map((service, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              {service.icon}
              <h4 className="text-lg font-semibold mt-4">{service.title}</h4>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services1;
