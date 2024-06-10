import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-gray-600 text-sm">
          &copy; {currentYear} Recipe Sharing. All rights reserved.
        </p>
        <nav className="mt-4 space-x-6">
          {/* Add your footer links here */}
          <a href="#" className="hover:text-teal-500">Terms of Use</a>
          <a href="#" className="hover:text-teal-500">Privacy Policy</a>
          <a href="#" className="hover:text-teal-500">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;