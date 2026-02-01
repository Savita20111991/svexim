
import React, { useState, useEffect } from 'react';
import { INITIAL_LEADERSHIP } from '../constants';

const About: React.FC = () => {
  const [leadership, setLeadership] = useState(INITIAL_LEADERSHIP);

  useEffect(() => {
    const stored = localStorage.getItem('savita_leadership');
    if (stored) {
      setLeadership(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Our Legacy</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-8 text-slate-900 leading-tight">
              Decades of Manufacturing & Exporting Excellence
            </h1>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                Founded on the principles of precision and integrity, Savita Global Group of Industries has emerged as a powerhouse in the industrial export sector. We began as a specialized manufacturing unit for brass components and have expanded into a multi-vertical industrial conglomerate.
              </p>
              <p>
                Our vision is rooted in engineering brilliance, providing the strategic foundation that allows us to innovate and scale across complex machinery and high-precision components.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
              alt="Industrial Plant" 
              className="rounded-2xl shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-8 rounded-2xl shadow-xl z-20 hidden md:block">
              <div className="text-4xl font-bold">25+</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-widest">Years of Trust</div>
            </div>
          </div>
        </div>

        {/* Authority / Leadership Section */}
        <div className="space-y-32">
          {/* CEO Section */}
          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 relative h-96 md:h-auto">
                <img 
                  src={leadership.ceo.image} 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
              <div className="md:col-span-3 p-8 md:p-16 flex flex-col justify-center">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">{leadership.ceo.name}</h2>
                  <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">{leadership.ceo.designation}</p>
                </div>
                <div className="relative italic text-xl text-slate-700 leading-relaxed mb-8">
                  <span className="absolute -top-6 -left-4 text-6xl text-blue-100 font-serif">"</span>
                  {leadership.ceo.message}
                </div>
                <div className="h-1 w-20 bg-blue-600 rounded"></div>
              </div>
            </div>
          </div>

          {/* Operations Head Section */}
          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3 p-8 md:p-16 flex flex-col justify-center order-2 md:order-1">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">{leadership.opsHead.name}</h2>
                  <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">{leadership.opsHead.designation}</p>
                </div>
                <div className="relative italic text-xl text-slate-700 leading-relaxed mb-8">
                  <span className="absolute -top-6 -left-4 text-6xl text-blue-100 font-serif">"</span>
                  {leadership.opsHead.message}
                </div>
                <div className="h-1 w-20 bg-blue-600 rounded"></div>
              </div>
              <div className="md:col-span-2 relative h-96 md:h-auto order-1 md:order-2">
                <img 
                  src={leadership.opsHead.image} 
                  alt="Operations Head" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
