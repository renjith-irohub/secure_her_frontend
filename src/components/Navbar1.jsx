import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signalAPI } from "../services/signalServices";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { logoutAction } from "../redux/Userslice";

const Navbar1 = ({ sendDistressSignal, isSending, distressNotification, handleLogout }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isViewsOpen, setIsViewsOpen] = useState(false);
  const servicesRef = useRef(null);
  const viewsRef = useRef(null);


  const toggleServices = (e) => {
    e.preventDefault();
    setIsServicesOpen((prev) => !prev);
    setIsViewsOpen(false);
  };

  const toggleViews = (e) => {
    e.preventDefault();
    setIsViewsOpen((prev) => !prev);
    setIsServicesOpen(false);
  };

  const handleClickOutside = (event) => {
    if (servicesRef.current && !servicesRef.current.contains(event.target)) {
      setIsServicesOpen(false);
    }
    if (viewsRef.current && !viewsRef.current.contains(event.target)) {
      setIsViewsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="bg-gray-900 text-white py-3 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center space-x-3">
            <img src="images/logo.png" alt="Logo" className="h-12" />
            <h1 className="text-2xl md:text-3xl font-bold text-white-400">SecureHer</h1>
          </div>
          <nav className="hidden md:flex space-x-6 z-50">
            <a href="/homepage" className="text-white hover:text-blue-400">Home</a>
            <a href="/about1" className="text-white hover:text-blue-400">About</a>
            <div className="relative" ref={servicesRef}>
              <div className="flex items-center">
                <a href="/services1" className="text-white hover:text-blue-400">Services</a>
                <button
                  onClick={toggleServices}
                  className="text-white ml-2 cursor-pointer focus:outline-none"
                >
                  ▼
                </button>
              </div>
              {isServicesOpen && (
                <div className="absolute bg-black text-white-900 rounded-lg shadow-lg mt-2 w-56">
                  <a href="/rtloc" className="block px-4 py-2 hover:bg-white-100">Location Tracking</a>
                  <a href="/comsview" className="block px-4 py-2 hover:bg-white-100">Community Support</a>
                  <a href="/anorep" className="block px-4 py-2 hover:bg-white-100">Incident Reporting</a>
                </div>
              )}
            </div>
            <div className="relative" ref={viewsRef}>
              <div className="flex items-center">
                <a href="/views" className="text-white hover:text-blue-400">Views</a>
                <button
                  onClick={toggleViews}
                  className="text-white ml-2 cursor-pointer focus:outline-none"
                >
                  ▼
                </button>
              </div>
              {isViewsOpen && (
                <div className="absolute bg-black text-white-900 rounded-lg shadow-lg mt-2 w-56">
                  <a href="/coms" className="block px-4 py-2 hover:bg-white-100">Offer Support</a>
                  <a href="/anorepview" className="block px-4 py-2 hover:bg-white-100">Reports</a>
                  <a href="/edures" className="block px-4 py-2 hover:bg-white-100">Educational Resources</a>
                  <a href="/saferoutes" className="block px-4 py-2 hover:bg-white-100">Safe Routes</a>
                  <a href="/signal" className="block px-4 py-2 hover:bg-white-100">Distress Signals</a>
                </div>
              )}
            </div>
            <a href="/cusset" className="text-white hover:text-blue-400">Settings</a>
            <button onClick={handleLogout} className="text-white hover:text-red-400 cursor-pointer">Logout</button>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={sendDistressSignal}
              disabled={isSending}
              className={`px-5 py-2 rounded-lg font-semibold shadow-md ${isSending ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700 cursor-pointer'}`}
            >
              {isSending ? 'Sending...' : '🚨 Distress Signal'}
            </button>
            <div className="relative">
              <a href="/notification" className="text-white text-2xl relative cursor-pointer">
                <FaBell />
                {distressNotification > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
                    {distressNotification}
                  </span>
                )}
              </a>
            </div>
          </div>
          <button className="md:hidden text-white text-2xl">
            <FaBars />
          </button>
        </div>
      </div>
    </div>
  );
};

const Distresssignal = () => {
  const queryClient = useQueryClient()
  const [distressNotification, setDistressNotification] = useState(0);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signalAPI,
    onSuccess: (data) => {
  alert("🚨 Distress signal sent successfully!");
  queryClient.invalidateQueries({queryKey:['distress-signals']})
  },
    onError: () => {
      alert("❌ Failed to send distress signal. Please try again.");
    },
  });
 
  const sendDistressSignal = async () => {
    try {
      const location = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
          (error) => reject(error)
        );
      });

      const distressData = {
        message: "🚨 Distress Signal! I need help!",
        location: `${location.lat}, ${location.lng}`,
        timestamp: new Date().toLocaleString(),
      };

      mutation.mutate(distressData);
    } catch (error) {
      console.error("Failed to get location:", error);
      alert("❌ Failed to retrieve location. Please enable location access.");
    }
  };
const dispatch=useDispatch()
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch(logoutAction()) 
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <Navbar1 sendDistressSignal={sendDistressSignal} isSending={mutation.isLoading} distressNotification={distressNotification} handleLogout={handleLogout} />
    </div>
  );
};

export default Distresssignal;