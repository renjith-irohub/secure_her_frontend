import React from 'react';
import {
  FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaBook, FaChevronDown,
  FaPlusCircle, FaEye, FaSignOutAlt, FaClipboardList, FaCaretDown
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminviewResAPI, deleteResAPI } from '../services/resourcesServices';

const Viewedures = () => {
  const [isEduresOpen, setIsEduresOpen] = React.useState(false);
  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);
  const [isReportOpen, setIsReportOpen] = React.useState(false);
  const toggleReport = () => setIsReportOpen(!isReportOpen);
  const queryClient = useQueryClient();

  const { data: resources = [], isLoading, isError } = useQuery({
    queryKey: ['educational-resources'],
    queryFn: adminviewResAPI
  });

  const deleteMutation = useMutation({
    mutationKey: ['delete-resource'],
    mutationFn: deleteResAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['educational-resources']);
    }
  });

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleDownload = (content) => {
    const link = document.createElement("a");
    link.href = content;
    link.setAttribute("download", "resource.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
                  <li><a href="/admin/piechart" className="flex items-center space-x-2 hover:text-blue-400"> <FaCaretDown /><span>Analysis Report</span></a></li>
                  <li><a href="/admin/datereport" className="flex items-center space-x-2 hover:text-blue-400"> <FaCaretDown /><span>Datewise Report</span></a></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-white-600 w-full">
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* View Resources Section */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Educational Resources</h1>

        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-600">Failed to load resources.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <div key={resource._id} className="bg-white shadow-lg rounded-2xl p-6 flex flex-col transform transition duration-500 hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{resource.title}</h2>
              <p className="text-gray-700 mb-4">{resource.description}</p>

              {/* Media container with fixed height */}
              <div className="w-full h-64 overflow-hidden rounded-lg bg-black flex items-center justify-center mb-4">
                {resource.resourceType === 'image' && (
                  <img src={resource.content} alt="img" className="object-cover w-full h-full" />
                )}
                {resource.resourceType === 'video' && (
                  <video controls className="w-full h-full object-cover">
                    <source src={resource.content} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              {/* Link */}
              {(resource.resourceType === 'image') && (
                  <a
                    href={resource.link || resource.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium mt-auto"
                  >
                    🔗 Access Resource
                  </a>
                )}

              {/* Download & Delete Buttons */}
              <div className="mt-auto flex flex-col md:flex-row gap-3">
                <button
                  onClick={() => handleDelete(resource._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 w-full md:w-auto"
                >
                  Delete
                </button>
                
              </div>
            </div>
            
          ))}
          
        </div>
      </div>
    </div>
    
  );
  
};

export default Viewedures;
