import React from 'react';
import { Logo } from './Logo';

export const FooterLogoInstitutional: React.FC = () => {
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
      variant="footer" 
      size={isMobile ? 'mobile' : 'desktop'}
    />
  );
};

