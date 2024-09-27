// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-white py-1 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Classroom & Timetable Generator. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a  className="hover:underline">Privacy Policy</a>
          <a  className="hover:underline">Terms of Service</a>
          <a  className="hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
