import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { viewResAPI } from '../services/resourcesServices';

const Educationalresources = () => {
  const { data: resources = [], isLoading, isError, error } = useQuery({
    queryKey: ['educationalResources'],
    queryFn: viewResAPI,
  });

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-green-800 mb-6">📚 Educational Resources</h2>
      <div className="w-11/12 md:w-3/4 bg-white p-6 rounded-2xl shadow-lg">
        {isLoading ? (
          <p className="text-lg text-gray-600">Loading resources...</p>
        ) : isError ? (
          <p className="text-lg text-red-600">Error: {error.message}</p>
        ) : resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <div
                key={resource._id}
                className="bg-gray-100 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-2">{resource.title}</h3>
                {resource.description && (
                  <p className="text-gray-700 mb-2">{resource.description}</p>
                )}
                <p className="text-sm text-gray-600 mb-2">📝 Type: {resource.type || resource.resourceType}</p>

                {/* Media Preview */}
                <div className="mb-2">
                  {resource.resourceType === 'image' && (
                    <img src={resource.content} alt="img" className="rounded-lg" />
                  )}
                  {resource.resourceType === 'video' && (
                    <video controls className="w-full rounded-lg">
                      <source src={resource.content} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>

                {/* Link */}
                <a
                  href={resource.link || resource.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  🔗 Access Resource
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg">No resources available at the moment. Check back later!</p>
        )}
      </div>
    </div>
  );
};

export default Educationalresources;
