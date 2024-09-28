// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-white py-1 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Abhijit Maske. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a  className="hover:underline">Privacy Policy</a>
          <a  className="hover:underline" target='_blank' href='https://github.com/abhijit7498'>Github</a>
          <a  className="hover:underline" target='_blank' href='https://www.linkedin.com/in/abhijit-maske-58751925a/'>Linkedin</a>
          <a  className="hover:underline" target='_blank' href='https://www.instagram.com/abhi__maske/#'>Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
