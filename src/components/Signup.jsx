import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAPI } from '../services/userServices';
import { jwtDecode } from 'jwt-decode';
import { registerUserAction } from '../redux/Userslice'

const validationSchema = yup.object().shape({
  username: yup.string().min(5, 'Please enter a name with at least 5 characters').required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
  
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function Signup() {
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["Userregister"],
  
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = await mutateAsync(values);   
        sessionStorage.setItem("userToken", token);
        const decodedData = jwtDecode(token);
        dispatch(registerUserAction(decodedData));
        
          resetForm();
          navigate("/homepage");
        
      } catch (error) {
        console.error("Signup Error:", error);
      }
    },
});


  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/signup-bg.jpg')" }}>
      <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-xl shadow-lg w-full max-w-sm p-6 mr-15">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Create an Account</h2>
        {isError && <p className="text-red-500 text-center">{error.message}</p>}
        <form onSubmit={formik.handleSubmit}>
          
          {/* Full Name */}
          <div className="mb-4 relative">
            <label className="block text-gray-900 font-medium">Username</label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-3 text-gray-600" />
              <input
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-3 py-2 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="Enter the username"
              />
            </div>
            {formik.touched.username && formik.errors.username && <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>}
          </div>

          {/* Email */}
          <div className="mb-4 relative">
            <label className="block text-gray-900 font-medium">Email</label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3 text-gray-600" />
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-3 py-2 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="Enter your email"
              />
            </div>
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-4 relative">
            <label className="block text-gray-900 font-medium">Phone Number</label>
            <div className="relative flex items-center">
              <FaPhone className="absolute left-3 text-gray-600" />
              <input
                type="text"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-3 py-2 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="Enter your phone number"
              />
            </div>
            {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>}
          </div>

          

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-gray-900 font-medium">Password</label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3 text-gray-600" />
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-3 py-2 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="Create a password"
              />
            </div>
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md text-lg cursor-pointer"
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-900 mt-4 text-sm">
          Already have an account? <a href="/Login" className="text-purple-900 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
