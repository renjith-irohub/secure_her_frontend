import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Adminlogin() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Admin Login Data", values);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-blue-100">
      <div className="flex flex-col md:flex-row bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-4xl">
        <div
          className="hidden md:block w-1/2 h-auto rounded-l-2xl"
          style={{
            backgroundImage: "url('/images/womens.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="p-12 w-full md:w-1/2 flex flex-col justify-center bg-white/50 backdrop-blur-lg rounded-r-2xl shadow-xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Welcome Back
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-gray-900 font-medium text-lg">
                Username
              </label>
              <div className="relative flex items-center">
                <FaUser className="absolute left-4 text-gray-600 text-lg" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-12 pr-4 py-3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 shadow-md text-lg"
                  placeholder="Enter your username"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-gray-900 font-medium text-lg">
                Password
              </label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-gray-600 text-lg" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-12 pr-4 py-3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 shadow-md text-lg"
                  placeholder="Enter your password"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg text-xl font-semibold cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
