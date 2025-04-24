import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { viewUserAPI, verifyUserAPI } from '../services/userServices';
import { 
  FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaBook, FaChevronDown,FaClipboardList, FaCaretDown,
  FaPlusCircle, FaEye, FaSignOutAlt 
} from "react-icons/fa";

const Userlist = () => {
  const [isEduresOpen, setIsEduresOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch users
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: viewUserAPI,
  });

  // Optimistic update mutation
  const mutation = useMutation({
    mutationFn: verifyUserAPI,
    onMutate: async (newData) => {
      await queryClient.cancelQueries(['users']);

      const previousUsers = queryClient.getQueryData(['users']);

      queryClient.setQueryData(['users'], (oldData) => {
        return {
          ...oldData,
          userCount: oldData.userCount.filter(user => user._id !== newData.id)
        };
      });

      return { previousUsers };
    },
    onError: (error, newData, context) => {
      queryClient.setQueryData(['users'], context.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  const users = data?.userCount || [];

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);
  const toggleReport = () => setIsReportOpen(!isReportOpen);

  const handleVerify = (id) => {
    mutation.mutate({ id: id, status: 'approved' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      mutation.mutate({ id: id, status: 'rejected' });
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/";
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users.</div>;

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
              <div onClick={handleLogout} className="flex items-center space-x-2 text-white hover:text-gray-400 cursor-pointer">
                <FaSignOutAlt /> <span>Logout</span>
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Users List</h1>
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
              <tr>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Location</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Phone</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id} className="border-b bg-gray-50 hover:bg-blue-50 transition duration-300">
                  <td className="py-3 px-6 font-medium text-gray-800">{user.username}</td>
                  <td className="py-3 px-6 text-gray-700">
                    {typeof user.location === "object" ? (
                      <a href={`https://www.google.com/maps?q=${user.location.latitude},${user.location.longitude}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Location</a>
                    ) : (
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(user.location)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Location</a>
                    )}
                  </td>
                  <td className="py-3 px-6 text-gray-700">{user.email}</td>
                  <td className="py-3 px-6 text-gray-700">{user.phone}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    {user.verified ? (
                      <p className="text-green-600 font-semibold">Verified</p>
                    ) : (
                      <>
                        <button onClick={() => handleVerify(user._id)} className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transform transition duration-200 hover:scale-105">Verify</button>
                        <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transform transition duration-200 hover:scale-105">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
