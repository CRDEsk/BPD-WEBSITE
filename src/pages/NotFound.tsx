import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-bpd-paper flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl sm:text-7xl font-bold text-bpd-red mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-bpd-ink mb-4 title-border-left">
            Page non trouvée
          </h2>
          <p className="text-bpd-ink/80 mb-6">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-bpd-red text-white font-semibold uppercase tracking-[0.1em] hover:bg-bpd-red-soft transition-colors text-center"
          >
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-bpd-red text-bpd-red font-semibold uppercase tracking-[0.1em] hover:bg-bpd-red hover:text-white transition-colors"
          >
            Page précédente
          </button>
        </div>
        <div className="mt-8 pt-6 border-t border-[#D0CAC4]">
          <p className="text-sm text-bpd-grey">
            Si vous pensez qu'il s'agit d'une erreur, veuillez{' '}
            <Link to="/#contact" className="text-bpd-red hover:underline">
              nous contacter
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
};

