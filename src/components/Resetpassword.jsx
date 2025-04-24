import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { resetPswdAPI } from "../services/userServices";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const {
    mutate: resetPassword,
    isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: resetPswdAPI,
    onSuccess: () => {
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: () => {
      setMessage("Failed to reset password. Try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    resetPassword({ email, token, newPassword });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-5 border border-blue-100"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">Reset Password</h2>
        <p className="text-center text-gray-600 mb-4 text-sm">
          Please enter and confirm your new password.
        </p>
        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
        {message && (
          <p
            className={`text-center text-sm mt-2 font-medium ${
              message.includes("successful") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
