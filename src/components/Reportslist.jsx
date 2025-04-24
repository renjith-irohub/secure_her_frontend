import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FaChartBar,
  FaChevronDown,
  FaUser,
  FaSignal,
  FaHandsHelping,
  FaFileAlt,
  FaBook,
  FaPlusCircle,
  FaEye,
  FaSignOutAlt,FaClipboardList,FaCaretDown
} from "react-icons/fa";
import { adminreportviewAPI } from '../services/reportServices';

const Reportslist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEduresOpen, setIsEduresOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);
  const toggleReport = () => setIsReportOpen(!isReportOpen);
  const handleLogout = () => {
    window.location.href = '/';
  };

  const { data: reports = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: adminreportviewAPI
  });

  const filteredReports = reports.filter(report =>
    report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white p-6 hidden md:block">
        <div className="flex items-center space-x-3 mb-6">
          <img src="/images/logo.png" alt="SecureHer Logo" className="h-12" />
          <h2 className="text-xl font-bold">SecureHer</h2>
        </div>
        <nav>
          <ul className="space-y-6 text-md">
            <li>
              <a href="/admin/admin-dashboard" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
                <FaChartBar /> <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/admin/userlist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
                <FaUser /> <span>Users</span>
              </a>
            </li>
            <li>
              <a href="/admin/signallist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
                <FaSignal /> <span>Distress Signals</span>
              </a>
            </li>
            <li>
              <a href="/admin/supportlist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
                <FaHandsHelping /> <span>Community Support</span>
              </a>
            </li>
            <li>
              <a href="/admin/reportslist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
                <FaFileAlt /> <span>Reports</span>
              </a>
            </li>
            <li>
              <div onClick={toggleEdures} className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
                <FaBook /> <span>Educational Resources</span>
                <FaChevronDown className={`${isEduresOpen ? 'rotate-180' : ''} transition-transform`} />
              </div>
              {isEduresOpen && (
                <ul className="pl-6 space-y-4">
                  <li>
                    <a href="/admin/addedures" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
                      <FaPlusCircle /> <span>Add Resource</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/viewedures" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
                      <FaEye /> <span>View Resources</span>
                    </a>
                  </li>
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

      {/* Reports Section */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Incident Reports</h1>
        <input
          type="text"
          placeholder="Search by incident type, district, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        {isLoading ? (
          <p className="text-gray-700 text-center">Loading reports...</p>
        ) : error ? (
          <p className="text-black-500 text-center">Failed to load reports.</p>
        ) : (
          <div className="space-y-4">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => {
                const latitude = report.location?.latitude || 0;
                const longitude = report.location?.longitude || 0;
                return (
                  <div key={report._id} className="bg-white shadow-lg rounded-2xl p-6 transform transition duration-500 hover:scale-105">
                    <h2 className="text-2xl font-semibold text-black-600">{report.reportType}</h2>
                    <p className="text-gray-900 mt-4">
                      <strong className="text-black-700">Incident Details:</strong> {report.incidentDetails}
                    </p>
                    <p className="text-gray-900 mt-2">
                      <strong className="text-black-700">Location:</strong> {report?.place}
                      <a
                        href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black-700 underline ml-2"
                      >
                        View on Map
                      </a>
                    </p>
                    {!report.anonymous && (
                      <p className="text-gray-900 mt-2">
                        <strong className="text-black-700">Reporter:</strong> {report.userId?.username}
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-700 text-center">No incidents found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reportslist;
