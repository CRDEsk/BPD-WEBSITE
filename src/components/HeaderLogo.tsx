import React from 'react';
import { motion } from 'framer-motion';

interface HeaderLogoProps {
  scrolled?: boolean;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ scrolled = false }) => {
  return (
    <motion.div
      className="flex items-center gap-3"
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Favicon icon with smooth size animation */}
      <motion.img 
        src="/favicon.svg" 
        alt="BPD" 
        className="flex-shrink-0"
        animate={{
          width: scrolled ? 48 : 64,
          height: scrolled ? 48 : 64,
          scale: scrolled ? 0.92 : 1,
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0, 0.2, 1],
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        style={{
          objectFit: 'contain',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}
      />
      
      {!scrolled && (
        <motion.div
          className="flex flex-col leading-tight"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.4, 0, 0.2, 1],
            delay: 0.1
          }}
        >
          <span className="text-xl font-bold text-bpd-gray tracking-tight">BPD</span>
          <div className="flex flex-col text-[9px] text-bpd-gray/70 uppercase tracking-[0.2em] font-medium leading-tight mt-0.5">
            <span>BUREAU DE</span>
            <span>PROTECTION</span>
            <span>DIGITALE</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

