
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Quality', path: '/quality' },
    { name: 'Export', path: '/export' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  location.pathname === link.path 
                    ? 'text-blue-700 border-b-2 border-blue-700 pb-1' 
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center">
              <div id="google_translate_element"></div>
            </div>

            <Link 
              to="/admin" 
              className="bg-slate-900 text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-blue-700 transition-all"
            >
              ADMIN
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <div id="google_translate_element_mobile" className="scale-75 origin-right">
              {/* Note: Google Translate usually needs one unique element, we target the desktop one but can clone it for mobile if needed, or just let the main one sit in the mobile menu */}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-down fixed inset-x-0 top-20 bottom-0 overflow-y-auto z-40">
          <div className="px-4 pt-4 pb-20 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-lg font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="px-4 py-2 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Market Language</p>
              <div id="google_translate_element_internal"></div>
            </div>

            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-4 rounded-xl text-lg font-bold text-white bg-slate-900 text-center"
            >
              Admin Portal
            </Link>
            <div className="pt-8 text-center text-slate-400 text-xs uppercase tracking-widest font-bold">
              Serving Global Industries
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
