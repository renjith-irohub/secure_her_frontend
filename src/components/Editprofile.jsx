import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editProfileAPI, getUserProfileAPI } from '../services/userServices';

const Editprofile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch user profile
  const { data: userProfile, isLoading, isError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfileAPI,
  });

  const mutation = useMutation({
    mutationKey: ['editProfile'],
    mutationFn: editProfileAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile']);
      alert('✅ Profile updated successfully!');
      navigate('/userprofile');
    },
    onError: (error) => {
      alert('❌ Error updating profile: ' + error.message);
    },
  });

  // Editable profile state
  const [updatedProfile, setUpdatedProfile] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    image: null, // File object
    imagePreview: '', // For preview only
  });

  useEffect(() => {
    if (userProfile?.user) {
      setUpdatedProfile({
        username: userProfile.user.username || '',
        email: userProfile.user.email || '',
        phone: userProfile.user.phone || '',
        address: userProfile.user.address || '',
        image: null,
        imagePreview: userProfile.user.image || '',
      });
    }
  }, [userProfile]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleimageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedProfile((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', updatedProfile.username);
    formData.append('email', updatedProfile.email);
    formData.append('phone', updatedProfile.phone);
    formData.append('address', updatedProfile.address);
    if (updatedProfile.image) {
      formData.append('image', updatedProfile.image);
    }

    mutation.mutate(formData);
  };

  if (isLoading) return <div className="text-center py-10">Loading profile...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error loading profile.</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-2/5 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-black-700 mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleProfileSubmit} encType="multipart/form-data" className="space-y-4">
          <div className="flex flex-col items-center">
            {updatedProfile.imagePreview ? (
              <img
                src={updatedProfile.imagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md object-cover mb-3"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold mb-3 border-4 border-gray-300 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-24 h-24 text-gray-500">
                  <path fillRule="evenodd" d="M12 14c3.86 0 7 3.14 7 7v1H5v-1c0-3.86 3.14-7 7-7zm0-2c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5z" clipRule="evenodd"/>
                </svg>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleimageChange} className="mt-2" />
          </div>

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
                name={key}
                value={updatedProfile[key]}
                onChange={handleProfileChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/userprofile')}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 mt-1"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editprofile;
