import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
    
        {/* Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">QUICK LINKS</h2>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-400">Home</a></li>
              <li><a href="/about" className="hover:text-gray-400">About</a></li>
              <li><a href="/services" className="hover:text-gray-400">Services</a></li>
            </ul>
          </div>

          {/* About SecureHer */}
          <div>
            <h2 className="text-lg font-bold mb-4">About SecureHer</h2>
            <p className="text-gray-400 text-sm">
              SecureHer is dedicated to ensuring the safety of women through advanced technology, real-time alerts, and community engagement.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
          <div className="flex flex-col items-center">
            <i className="fa fa-mobile text-2xl mb-2"></i>
            <a href="#" className="hover:text-gray-400">Emergency Helpline: 1800-123-456</a>
          </div>
          <div className="flex flex-col items-center">
            <i className="fa fa-envelope text-2xl mb-2"></i>
            <a href="#" className="hover:text-gray-400">support@secureher.com</a>
          </div>
          <div className="flex flex-col items-center">
            <i className="fa fa-map-marker text-2xl mb-2"></i>
            <a href="#" className="hover:text-gray-400">Find Safe Zones Near You</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;