import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { logoutAction } from "../redux/Userslice";
import {
  FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt,FaClipboardList,FaCaretDown,
  FaBook, FaPlusCircle, FaEye, FaChevronDown, FaSignOutAlt
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { dataReportAPI } from "../services/datareportServices";

const getIconForStat = (title) => {
  const iconMap = {
    "Total Users": { icon: <FaUser />, color: "#4F46E5" },
    "Distress Alerts": { icon: <FaSignal />, color: "#EF4444" },
    "Support Requests": { icon: <FaHandsHelping />, color: "#F59E0B" },
    "Anonymous Reports": { icon: <FaFileAlt />, color: "#10B981" },
  };
  return iconMap[title] || { icon: <FaChartBar />, color: "#6B7280" };
};

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

const Piechartreport = () => {
  const dispatch = useDispatch();
  const [isEduresOpen, setIsEduresOpen] = useState(false);
  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);
  const [isReportOpen, setIsReportOpen] = useState(false);
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
        <main className="flex-1 p-8">
         
          {isLoading ? (
            <p>Loading pie chart data...</p>
          ) : isError ? (
            <p className="text-red-500">Error loading pie chart data.</p>
          ) : (
            <div className="bg-white shadow-md p-8 rounded-xl">
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={180} // bigger pie radius
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
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Piechartreport;
