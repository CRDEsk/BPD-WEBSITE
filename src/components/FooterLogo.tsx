import React from 'react';

export const FooterLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      {/* Original footer logo image */}
      <img 
        src="/footer.png" 
        alt="Bureau de Protection Digitale" 
        className="flex-shrink-0"
        style={{
          width: 'auto',
          height: '80px',
          maxWidth: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))'
        }}
      />
    </div>
  );
};

