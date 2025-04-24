import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaClipboardList, FaCaretDown,
  FaBook, FaChevronDown, FaPlusCircle, FaEye, FaSignOutAlt
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/Userslice";
import { adminsignalViewAPI } from "../services/signalServices";
import { admincomsViewAPI } from "../services/comsServices";
import { adminreportviewAPI } from "../services/reportServices";

const Datewisereports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [isEduresOpen, setIsEduresOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);
  const toggleReport = () => setIsReportOpen(!isReportOpen);
  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setError("");
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setError("");
  };

  const handleEndDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const fromDate = new Date(startDate);
    const currentDate = new Date();

    if (startDate && selectedDate < fromDate) {
      setError("To date cannot be earlier than From date.");
      return;
    }
    if (selectedDate > currentDate) {
      setError("To date cannot be in the future.");
      return;
    }

    setEndDate(e.target.value);
    setError("");
  };

  const { data: distress = [] } = useQuery({
    queryKey: ["distress"],
    queryFn: adminsignalViewAPI,
  });

  const { data: supports = [] } = useQuery({
    queryKey: ["supports"],
    queryFn: admincomsViewAPI,
  });

  const { data: reports = [] } = useQuery({
    queryKey: ["reports"],
    queryFn: adminreportviewAPI,
  });

  const filterByDate = (items) =>
    items?.filter((item) => {
      const createdAt = new Date(item.timestamp);
      const from = startDate ? new Date(startDate) : null;
      const to = endDate ? new Date(endDate) : null;
      return (!from || createdAt >= from) && (!to || createdAt <= to);
    });

  const filteredDistress = filterByDate(distress);
  const filteredSupports = filterByDate(supports);
  const filteredReports = filterByDate(reports);

  const Section = ({ title, data, type }) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      {data.length === 0 ? (
        <p className="text-gray-600">No data available for the selected date range.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((item) => {
            const formattedDate = item.timestamp
              ? format(new Date(item.timestamp), "PPP p")
              : "Invalid date";

            const locationText =
              typeof item.location === "object"
                ? `Lat: ${item.location.latitude}, Long: ${item.location.longitude}`
                : item.location || "Unknown Location";

            return (
              <div key={item._id} className="bg-white rounded-2xl shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                {!item.anonymous && (
                  <p className="text-gray-800">
                    <strong>Name:</strong> {item?.userId?.username || item?.name || "Anonymous"}
                  </p>
                )}
                {type === "report" && item.reportType && (
                  <p className="text-gray-800"><strong>Incident:</strong> {item.reportType}</p>
                )}
                <p className="text-gray-700"><strong>Date:</strong> {formattedDate}</p>
                <p className="text-gray-700">
                  <strong>Location:</strong>{" "}
                  <a
                    href={`https://www.google.com/maps?q=${item?.location?.latitude || ""},${item?.location?.longitude || ""}`}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map
                  </a>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const handleLogout = () => {
    dispatch(logoutAction());
    sessionStorage.clear();
    window.location.href = "/";
  };

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
            <li><a href="/admin/admin-dashboard" className="flex items-center space-x-2 hover:text-blue-400"><FaChartBar /><span>Dashboard</span></a></li>
            <li><a href="/admin/userlist" className="flex items-center space-x-2 hover:text-blue-400"><FaUser /><span>Users</span></a></li>
            <li><a href="/admin/signallist" className="flex items-center space-x-2 hover:text-blue-400"><FaSignal /><span>Distress Signals</span></a></li>
            <li><a href="/admin/supportlist" className="flex items-center space-x-2 hover:text-blue-400"><FaHandsHelping /><span>Community Support</span></a></li>
            <li><a href="/admin/reportslist" className="flex items-center space-x-2 hover:text-blue-400"><FaFileAlt /><span>Incident Reports</span></a></li>
            <li>
              <div onClick={toggleEdures} className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
                <FaBook /><span>Educational Resources</span><FaChevronDown className={`${isEduresOpen ? "rotate-180" : ""} transition-transform`} />
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
                  <li><a href="/admin/piechart" className="flex items-center space-x-2 hover:text-blue-400"> <FaCaretDown /><span>Analysis Report</span></a></li>
                  <li><a href="/admin/datereport" className="flex items-center space-x-2 hover:text-blue-400"> <FaCaretDown /><span>Datewise Report</span></a></li>
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

      {/* Main Content */}
      <main className="flex-1 bg-white p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Datewise Reports</h1>

        {/* Date Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-gray-800">From:</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="p-2 rounded border border-gray-300"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-gray-800">To:</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="p-2 rounded border border-gray-300"
            />
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Clear Filter
          </button>
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Conditionally Render Sections */}
        {startDate || endDate ? (
          !error && (
            <>
            
              <Section title="Distress Signals" data={filteredDistress} type="distress" />
              <Section title="Community Support Requests" data={filteredSupports} type="support" />
              <Section title="Incident Reports" data={filteredReports} type="report" />
            </>
          )
        ) : (
          <p className="text-gray-600">Please select a date range to view the reports.</p>
        )}
      </main>
    </div>
  );
};

export default Datewisereports;
