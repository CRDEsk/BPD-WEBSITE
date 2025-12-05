import React from 'react';

export const WatermarkShield: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center">
      <svg 
        width="400" 
        height="450" 
        viewBox="0 0 72 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path 
          d="M36 6C45.6 12.2 56.2 15.2 66 16.5V37C66 53.3 55.4 67.8 36 76C16.6 67.8 6 53.3 6 37V16.5C15.8 15.2 26.4 12.2 36 6Z"
          stroke="#4A1414" 
          strokeWidth="2" 
          fill="none"
        />
        <circle cx="36" cy="24" r="2.5" stroke="#4A1414" strokeWidth="1.6" fill="none"/>
        <circle cx="27" cy="35" r="2.5" stroke="#4A1414" strokeWidth="1.6" fill="none"/>
        <circle cx="45" cy="35" r="2.5" stroke="#4A1414" strokeWidth="1.6" fill="none"/>
        <path 
          d="M36 26.8V38M33 35H39M29.8 35L36 28.8M42.2 35L36 28.8"
          stroke="#4A1414" 
          strokeWidth="1.6" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

