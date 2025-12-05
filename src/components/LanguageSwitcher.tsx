import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 border-l border-[#E0DAD4] pl-3 ml-3">
      <button
        onClick={() => setLanguage('fr')}
        className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.1em] transition-colors ${
          language === 'fr'
            ? 'text-bpd-red font-semibold'
            : 'text-bpd-ink/60 hover:text-bpd-ink'
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <span className="text-bpd-grey/40">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.1em] transition-colors ${
          language === 'en'
            ? 'text-bpd-red font-semibold'
            : 'text-bpd-ink/60 hover:text-bpd-ink'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};

