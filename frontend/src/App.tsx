import React, { useState } from 'react';
import WallCalculator from './components/WallCalculator';
import SlabCalculator from './components/SlabCalculator';

function App() {
  const [activeCalculator, setActiveCalculator] = useState<'wall' | 'slab'>('wall');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-12 w-12 mr-4" />
              <h1 className="text-3xl font-bold text-gray-900">
                Calculadora de Materiais
              </h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveCalculator('wall')}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeCalculator === 'wall'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Parede
              </button>
              <button
                onClick={() => setActiveCalculator('slab')}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeCalculator === 'slab'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Laje
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            {activeCalculator === 'wall' ? (
              <WallCalculator />
            ) : (
              <SlabCalculator />
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Calculadora de Materiais para Construção. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;