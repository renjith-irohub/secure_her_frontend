import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { forgotPswdAPI } from '../services/userServices';

function Forgotpassword() {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const { mutateAsync, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: forgotPswdAPI,
    onSuccess: (data) => {
      console.log('Password reset email sent to:', data);
    },
    onError: (err) => {
      console.error('Error:', err);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await mutateAsync({ email: values.email });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-4">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your email and we'll send you a password reset link.
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
          {isSuccess && (
            <p className="text-green-600 text-sm text-center mt-2">
              Reset link sent successfully!
            </p>
          )}
          {isError && (
            <p className="text-red-600 text-sm text-center mt-2">
              {error?.response?.data?.message || 'Something went wrong'}
            </p>
          )}
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Remembered your password?{' '}
          <a href="/login" className="text-purple-600 hover:underline font-medium">
            Go back to login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Forgotpassword;
