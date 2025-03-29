import { useState } from 'react'
import BrickCalculator from './components/BrickCalculator'
import MortarCalculator from './components/MortarCalculator'
import ConcreteCalculator from './components/ConcreteCalculator'
import ResultDisplay from './components/ResultDisplay'
import Layout from './components/Layout'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<string>('tijolos');
  const [results, setResults] = useState<{
    brickCalculation?: {
      brickCount: number;
      cementAmount: number;
      sandAmount: number;
    };
    mortarCalculation?: {
      cementAmount: number;
      sandAmount: number;
      waterAmount: number;
    };
    concreteCalculation?: {
      concreteVolume: number;
      cementBags: number;
      sandVolume: number;
      gravelVolume: number;
    };
  }>({});

  const handleBrickCalculation = (result: {
    brickCount: number;
    cementAmount: number;
    sandAmount: number;
  }) => {
    setResults(prev => ({
      ...prev,
      brickCalculation: result
    }));
  };

  const handleMortarCalculation = (result: {
    cementAmount: number;
    sandAmount: number;
    waterAmount: number;
  }) => {
    setResults(prev => ({
      ...prev,
      mortarCalculation: result
    }));
  };

  const handleConcreteCalculation = (result: {
    concreteVolume: number;
    cementBags: number;
    sandVolume: number;
    gravelVolume: number;
  }) => {
    setResults(prev => ({
      ...prev,
      concreteCalculation: result
    }));
  };

  return (
    <Layout title="Calculadora de Materiais para Construção" subtitle="Calcule a quantidade de materiais necessários para sua obra">
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'tijolos' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('tijolos')}
          >
            Tijolos/Blocos
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'argamassa' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('argamassa')}
          >
            Argamassa
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'concreto' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('concreto')}
          >
            Concreto para Lajes
          </button>
        </div>

        {/* Calculator Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {activeTab === 'tijolos' && <BrickCalculator onCalculate={handleBrickCalculation} />}
              {activeTab === 'argamassa' && <MortarCalculator onCalculate={handleMortarCalculation} />}
              {activeTab === 'concreto' && <ConcreteCalculator onCalculate={handleConcreteCalculation} />}
            </div>

            <div>
              {(results.brickCalculation || results.mortarCalculation || results.concreteCalculation) && (
                <ResultDisplay results={results} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
