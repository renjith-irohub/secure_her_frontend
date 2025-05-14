import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { viewResAPI } from '../services/resourcesServices';

const Educationalresources = () => {
  const { data: resources = [], isLoading, isError, error } = useQuery({
    queryKey: ['educationalResources'],
    queryFn: viewResAPI,
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Filtered resources based on search input
  const filteredResources = resources.filter((resource) => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-green-800 mb-6">📚 Educational Resources</h2>

      {/* Search Bar */}
      <div className="w-11/12 md:w-3/4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search resources by title or description..."
          className="w-full p-4 border-2 rounded-xl focus:outline-none border-green-600 focus:border-green-600"
        />
      </div>

      <div className="w-11/12 md:w-3/4 bg-white p-6 rounded-2xl shadow-lg">
        {isLoading ? (
          <p className="text-lg text-gray-600">Loading resources...</p>
        ) : isError ? (
          <p className="text-lg text-red-600">Error: {error.message}</p>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource._id}
                className="bg-gray-100 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-2">{resource.title}</h3>
                {resource.description && (
                  <p className="text-gray-700 mb-2">{resource.description}</p>
                )}

                {/* Media Preview */}
                <div className="mb-2 w-full h-64 overflow-hidden rounded-lg bg-black flex items-center justify-center">
                  {resource.resourceType === 'image' && (
                    <img
                      src={resource.content}
                      alt="img"
                      className="object-cover w-full h-full"
                    />
                  )}
                  {resource.resourceType === 'video' && (
                    <video controls className="w-full h-full object-cover">
                      <source src={resource.content} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>

                {/* Link */}
                {(resource.resourceType === 'image') && (
                  <a
                    href={resource.link || resource.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium mt-auto"
                  >
                    🔗 Access Resource
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg">No resources found for your search. Try something else!</p>
        )}
      </div>
    </div>
  );
};

export default Educationalresources;
