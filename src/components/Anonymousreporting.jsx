import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { reportAPI } from '../services/reportServices';

const Anonymousreporting = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [mapLocation, setMapLocation] = useState('');
  const [userId, setUserId] = useState(''); // Replace with actual user ID fetching logic
  const [adminError, setAdminError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setMapLocation(`${latitude},${longitude}`);
        },
        (error) => console.error('Error fetching location:', error)
      );
    }
  }, []);

  const reportSchema = yup.object().shape({
    reportType: yup.string().required('Report type is required'),
    incidentDetails: yup
      .string()
      .min(10, 'Incident details must be at least 10 characters')
      .required('Incident details are required'),
    place: yup.string().required('Location is required'),
    anonymous: yup.string().required('Reporting method is required'),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: reportAPI,
    mutationKey: ['report'],
  });

  const formik = useFormik({
    initialValues: {
      reportType: '',
      incidentDetails: '',
      place: '',
      latitude: currentLocation.lat,
      longitude: currentLocation.lng,
      anonymous: '',
      userId: '',
    },
    validationSchema: reportSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const reportData = {
          ...values,
          latitude: currentLocation.lat,
          longitude: currentLocation.lng,
          anonymous: values.anonymous === 'true',
        };

        if (!reportData.anonymous) {
          reportData.userId = userId;
        }

        await mutateAsync(reportData);
        alert('✅ Report submitted successfully');
        resetForm();
      } catch (error) {
        if (error?.response?.data?.message === 'Please verify before logging in') {
          setAdminError('❌ Admin is not verified. Please verify before submitting a report.');
        } else {
          alert('❌ Failed to submit report. Please try again.');
        }
      }
    },
  });

  useEffect(() => {
    setMapLocation(formik.values.place.trim() || `${currentLocation.lat},${currentLocation.lng}`);
  }, [formik.values.place, currentLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-red-100 flex flex-col items-center py-12">
      <form onSubmit={formik.handleSubmit} className="w-3/4 bg-white p-6 rounded-2xl shadow-lg mt-6">
        {/* Report Type */}
        <div className="mb-4">
          <label className="block text-gray-900 font-medium">Report Type</label>
          <input
            type="text"
            name="reportType"
            value={formik.values.reportType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Select report type"
            className={`w-full p-4 border-2 rounded-xl focus:outline-none ${
              formik.touched.reportType && formik.errors.reportType ? 'border-gray-300' : 'border-gray-300'
            }`}
          />
          {formik.touched.reportType && formik.errors.reportType && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.reportType}</p>
          )}
        </div>

        {/* Incident Details */}
        <div className="mb-6">
          <label className="block text-gray-900 font-medium">Incident Details</label>
          <textarea
            name="incidentDetails"
            value={formik.values.incidentDetails}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Describe the incident in detail..."
            rows="4"
            className={`w-full p-4 border-2 rounded-xl focus:outline-none ${
              formik.touched.incidentDetails && formik.errors.incidentDetails ? 'border-gray-300' : 'border-gray-300'
            }`}
          />
          {formik.touched.incidentDetails && formik.errors.incidentDetails && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.incidentDetails}</p>
          )}
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-gray-900 font-medium">Location</label>
          <input
            type="text"
            name="place"
            value={formik.values.place}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter the location"
            className={`w-full p-4 border-2 rounded-xl focus:outline-none ${
              formik.touched.place && formik.errors.place ? 'border-gray-300' : 'border-gray-300'
            }`}
          />
          {formik.touched.place && formik.errors.place && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.place}</p>
          )}
        </div>

        {/* Map */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">📍 Location on Map</h3>
          <iframe
            width="100%"
            height="350"
            className="rounded-xl shadow-lg"
            src={`https://www.google.com/maps?q=${encodeURIComponent(mapLocation)}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        </div>

        {/* Reporting Method */}
        <div className="mb-6">
          <label className="block text-gray-900 font-medium">Reporting Method</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="anonymous"
                value="true"
                checked={formik.values.anonymous === 'true'}
                onChange={(e) => formik.setFieldValue('anonymous', e.target.value)}
                onBlur={formik.handleBlur}
              />
              <span className="ml-2">Anonymous</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="anonymous"
                value="false"
                checked={formik.values.anonymous === 'false'}
                onChange={(e) => formik.setFieldValue('anonymous', e.target.value)}
                onBlur={formik.handleBlur}
              />
              <span className="ml-2">Identified</span>
            </label>
          </div>
          {formik.touched.anonymous && formik.errors.anonymous && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.anonymous}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Report'}
        </button>

        {/* Admin Error */}
        {adminError && <p className="mt-3 text-red-600 font-medium">{adminError}</p>}
      </form>
    </div>
  );
};

export default Anonymousreporting;
