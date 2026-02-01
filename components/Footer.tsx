
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { CONTACT_PHONE, OFFICE_ADDRESS, COMPANY_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Logo light />
          <p className="mt-6 text-sm leading-relaxed text-slate-400">
            A global leader in industrial manufacturing and export excellence. Precision-engineered components for the world's most demanding industries.
          </p>
        </div>
        
        <div>
          <h3 className="text-white font-bold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link to="/quality" className="hover:text-white transition-colors">Quality Control</Link></li>
            <li><Link to="/export" className="hover:text-white transition-colors">Export Markets</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="text-blue-400">📍</span>
              {OFFICE_ADDRESS}
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400">📞</span>
              {CONTACT_PHONE}
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400">✉️</span>
              info@savitaglobal.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            <div className="bg-slate-800 px-3 py-1 text-xs border border-slate-700 rounded">ISO 9001:2015</div>
            <div className="bg-slate-800 px-3 py-1 text-xs border border-slate-700 rounded">Export House</div>
            <div className="bg-slate-800 px-3 py-1 text-xs border border-slate-700 rounded">MSME Registered</div>
          </div>
          <div className="mt-8">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all">
              Download Catalog
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved. | Crafted for Export Excellence.</p>
      </div>
    </footer>
  );
};

export default Footer;
