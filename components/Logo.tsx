
import React from 'react';

const Logo: React.FC<{ light?: boolean }> = ({ light }) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="relative w-12 h-12 logo-3d transition-transform duration-700 group-hover:scale-110">
        {/* Layered 3D Geometrical Structure */}
        <div className={`absolute inset-0 border-4 rounded-xl transform rotate-45 transition-all duration-1000 group-hover:rotate-[225deg] ${light ? 'border-white' : 'border-blue-900'}`}></div>
        <div className={`absolute inset-0 border-4 rounded-xl transform -rotate-45 transition-all duration-1000 group-hover:rotate-[-225deg] ${light ? 'border-blue-400' : 'border-blue-600'} opacity-60`}></div>
        <div className={`absolute inset-2 border-2 rounded-full border-dashed animate-spin-slow ${light ? 'border-blue-200' : 'border-blue-300'}`}></div>
        <div className={`absolute inset-0 flex items-center justify-center font-black text-xl tracking-tighter ${light ? 'text-white' : 'text-blue-900'}`}>
          SV
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-bold text-lg md:text-xl tracking-tighter ${light ? 'text-white' : 'text-blue-950'}`}>
          SAVITA GLOBAL
        </span>
        <span className={`text-[10px] uppercase tracking-[0.3em] font-extrabold mt-0.5 ${light ? 'text-blue-300' : 'text-blue-600'}`}>
          Group of Industries
        </span>
      </div>
    </div>
  );
};

export default Logo;
