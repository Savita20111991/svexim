
import React from 'react';

const Quality: React.FC = () => {
  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Zero Defect Policy</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-slate-900">Quality & Certifications</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Our commitment to precision is backed by rigorous testing protocols and international standard certifications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
              <span className="text-blue-600 text-3xl">🛡️</span> Quality Assurance
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              At Savita Global, quality is not a department, it's a culture. Every precision component undergoes a 7-stage quality check including chemical analysis, dimensional accuracy tests using CMM, and surface finish inspection.
            </p>
            <ul className="space-y-4">
              {['In-house Spectroscopy', 'Profile Projector Testing', 'Hardness Testing (HRC/HRB)', 'Surface Roughness Verification', 'Salt Spray Testing for SS/Brass'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { title: 'ISO 9001:2015', icon: '📋', desc: 'Quality Management System' },
              { title: 'MSME', icon: '🇮🇳', desc: 'Govt. Registered Enterprise' },
              { title: 'EEPC', icon: '🚢', desc: 'Export Promotion Council' },
              { title: 'CE Marked', icon: '🇪🇺', desc: 'European Compliance' },
            ].map((cert, i) => (
              <div key={i} className="bg-blue-900 p-8 rounded-3xl text-white text-center hover:bg-blue-800 transition-colors">
                <div className="text-4xl mb-4">{cert.icon}</div>
                <div className="font-bold mb-1">{cert.title}</div>
                <div className="text-[10px] uppercase text-blue-300 tracking-widest">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-12 rounded-[2rem] border border-slate-100 text-center">
          <h2 className="text-2xl font-bold mb-8">Precision Testing Laboratory</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <img src="https://images.unsplash.com/photo-1579154235602-3c375549880f?auto=format&fit=crop&q=80&w=400" className="rounded-2xl h-48 w-full object-cover shadow-md" alt="Lab 1" />
            <img src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=400" className="rounded-2xl h-48 w-full object-cover shadow-md" alt="Lab 2" />
            <img src="https://images.unsplash.com/photo-1582719202047-76d3432ee323?auto=format&fit=crop&q=80&w=400" className="rounded-2xl h-48 w-full object-cover shadow-md" alt="Lab 3" />
            <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400" className="rounded-2xl h-48 w-full object-cover shadow-md" alt="Lab 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quality;
