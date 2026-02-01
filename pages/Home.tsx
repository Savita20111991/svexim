
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, INITIAL_PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  useEffect(() => {
    const stored = localStorage.getItem('savita_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80&w=1920" 
            alt="Cargo Ship Export" 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <span className="inline-block bg-blue-600 text-xs font-bold px-4 py-1 rounded-full mb-6 uppercase tracking-widest animate-pulse">
            Premium Industrial Exporter
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl">
            Powering Global Industry with Precision Engineering
          </h1>
          <p className="text-lg md:text-xl mb-10 text-slate-200 max-w-2xl leading-relaxed">
            Savita Global Group of Industries delivers world-class industrial machinery, brass components, and precision tools to markets across 6 continents.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
              Explore Products
            </Link>
            <Link to="/contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all">
              Request Quotation
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Export Markets', value: '45+' },
            { label: 'Live SKUs', value: products.length + '+' },
            { label: 'Years Experience', value: '25+' },
            { label: 'Satisfied Clients', value: '1200+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Manufacturing Core</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We specialize in a diverse range of high-performance industrial components manufactured to exact international specifications.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((cat, i) => (
              <Link 
                key={i} 
                to={`/products?category=${cat}`}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="text-8xl font-black italic">{i + 1}</div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{cat}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">High-grade manufacturing solutions for precision {cat.toLowerCase()} requirements.</p>
                <div className="flex items-center text-blue-600 text-sm font-bold group-hover:translate-x-2 transition-transform">
                  View Series <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Export Visual Section */}
      <section className="relative py-32 overflow-hidden bg-blue-900">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1494412574743-0194849a6421?auto=format&fit=crop&q=80&w=1920" 
            alt="Logistics" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready for Global Distribution</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Our strategic location and robust logistics network allow us to deliver bulky machinery and precision components to any port worldwide with unmatched reliability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="text-3xl mb-3">🚢</div>
              <div className="text-white font-bold">Sea Freight</div>
              <p className="text-blue-100 text-xs mt-2">Containerized shipping for large machinery loads.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="text-3xl mb-3">✈️</div>
              <div className="text-white font-bold">Air Express</div>
              <p className="text-blue-100 text-xs mt-2">Rapid delivery for precision small components.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="text-3xl mb-3">📦</div>
              <div className="text-white font-bold">Custom Packaging</div>
              <p className="text-blue-100 text-xs mt-2">Industrial grade anti-corrosive export packing.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
