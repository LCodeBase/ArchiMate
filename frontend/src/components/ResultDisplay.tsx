import React from 'react';
import TipCard from './TipCard';
import Card from './Card';

interface ResultDisplayProps {
  results: {
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
  };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  const { brickCalculation, mortarCalculation, concreteCalculation } = results;

  // Função para gerar sugestões de otimização
  const generateOptimizationTips = () => {
    const tips = [];

    if (brickCalculation) {
      tips.push('Considere comprar 5% a mais de tijolos para compensar quebras durante o transporte e instalação.');
      tips.push('Utilize tijolos de tamanho maior para reduzir a quantidade de argamassa necessária.');
    }

    if (mortarCalculation) {
      tips.push('Prepare a argamassa em pequenas quantidades para evitar desperdício por secagem prematura.');
      tips.push('Utilize misturadores mecânicos para obter uma mistura mais homogênea e econômica.');
    }

    if (concreteCalculation) {
      tips.push('Para pequenos volumes, considere concreto usinado para evitar desperdícios.');
      tips.push('Utilize fôrmas de qualidade e bem vedadas para evitar vazamentos de concreto.');
    }

    return tips;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Resultados do Cálculo</h2>

      {brickCalculation && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Tijolos/Blocos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Quantidade de Tijolos</p>
              <p className="text-xl font-bold">{Math.ceil(brickCalculation.brickCount)} unidades</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Cimento para Assentamento</p>
              <p className="text-xl font-bold">{formatNumber(brickCalculation.cementAmount)} kg</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Areia para Assentamento</p>
              <p className="text-xl font-bold">{formatNumber(brickCalculation.sandAmount)} kg</p>
            </div>
          </div>
        </div>
      )}

      {mortarCalculation && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Argamassa</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Cimento</p>
              <p className="text-xl font-bold">{formatNumber(mortarCalculation.cementAmount)} kg</p>
              <p className="text-sm text-gray-500">{Math.ceil(mortarCalculation.cementAmount / 50)} sacos de 50kg</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Areia</p>
              <p className="text-xl font-bold">{formatNumber(mortarCalculation.sandAmount)} m³</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Água</p>
              <p className="text-xl font-bold">{formatNumber(mortarCalculation.waterAmount)} litros</p>
            </div>
          </div>
        </div>
      )}

      {concreteCalculation && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Concreto</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <p className="text-sm text-neutral-600 mb-1">Volume de Concreto</p>
              <p className="text-2xl font-bold text-blue-800">{formatNumber(concreteCalculation.concreteVolume)} <span className="text-sm font-normal text-neutral-500">m³</span></p>
            </div>
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <p className="text-sm text-neutral-600 mb-1">Cimento</p>
              <p className="text-2xl font-bold text-blue-800">{concreteCalculation.cementBags} <span className="text-sm font-normal text-neutral-500">sacos</span></p>
              <p className="text-sm text-neutral-500 mt-1">{formatNumber(concreteCalculation.cementBags * 50)} kg</p>
            </div>
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <p className="text-sm text-neutral-600 mb-1">Areia</p>
              <p className="text-2xl font-bold text-blue-800">{formatNumber(concreteCalculation.sandVolume)} <span className="text-sm font-normal text-neutral-500">m³</span></p>
            </div>
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <p className="text-sm text-neutral-600 mb-1">Brita</p>
              <p className="text-2xl font-bold text-blue-800">{formatNumber(concreteCalculation.gravelVolume)} <span className="text-sm font-normal text-neutral-500">m³</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Tips */}
      {(brickCalculation || mortarCalculation || concreteCalculation) && (
        <TipCard tips={generateOptimizationTips()} className="mt-8" />
      )}
    </div>
  );
};

export default ResultDisplay;