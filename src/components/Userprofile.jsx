import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserProfileAPI, changePswdAPI } from '../services/userServices';

const Userprofile = () => {
  const navigate = useNavigate();

  const { data: userProfile, isLoading, isError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfileAPI,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const mutation = useMutation({
    mutationKey: ['changepswd'],
    mutationFn: changePswdAPI,
    onSuccess: () => {
      alert('✅ Password changed successfully!');
      setIsChangingPassword(false);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    },
    onError: () => {
      alert('❌ Failed to change password. Please try again.');
    },
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('❌ New password and confirm password do not match!');
      return;
    }
    mutation.mutate({
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading user profile...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading user profile.</p>;

  const user = userProfile?.user;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      {/* Back Button */}
      <div className="w-2/5 max-w-lg mb-4 self-start pl-6">
        <button 
        onClick={() => navigate('/cusset')} 
        className="absolute top-20 right-10 bg-blue-700 text-white px-8 py-2 rounded-lg shadow-lg hover:bg-blue-800 transition duration-200"
      >
        Back to settings
      </button>
      </div>

      {/* Profile Card */}
      <div className="w-2/5 max-w-lg bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-black-700 text-center mb-6">User Profile</h2>

        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md mb-4 overflow-hidden">
            {user.image ? (
              <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
            ) : user?.photo ? (
              <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 14c3.86 0 7 3.14 7 7v1H5v-1c0-3.86 3.14-7 7-7zm0-2c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        {[
          { label: 'Name', key: 'username' },
          { label: 'Email', key: 'email' },
          { label: 'Phone Number', key: 'phone' },
          { label: 'Address', key: 'address' },
        ].map(({ label, key }) => (
          <div className="mb-4" key={key}>
            <label className="block text-gray-700 font-medium">{label}</label>
            <input
              type="text"
              value={user?.[key] || ''}
              disabled
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            onClick={() => navigate('/editprofile')}
          >
            Edit Profile
          </button>
          <button
            className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => setIsChangingPassword(!isChangingPassword)}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Change Password Form */}
      {isChangingPassword && (
        <form onSubmit={handleChangePasswordSubmit} className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">🔒 Change Password</h3>
          {['oldPassword', 'newPassword', 'confirmPassword'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 font-medium">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="password"
                name={field}
                value={passwordData[field]}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => setIsChangingPassword(false)}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Userprofile;
