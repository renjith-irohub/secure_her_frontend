import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { logoutAction } from "../redux/Userslice";
import {
  FaUsers, FaBell, FaBook, FaRoute, FaMapMarkerAlt,FaClipboardList,FaEllipsisV,FaEllipsisH,FaChevronDown,FaCaretDown,
  FaExclamationTriangle, FaChartBar, FaUser,
  FaSignal, FaHandsHelping, FaFileAlt, FaPlusCircle, FaEye, FaSignOutAlt
} from "react-icons/fa";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip,
  Legend, ResponsiveContainer
} from "recharts";
import { dataReportAPI } from "../services/datareportServices";

// Stats color and icon map
const getIconForStat = (title) => {
  const iconMap = {
    "Total Users": { icon: <FaUsers />, color: "#4F46E5" },           
    "Distress Alerts": { icon: <FaBell />, color: "#EF4444" },         
    "Support Requests": { icon: <FaHandsHelping />, color: "#F59E0B" }, 
    "Anonymous Reports": { icon: <FaExclamationTriangle />, color: "#10B981" }, 
  };
  return iconMap[title] || { icon: <FaChartBar />, color: "#6B7280" }; // Gray fallback
};

// Normalize name for color matching
const getStatColorByName = (name) => {
  const mappings = {
    "Users": "Total Users",
    "Alerts": "Distress Alerts",
    "Support": "Support Requests",
    "Reports": "Anonymous Reports",
  };
  const mapped = mappings[name] || name;
  return getIconForStat(mapped).color;
};

const Admindashboard = () => {
  const dispatch = useDispatch();
  const [isEduresOpen, setIsEduresOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);
  const toggleReport = () => setIsReportOpen(!isReportOpen);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['dataReports'],
    queryFn: dataReportAPI,
  });

  const handleLogout = () => {
    dispatch(logoutAction());
    sessionStorage.clear();
    window.location.href = "/";
  };

  const stats = data?.stats;
  const barChartData = data?.barChart;
  const pieChartData = data?.pieChart;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-1">
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
                <div onClick={handleLogout} className="flex items-center space-x-2 text-white hover:text-gray-400 cursor-pointer">
                  <FaSignOutAlt /> <span>Logout</span>
                </div>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>

          {isLoading ? (
            <p>Loading data...</p>
          ) : isError ? (
            <p className="text-red-500">Error loading dashboard data.</p>
          ) : (
            <>
              {/* Stats Cards */}
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stats.map((stat, index) => {
                    const { icon, color } = getIconForStat(stat.title);
                    return (
                      <div key={index} className="bg-white shadow-md p-4 rounded-lg flex items-center space-x-3">
                        <div className="text-3xl" style={{ color }}>{icon}</div>
                        <div>
                          <h2 className="text-md font-semibold">{stat.title}</h2>
                          <p className="text-lg font-bold">{stat.count}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {barChartData && (
                  <div className="bg-white shadow-md p-6 rounded-lg">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={barChartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value">
                          {barChartData.map((entry, index) => (
                            <Cell key={`bar-${index}`} fill={getStatColorByName(entry.name)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {pieChartData && (
                  <div className="bg-white shadow-md p-6 rounded-lg">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getStatColorByName(entry.name)} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admindashboard;
