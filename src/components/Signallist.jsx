import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaBook,FaClipboardList,FaCaretDown,
  FaChevronDown, FaPlusCircle, FaEye, FaSignOutAlt
} from "react-icons/fa";
import { adminsignalViewAPI } from '../services/signalServices';


const Signallist = () => {
  const [isEduresOpen, setIsEduresOpen] = useState(false);
  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const toggleReport = () => setIsReportOpen(!isReportOpen);
  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/";
  };

  // useQuery to fetch signals
  const { data: distressSignals, isLoading, isError } = useQuery({
    queryKey: ['distressSignals'],
    queryFn: adminsignalViewAPI
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white p-6 hidden md:block">
        <div className="flex items-center space-x-3 mb-6">
          <img src="/images/logo.png" alt="SecureHer Logo" className="h-12" />
          <h2 className="text-xl font-bold">SecureHer</h2>
        </div>
        <nav>
          <ul className="space-y-6 text-md">
            <li><a href="/admin/admin-dashboard" className="flex items-center space-x-2 hover:text-blue-400"><FaChartBar /><span>Dashboard</span></a></li>
            <li><a href="/admin/userlist" className="flex items-center space-x-2 hover:text-blue-400"><FaUser /><span>Users</span></a></li>
            <li><a href="/admin/signallist" className="flex items-center space-x-2 hover:text-blue-400"><FaSignal /><span>Distress Signals</span></a></li>
            <li><a href="/admin/supportlist" className="flex items-center space-x-2 hover:text-blue-400"><FaHandsHelping /><span>Community Support</span></a></li>
            <li><a href="/admin/reportslist" className="flex items-center space-x-2 hover:text-blue-400"><FaFileAlt /><span>Incident Reports</span></a></li>
            <li>
              <div onClick={toggleEdures} className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
                <FaBook /><span>Educational Resources</span><FaChevronDown className={`${isEduresOpen ? 'rotate-180' : ''} transition-transform`} />
              </div>
              {isEduresOpen && (
                <ul className="pl-6 space-y-4">
                  <li><a href="/admin/addedures" className="flex items-center space-x-2 hover:text-blue-400"><FaPlusCircle /><span>Add Resource</span></a></li>
                  <li><a href="/admin/viewedures" className="flex items-center space-x-2 hover:text-blue-400"><FaEye /><span>View Resources</span></a></li>
                </ul>
              )}
            </li>
            <li>
                            <div onClick={toggleReport} className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
                              <FaClipboardList /> <span>Data Reports</span> <FaChevronDown className={`${isReportOpen ? 'rotate-180' : ''} transition-transform`} />
                            </div>
                            {isReportOpen && (
                              <ul className="pl-6 space-y-4">
                                <li><a href="/admin/piechart" className="flex items-center space-x-2 hover:text-blue-400"> <FaCaretDown/><span>Analysis Report</span></a></li>
                                <li><a href="/admin/datereport" className="flex items-center space-x-2 hover:text-blue-400"> <FaCaretDown/><span>Datewise Report</span></a></li>
                              </ul>
                            )}
                          </li>
            <li>
              <div onClick={handleLogout} className="flex items-center space-x-2 text-white hover:text-gray-400 cursor-pointer">
                <FaSignOutAlt /><span>Logout</span>
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Distress Signals Cards */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Distress Signals</h1>

        {isLoading ? (
          <p>Loading signals...</p>
        ) : isError ? (
          <p className="text-red-500">Error fetching distress signals.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {distressSignals?.map((signal) => (
              <div key={signal._id} className="bg-white rounded-2xl shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <h2 className="text-xl font-semibold text-gray-700">Name: {signal.userId.username}</h2>
                {/* <p className="text-gray-600"><strong>Location:</strong> {signal.location}</p> */}
                <p className="text-lg font-semibold mt-2">
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
                <p className={`text-md font-semibold mt-4 ${signal.status === 'pending' ? 'text-red-500' : signal.status === 'Resolved' ? 'text-red-500' : 'text-green-500'}`}>
                  Status: {signal.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signallist;
