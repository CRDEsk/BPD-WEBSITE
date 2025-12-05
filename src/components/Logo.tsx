import React from 'react';

interface LogoProps {
  variant?: 'header' | 'footer';
  size?: 'desktop' | 'mobile';
  scrolled?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'header', 
  size = 'desktop',
  scrolled = false 
}) => {
  // Fixed sizes - pixel perfect, government-grade
  const iconSize = variant === 'header' 
    ? (size === 'mobile' ? 36 : scrolled ? 44 : 48)
    : (size === 'mobile' ? 44 : 52); // Footer slightly larger
  
  const isFooter = variant === 'footer';
  const isMobile = size === 'mobile';
  
  // Use favicon.svg as the icon
  const ShieldIcon = () => (
    <img 
      src="/favicon.svg" 
      alt=""
      width={iconSize}
      height={iconSize}
      className="flex-shrink-0"
      aria-hidden="true"
      style={{
        filter: isFooter 
          ? 'brightness(0) invert(1)' // White for footer
          : 'none' // Red for header (original color)
      }}
    />
  );

  if (isFooter) {
    return (
      <div 
        className="flex items-center flex-shrink-0" 
        aria-label="Bureau de Protection Digitale"
        style={{ gap: '14px' }} // Slightly more space for larger icon
      >
        <ShieldIcon />
        <div className="flex flex-col justify-center" style={{ lineHeight: '1.1' }}>
          <span 
            className="font-bold text-white" 
            style={{ 
              fontSize: '17px',
              fontWeight: '700',
              letterSpacing: '-0.01em',
              marginBottom: '2px' // Tighter spacing to subtitle
            }}
          >
            BPD
          </span>
          <div 
            className="text-gray-300 font-medium"
            style={{
              fontSize: '9px',
              letterSpacing: '0.25em', // +5 letter-spacing as requested
              fontVariant: 'small-caps', // True small caps
              lineHeight: '1.25' // Tighter line-height
            }}
          >
            <span className="block">BUREAU DE</span>
            <span className="block">PROTECTION</span>
            <span className="block">DIGITALE</span>
          </div>
        </div>
      </div>
    );
  }

  // Header variant - Government-grade precision
  return (
    <div 
      className="flex items-center flex-shrink-0" 
      aria-label="Bureau de Protection Digitale"
      style={{ 
        minHeight: isMobile ? '44px' : (scrolled ? '50px' : '56px'),
        minWidth: isMobile ? '140px' : '180px',
        gap: isMobile ? '10px' : '12px' // Tighter gap - government style
      }}
    >
      <ShieldIcon />
      <div className="flex flex-col justify-center flex-shrink-0" style={{ minWidth: isMobile ? '100px' : '120px', lineHeight: '1.1' }}>
        <span 
          className="font-bold text-bpd-ink" 
          style={{ 
            fontSize: isMobile ? '18px' : scrolled ? '20px' : '22px',
            fontWeight: '700', // Heavier weight
            letterSpacing: '-0.02em' // Tighter tracking
          }}
        >
          BPD
        </span>
        <div 
          className="text-bpd-red font-medium leading-[1.2] mt-0.5"
          style={{
            fontSize: isMobile ? '7px' : '8px',
            letterSpacing: '0.12em', // Tighter letter-spacing for subtitle
            fontVariant: 'small-caps' // True small caps
          }}
        >
          <span className="block">BUREAU DE</span>
          <span className="block">PROTECTION</span>
          <span className="block">DIGITALE</span>
        </div>
      </div>
    </div>
  );
};

