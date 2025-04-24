import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { comsAPI } from '../services/comsServices';


const Coms = () => {
  let sharedLocation = '';

  const { mutateAsync } = useMutation({
    mutationFn: comsAPI,
    mutationKey: ["Coms"],
  });
  
  const formik = useFormik({
    initialValues: {
      name: '',
      longitude: '',
      latitude:'',
      requestDetails: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      longitude: Yup.string().required('Longitude is required'),
      latitude: Yup.string().required('Latitude is required'),
      requestDetails: Yup.string().required('Please describe the support needed'),
    }),
    
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync(values);
        alert(`🚨 Support request submitted!\nName: ${values.name}\nLocation: ${values.latitude},${values.longitude}\nNeed: ${values.requestDetails}`);
        resetForm();
        sharedLocation = '';
        document.getElementById('location-status').textContent = '';
      } catch (error) {
        alert('❌ Failed to submit request. Please try again.');
      }
    },
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          formik.setValues((prevValues) => ({
            ...prevValues,
            latitude,
            longitude
          }));
          alert(`📍 Location captured: ${latitude}, ${longitude}`);
          document.getElementById('location-status').textContent = `✅ Location shared: ${latitude}, ${longitude}`;
        },
        () => {
          alert('⚠️ Location access denied. Please enter your location manually.');
          document.getElementById('location-status').textContent = '❌ Location not shared';
        }
      );
    } else {
      alert('⚠️ Geolocation is not supported by your browser.');
      document.getElementById('location-status').textContent = '❌ Location not supported';
    }  
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">🆘 Request Community Support</h2>
      <form onSubmit={formik.handleSubmit} className="w-3/4 bg-white p-6 rounded-2xl shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-900 font-medium">Your Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full p-4 border-2 rounded-lg focus:outline-none border-gray-300"
            placeholder="Enter your name"
          />
          {formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 font-medium">Location</label>
          <button
            type="button"
            onClick={getLocation}
            className="w-full p-4 border-2 rounded-lg focus:outline-none border-blue-500 bg-blue-100 hover:bg-blue-200"
          >
            📍 Share Current Location
          </button>
          <p id="location-status" className="text-sm text-gray-700 mt-2"></p>
          {formik.errors.location && <p className="text-red-500 text-sm">{formik.errors.location}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 font-medium">What support do you need?</label>
          <textarea
            name="requestDetails"
            value={formik.values.requestDetails}
            onChange={formik.handleChange}
            className="w-full p-4 border-2 rounded-lg focus:outline-none border-gray-300"
            placeholder="Describe the situation and support needed"
            rows="3"
          />
          {formik.errors.requestDetails && <p className="text-red-500 text-sm">{formik.errors.requestDetails}</p>}
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 cursor-pointer"
        >
          Request Support
        </button>
      </form>
    </div>
  );
};

export default Coms;
