import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h1 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-3 text-xl text-neutral-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-neutral-200">
          {children}
        </div>

        <footer className="mt-12 text-center text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} ArchiMate - Calculadora de Materiais para Construção</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;