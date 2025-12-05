import React from 'react';
import { BPDLogo } from './BPDLogo';

interface BPDLogoFullProps {
  className?: string;
  logoSize?: number;
  variant?: 'light' | 'dark';
}

export const BPDLogoFull: React.FC<BPDLogoFullProps> = ({ 
  className = '', 
  logoSize = 50,
  variant = 'light'
}) => {
  const textColor = variant === 'light' ? 'text-bpd-gray' : 'text-white';
  const subtitleColor = variant === 'light' ? 'text-bpd-gray/60' : 'text-gray-400';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <BPDLogo size={logoSize} />
      <div className="flex flex-col leading-tight">
        <span className={`text-2xl font-bold ${textColor} tracking-tight`}>
          BPD
        </span>
        <div className={`text-[10px] ${subtitleColor} tracking-[0.15em] uppercase font-medium leading-tight mt-0.5`}>
          <div>BUREAU</div>
          <div>DE PROTECTION</div>
          <div>DIGITALE</div>
        </div>
      </div>
    </div>
  );
};

