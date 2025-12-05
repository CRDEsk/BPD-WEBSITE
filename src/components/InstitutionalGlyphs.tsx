import React from 'react';

interface GlyphProps {
  type: 'creators' | 'entrepreneurs' | 'families' | 'professionals';
  className?: string;
}

export const InstitutionalGlyph: React.FC<GlyphProps> = ({ type, className = '' }) => {
  const color = '#111111'; // Pure monochrome - government style
  const strokeWidth = '1.5'; // Consistent 1-2px line weight
  
  const glyphs = {
    creators: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="7" y="9" width="26" height="18" stroke={color} strokeWidth={strokeWidth} fill="none"/>
        <path d="M11 21C13.2 18.2 16.3 16.6 20 16.6C23.7 16.6 26.8 18.2 29 21" stroke={color} strokeWidth={strokeWidth} fill="none"/>
        <circle cx="20" cy="18.5" r="1.5" fill={color}/>
        <path d="M17 29h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      </svg>
    ),
    entrepreneurs: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="12" cy="13" r="3" stroke={color} strokeWidth={strokeWidth} fill="none"/>
        <circle cx="28" cy="13" r="3" stroke={color} strokeWidth={strokeWidth} fill="none"/>
        <circle cx="20" cy="26" r="3" stroke={color} strokeWidth={strokeWidth} fill="none"/>
        <path d="M14.4 15.6L17.6 22.4M25.6 15.6L22.4 22.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      </svg>
    ),
    families: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M20 7C23.8 9.5 27.4 10.7 31 11.1V20C31 25.8 26.8 30.9 20 34C13.2 30.9 9 25.8 9 20V11.1C12.6 10.7 16.2 9.5 20 7Z" stroke={color} strokeWidth={strokeWidth} fill="none"/>
        <path d="M20 11.5C22.4 13.1 24.9 13.9 27.5 14.2V20C27.5 24 24.7 27.4 20 29.4C15.3 27.4 12.5 24 12.5 20V14.2C15.1 13.9 17.6 13.1 20 11.5Z" stroke={color} strokeWidth={strokeWidth} fill="none"/>
      </svg>
    ),
    professionals: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="20" cy="20" r="9" stroke={color} strokeWidth={strokeWidth} fill="none"/>
        <circle cx="20" cy="20" r="2.5" fill={color}/>
        <path d="M20 8v4M20 28v4M8 20h4M28 20h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      </svg>
    ),
  };
  
  return glyphs[type];
};

