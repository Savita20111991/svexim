
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Link, useLocation, useSearchParams } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

// --- CONSTANTS & DATA ---
const COMPANY_NAME = "Savita Global Group of Industries";
const CONTACT_PHONE = "+91 9506943134";
const OFFICE_ADDRESS = "302, Parth A, 3/11, Patel Colony, Jamnagar, Gujarat-361008";

const CATEGORIES = ['Machinery', 'Machinery Tools', 'Brass Components', 'SS Components', 'Precision Components'];

const INITIAL_PRODUCTS = [
  {
    id: 'M1',
    name: 'Industrial CNC Lathe - XP Series',
    category: 'Machinery',
    description: 'High-precision heavy-duty CNC lathe with linear guideways and 8-station hydraulic turret.',
    application: 'Automotive shaft production and aerospace fasteners.',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  {
    id: 'M2',
    name: 'Vertical Machining Center (VMC) - 850',
    category: 'Machinery',
    description: 'High-speed machining center with 8000 RPM spindle and 24-tool ATC.',
    application: 'Die and mold manufacturing and medical device components.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  {
    id: 'M3',
    name: 'Hydraulic H-Frame Press - 500T',
    category: 'Machinery',
    description: 'Double-acting heavy-duty hydraulic press for deep drawing and metal forming.',
    application: 'Automotive panel production and sheet metal components.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  {
    id: 'M7',
    name: 'Surface Grinding Machine - Auto Feed',
    category: 'Machinery',
    description: 'Automatic precision surface grinder with hydraulic feed for mirror-finish results.',
    application: 'Precision finishing of die sets and industrial tool steel.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  ...Array.from({ length: 56 }).map((_, i) => ({
    id: `GEN-${i}`,
    name: `Industrial ${CATEGORIES[i % CATEGORIES.length]} Component Unit X-${i+100}`,
    category: CATEGORIES[i % CATEGORIES.length],
    description: `High-grade ${CATEGORIES[i % CATEGORIES.length]} component engineered for global export markets.`,
    application: "General engineering, automotive, and high-precision structural assemblies.",
    image: `https://images.unsplash.com/photo-${1581091226825 + i}?auto=format&fit=crop&q=80&w=1200`,
    manufacturedIn: "India"
  }))
];

const LEADERSHIP = {
  ceo: {
    name: "Mrs. Savita Devi",
    designation: "Chief Executive Officer (CEO)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    message: "Redefining industrial excellence with every component we export."
  },
  opsHead: {
    name: "Mr. Shailesh Yadav",
    designation: "Operational Manager",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    message: "Zero-defect manufacturing and global delivery are our core ethics."
  }
};

// --- COMPONENTS ---
const Logo = ({ light }) => (
  <div className="flex items-center gap-3 cursor-pointer group">
    <div className="relative w-12 h-12 logo-3d">
      <div className={`absolute inset-0 border-4 rounded-xl transform rotate-45 transition-all duration-1000 group-hover:rotate-[225deg] ${light ? 'border-white' : 'border-blue-900'}`}></div>
      <div className={`absolute inset-0 border-4 rounded-xl transform -rotate-45 transition-all duration-1000 group-hover:rotate-[-225deg] ${light ? 'border-blue-400' : 'border-blue-600'} opacity-60`}></div>
      <div className={`absolute inset-0 flex items-center justify-center font-black text-xl ${light ? 'text-white' : 'text-blue-900'}`}>SV</div>
    </div>
    <div className="flex flex-col leading-none">
      <span className={`font-bold text-xl ${light ? 'text-white' : 'text-blue-950'}`}>SAVITA GLOBAL</span>
      <span className={`text-[10px] uppercase tracking-[0.3em] font-extrabold ${light ? 'text-blue-300' : 'text-blue-600'}`}>Group of Industries</span>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-20 items-center">
        <Link to="/"><Logo /></Link>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(l => (
            <Link key={l.path} to={l.path} className={`text-sm font-bold transition-colors ${location.pathname === l.path ? 'text-blue-700' : 'text-slate-600 hover:text-blue-600'}`}>
              {l.name}
            </Link>
          ))}
          <div id="google_translate_element"></div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-xl">
          {navLinks.map(l => (
            <Link key={l.path} to={l.path} onClick={() => setIsOpen(false)} className="text-xl font-bold py-2">{l.name}</Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-16">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2"><Logo light /><p className="mt-6 max-w-sm">A global leader in industrial manufacturing and export excellence. Precision-engineered components for the world's most demanding industries.</p></div>
      <div><h3 className="text-white font-bold mb-6">Contact</h3><p>{OFFICE_ADDRESS}</p><p className="mt-4">{CONTACT_PHONE}</p></div>
      <div><h3 className="text-white font-bold mb-6">Compliance</h3><p className="text-sm">ISO 9001:2015</p><p className="text-sm">Export House Registered</p></div>
    </div>
    <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">© 2024 {COMPANY_NAME}. All rights reserved.</div>
  </footer>
);

// --- PAGES ---
const Home = () => (
  <div>
    <section className="relative h-[85vh] flex items-center justify-center text-center">
      <div className="absolute inset-0 -z-10">
        <img src="https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover brightness-50" alt="" />
      </div>
      <div className="max-w-4xl px-4 text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-slide-up">Powering Global Industry with Precision</h1>
        <p className="text-xl mb-12 opacity-90 leading-relaxed">Manufacturing high-performance industrial machinery and precision components for export to 45+ countries.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/products" className="bg-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl">View Catalog</Link>
          <Link to="/contact" className="bg-white/10 backdrop-blur-md px-10 py-5 rounded-2xl font-bold text-lg border border-white/20">Request Quote</Link>
        </div>
      </div>
    </section>
  </div>
);

const Products = () => {
  const [params] = useSearchParams();
  const catFilter = params.get('category') || 'All';
  const filtered = catFilter === 'All' ? INITIAL_PRODUCTS : INITIAL_PRODUCTS.filter(p => p.category === catFilter);

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Export-Grade Catalog</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-[2rem] shadow-sm overflow-hidden group hover:shadow-2xl transition-all border border-gray-100 flex flex-col">
              <div className="h-64 bg-slate-100 flex items-center justify-center overflow-hidden">
                <img src={p.image} alt={p.name} className={`w-full h-full transition-transform group-hover:scale-105 ${p.category === 'Machinery' ? 'object-contain p-6' : 'object-cover'}`} />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{p.category}</span>
                <h3 className="text-xl font-bold mb-4">{p.name}</h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">{p.description}</p>
                <div className="bg-blue-50 p-4 rounded-xl text-xs font-bold text-slate-700">{p.application}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- APP ENTRY ---
const App = () => {
  const location = useLocation();
  useEffect(() => window.scrollTo(0, 0), [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div className="py-20 text-center"><h1>About Page</h1><p>Precision manufacturing excellence since 1998.</p></div>} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<div className="py-20 text-center"><h1>Contact Us</h1><p>Call {CONTACT_PHONE} for technical inquiries.</p></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<Router><App /></Router>);
