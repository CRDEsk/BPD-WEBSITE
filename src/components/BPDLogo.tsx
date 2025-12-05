import React from 'react';
import { motion } from 'framer-motion';

interface BPDLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const BPDLogo: React.FC<BPDLogoProps> = ({ className = '', size = 40, showText = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Shield outline - thicker, more solid */}
        <path
          d="M50 10 L75 15 L85 30 L85 60 L75 85 L50 110 L25 85 L15 60 L15 30 L25 15 Z"
          stroke="#8A1E1E"
          strokeWidth="4"
          fill="none"
        />
        {/* Circuit/USB connector symbol inside shield */}
        <g stroke="#8A1E1E" strokeWidth="3" fill="none">
          {/* Central vertical line */}
          <line x1="50" y1="75" x2="50" y2="55" />
          {/* Branch up-right */}
          <line x1="50" y1="55" x2="65" y2="40" />
          <circle cx="65" cy="40" r="3.5" fill="#8A1E1E" />
          {/* Branch down-right */}
          <line x1="50" y1="55" x2="65" y2="70" />
          <circle cx="65" cy="70" r="3.5" fill="#8A1E1E" />
          {/* Branch down-left */}
          <line x1="50" y1="55" x2="35" y2="70" />
          <circle cx="35" cy="70" r="3.5" fill="#8A1E1E" />
        </g>
      </svg>
      {showText && (
        <motion.div 
          className="flex flex-col leading-tight"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xl font-bold text-bpd-gray tracking-tight">BPD</span>
          <div className="flex flex-col text-[10px] text-bpd-gray/60 uppercase tracking-[0.15em] font-medium leading-tight">
            <span>BUREAU DE</span>
            <span>PROTECTION</span>
            <span>DIGITALE</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

