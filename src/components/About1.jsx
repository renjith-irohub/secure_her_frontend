import React from 'react';

const About1 = () => {
  return (
    <div>
      {/* About Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto flex flex-wrap">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold">About SecureHer</h1>
            <p className="mt-4 text-gray-700">
              SecureHer is a comprehensive women's safety application designed to enhance security and provide immediate assistance in emergencies.
              It offers features like real-time location tracking, distress signal alerts, community support,
              and educational resources. Our mission is to empower women by leveraging technology and community engagement to create a safer world.
            </p>
            <p className="mt-4 text-gray-700">
               In today's world, safety is a fundamental right, and SecureHer aims to empower women by providing a reliable and efficient safety tool.
              SecureHer is more than just an application; it is a movement towards a safer world for women. By leveraging technology and community engagement,
              we strive to provide a protective shield for every woman, empowering her with confidence and security wherever she goes.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img src="images/womens.jpg" alt="Women Safety" className="h-80 rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About1;