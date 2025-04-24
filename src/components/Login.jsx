import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginAPI } from "../services/userServices";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { loginUserAction } from "../redux/Userslice";
import { useState } from "react";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
});

async function loginUser(credentials) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

export default function Login() {
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["Userlogin"],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const token = await mutateAsync(values);   
      sessionStorage.setItem("userToken", token);
      const decodedData = jwtDecode(token);
      dispatch(loginUserAction(decodedData));
        if(decodedData.name === "Admin"){
          navigate('/admin/admin-dashboard')
        }
        else{
          navigate('/homepage');
        }
      }
    }
  )

  return (
    <div
      className="flex min-h-screen items-center justify-center p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/women-safety-bg.jpg')" }}
    >
      <div className="flex flex-col md:flex-row bg-white/20 rounded-xl shadow-lg backdrop-blur-xl w-full max-w-7xl h-auto md:h-[600px]">
        <div
          className="hidden md:block w-1/2 h-full rounded-l-xl"
          style={{
            backgroundImage: "url('/images/women-safety-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="p-10 w-full md:w-1/2 flex flex-col justify-center bg-white/20 backdrop-blur-2xl rounded-r-xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 drop-shadow-md mb-6">
            Welcome Back
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5 relative">
              <label className="block text-gray-900 font-medium">Email</label>
              <div className="relative flex items-center">
                <FaUser className="absolute left-3 text-gray-600" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...formik.getFieldProps("email")}
                  className="w-full pl-10 pr-3 py-3 mt-1 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                  placeholder="Enter your email"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-5 relative">
              <label className="block text-gray-900 font-medium">Password</label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-3 text-gray-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-10 pr-3 py-3 mt-1 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                  placeholder="Enter your password"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
              )}
              <a
                href="/forgot-password"
                className="text-sm text-purple-800 font-semibold hover:underline mt-2 inline-block"
              >
                Forgot Password?
              </a>
            </div>

            {isError && <p className="text-red-500 text-sm">{error.message}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md text-lg cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-900 mt-5">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-purple-800 font-semibold hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
 );
}
