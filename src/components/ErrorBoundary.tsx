import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-bpd-paper flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white border border-[#E0DAD4] p-8 text-center">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-bpd-ink mb-2 title-border-left">
                Erreur
              </h1>
              <p className="text-bpd-ink/80 mb-4">
                Une erreur inattendue s'est produite.
              </p>
              {this.state.error && (
                <details className="text-left text-sm text-bpd-grey mb-4 p-3 bg-bpd-paper border border-[#E0DAD4]">
                  <summary className="cursor-pointer font-semibold mb-2">
                    Détails techniques
                  </summary>
                  <pre className="text-xs overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-bpd-red text-white font-semibold hover:bg-bpd-red-soft transition-colors"
              >
                Recharger la page
              </button>
              <Link
                to="/"
                className="px-6 py-2 border border-bpd-red text-bpd-red font-semibold hover:bg-bpd-red hover:text-white transition-colors text-center"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

