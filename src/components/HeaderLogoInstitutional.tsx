import React from 'react';
import { Logo } from './Logo';

interface HeaderLogoInstitutionalProps {
  scrolled?: boolean;
}

export const HeaderLogoInstitutional: React.FC<HeaderLogoInstitutionalProps> = ({ scrolled = false }) => {
  // Detect mobile
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <Logo 
      variant="header" 
      size={isMobile ? 'mobile' : 'desktop'}
      scrolled={scrolled}
    />
  );
};

