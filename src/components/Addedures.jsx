import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaChartBar, FaUser, FaSignal, FaHandsHelping,FaCaretDown, FaFileAlt, FaClipboardList,FaBook, FaPlusCircle, FaEye, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import { addeduResAPI } from '../services/resourcesServices';

const Addedures = () => {
  const [isEduresOpen, setIsEduresOpen] = useState(false);

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const toggleReport = () => setIsReportOpen(!isReportOpen);

  // Destructuring mutate function from useMutation hook
  const { mutateAsync, isLoading, isError, isSuccess } = useMutation({
    mutationFn: addeduResAPI,
    mutationKey: ["Addedures"],
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      resourceType: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      resourceType: Yup.string().oneOf(['image', 'video'], 'Invalid type').required('Resource type is required'),
      content: Yup.mixed()
  .required("Content is required")
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Submitting form", values); 
      const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("resourceType", values.resourceType);
        formData.append("content", values.content);

      mutateAsync(formData, {
        onSuccess: () => {
          alert('Educational resource added successfully!');
          resetForm();
        },
        onError: () => {
          alert('Failed to add resource. Please try again.');
        },
      });
    },
  });
    

  const handleLogout = () => {
    window.location.href = '/';
  };
  console.log(formik.errors);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex">
      <aside className="w-72 bg-gray-900 text-white p-6 hidden md:block">
        <div className="flex items-center space-x-3 mb-6">
          <img src="/images/logo.png" alt="SecureHer Logo" className="h-12" />
          <h2 className="text-xl font-bold">SecureHer</h2>
        </div>
        <nav>
          <ul className="space-y-6 text-md">
            <li><a href="/admin/admin-dashboard" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaChartBar /> <span>Dashboard</span></a></li>
            <li><a href="/admin/userlist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaUser /> <span>Users</span></a></li>
            <li><a href="/admin/signallist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaSignal /> <span>Distress Signals</span></a></li>
            <li><a href="/admin/supportlist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaHandsHelping /> <span>Community Support</span></a></li>
            <li><a href="/admin/reportslist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaFileAlt /> <span>Incident Reports</span></a></li>
            <li>
              <div onClick={toggleEdures} className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
                <FaBook /> <span>Educational Resources</span> <FaChevronDown />
              </div>
              {isEduresOpen && (
                <ul className="pl-6 space-y-4">
                  <li><a href="/admin/addedures" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaPlusCircle /> <span>Add Resource</span></a></li>
                  <li><a href="/admin/viewedures" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaEye /> <span>View Resources</span></a></li>
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

      <div className="flex-1 p-8 flex justify-center items-center">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="bg-white shadow-2xl rounded-3xl p-8 w-150 hover:shadow-2xl">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Add Educational Resource</h1>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} placeholder="Enter resource title" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200" required />
            {formik.errors.title && <p className="text-red-500 text-sm">{formik.errors.title}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea name="description" value={formik.values.description} onChange={formik.handleChange} placeholder="Provide a brief description" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200" required></textarea>
            {formik.errors.description && <p className="text-red-500 text-sm">{formik.errors.description}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Resource Type</label>
            <select name="resourceType" value={formik.values.resourceType} onChange={formik.handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200">
            <option value="" disabled>Select resource type</option> 
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Upload File</label>
            <input type="file" name="content" onChange={(event) => formik.setFieldValue('content', event.currentTarget.files[0])} />
            {formik.errors.content && <p className="text-red-500 text-sm">{formik.errors.content}</p>}
          </div>
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-110 w-full cursor-pointer">
            {isLoading ? "Adding..." : "Add Resource"}
          </button>
          {isError && <p className="text-red-500 text-sm mt-2">Failed to add resource. Try again.</p>}
          {isSuccess && <p className="text-green-500 text-sm mt-2">Resource added successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default Addedures;
