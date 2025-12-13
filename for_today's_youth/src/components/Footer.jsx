import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">FTY</span>
              </div>
              <h3 className="font-bold text-lg">For Today's Youth</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering youth with career guidance and skill development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-sky-400 transition">Home</Link></li>
              <li><Link to="/courses" className="hover:text-sky-400 transition">Courses</Link></li>
              <li><Link to="/jobs" className="hover:text-sky-400 transition">Jobs</Link></li>
              <li><Link to="/contact" className="hover:text-sky-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-sky-400 transition">Career Guide</a></li>
              <li><a href="#" className="hover:text-sky-400 transition">Skill Tests</a></li>
              <li><a href="#" className="hover:text-sky-400 transition">Course Library</a></li>
              <li><a href="#" className="hover:text-sky-400 transition">Jobs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="mailto:info@fortodaysyouth.com" className="hover:text-sky-400 transition">info@fortodaysyouth.com</a></li>
              <li><a href="tel:+1234567890" className="hover:text-sky-400 transition">+1 (234) 567-890</a></li>
              <li className="pt-2">
                <div className="flex gap-3">
                  <a href="#" className="text-sky-400 hover:text-sky-300">Twitter</a>
                  <a href="#" className="text-sky-400 hover:text-sky-300">LinkedIn</a>
                  <a href="#" className="text-sky-400 hover:text-sky-300">Instagram</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} For Today's Youth. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-sky-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-sky-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-sky-400 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
