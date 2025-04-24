import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaBook, FaChevronDown, FaPlusCircle, FaEye, FaSignOutAlt,FaClipboardList,FaCaretDown,
} from "react-icons/fa";
import { admincomsViewAPI } from '../services/comsServices';

const Supportlist = () => {
  const { data: supportRequests = [], isLoading, isError } = useQuery({
    queryKey: ['supportRequests'],
    queryFn: admincomsViewAPI,
  });
  
  const [isEduresOpen, setIsEduresOpen] = useState(false);
  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const toggleReport = () => setIsReportOpen(!isReportOpen);

  const handleLogout = () => {
    window.location.href = '/';
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load support requests.</div>;


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
            <li><a href="/admin/admin-dashboard" className="flex items-center space-x-2 hover:text-blue-400"><FaChartBar /> <span>Dashboard</span></a></li>
            <li><a href="/admin/userlist" className="flex items-center space-x-2 hover:text-blue-400"><FaUser /> <span>Users</span></a></li>
            <li><a href="/admin/signallist" className="flex items-center space-x-2 hover:text-blue-400"><FaSignal /> <span>Distress Signals</span></a></li>
            <li><a href="/admin/supportlist" className="flex items-center space-x-2 hover:text-blue-400"><FaHandsHelping /> <span>Community Support</span></a></li>
            <li><a href="/admin/reportslist" className="flex items-center space-x-2 hover:text-blue-400"><FaFileAlt /> <span>Incident Reports</span></a></li>
            <li>
              <div onClick={toggleEdures} className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
                <FaBook /> <span>Educational Resources</span> <FaChevronDown className={`${isEduresOpen ? 'rotate-180' : ''} transition-transform`} />
              </div>
              {isEduresOpen && (
                <ul className="pl-6 space-y-4">
                  <li><a href="/admin/addedures" className="flex items-center space-x-2 hover:text-blue-400"><FaPlusCircle /> <span>Add Resource</span></a></li>
                  <li><a href="/admin/viewedures" className="flex items-center space-x-2 hover:text-blue-400"><FaEye /> <span>View Resources</span></a></li>
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
              <button onClick={handleLogout} className="flex items-center space-x-2 text-white-400 hover:text-white-600 w-full cursor-pointer">
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Support Requests */}
      
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Community Support Requests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportRequests?.map((request) => (
            <div key={request._id} className="bg-white shadow-lg rounded-2xl p-6 transform transition duration-500 hover:scale-105">
              <p className="text-xl font-semibold text-gray-700">Name: {request.userId.username}</p>
              {(request.supporter)&&(<p className="text-gray-700">Helper: {request.supporter.username}</p>)}
              
              <p className="text-lg font-semibold mt-2">
                {typeof request.location === 'object' ? (
                  <a
                    href={`https://www.google.com/maps?q=${request.location.latitude},${request.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Location
                  </a>
                ) : (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(request.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Location
                  </a>
                )}
              </p>
              <p className="text-gray-700">Support Details: {request.requestDetails}</p>
              <p className={`text-md font-semibold mt-4 ${request.status === 'completed' ? 'text-green-500' : request.status === 'onprogress' ? 'text-blue-800' : 'text-red-500'}`}>Status: {request.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Supportlist;
