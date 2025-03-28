import React, { useState } from 'react';
import { MATERIAL_PRICES, DEFAULT_DIMENSIONS, calculateSlabMaterials } from '../config/calculations';

interface SlabDimensions {
  length: number;
  width: number;
  thickness: number;
}

interface Material {
  name: string;
  unit: string;
  quantity: number;
  price: number;
  description: string;
}

const SlabCalculator: React.FC = () => {
  const [dimensions, setDimensions] = useState<SlabDimensions>({
    length: 0,
    width: 0,
    thickness: DEFAULT_DIMENSIONS.laje.thickness,
  });

  const [materials, setMaterials] = useState<Material[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateDimensions = () => {
    if (dimensions.length <= 0) {
      setError('O comprimento deve ser maior que zero');
      return false;
    }
    if (dimensions.width <= 0) {
      setError('A largura deve ser maior que zero');
      return false;
    }
    if (dimensions.thickness < DEFAULT_DIMENSIONS.laje.minThickness) {
      setError(`A espessura mínima recomendada é ${DEFAULT_DIMENSIONS.laje.minThickness}m`);
      return false;
    }
    if (dimensions.thickness > DEFAULT_DIMENSIONS.laje.maxThickness) {
      setError(`A espessura máxima recomendada é ${DEFAULT_DIMENSIONS.laje.maxThickness}m`);
      return false;
    }
    setError(null);
    return true;
  };

  const calculateMaterials = () => {
    if (!validateDimensions()) return;

    const results = calculateSlabMaterials(dimensions);

    setMaterials([
      {
        name: MATERIAL_PRICES.concreto_usinado.name,
        unit: MATERIAL_PRICES.concreto_usinado.unit,
        quantity: results.concreto_usinado,
        price: MATERIAL_PRICES.concreto_usinado.price,
        description: MATERIAL_PRICES.concreto_usinado.description,
      },
      {
        name: MATERIAL_PRICES.cimento.name,
        unit: MATERIAL_PRICES.cimento.unit,
        quantity: results.cimento,
        price: MATERIAL_PRICES.cimento.price,
        description: MATERIAL_PRICES.cimento.description,
      },
      {
        name: MATERIAL_PRICES.areia.name,
        unit: MATERIAL_PRICES.areia.unit,
        quantity: results.areia,
        price: MATERIAL_PRICES.areia.price,
        description: MATERIAL_PRICES.areia.description,
      },
      {
        name: MATERIAL_PRICES.brita.name,
        unit: MATERIAL_PRICES.brita.unit,
        quantity: results.brita,
        price: MATERIAL_PRICES.brita.price,
        description: MATERIAL_PRICES.brita.description,
      },
      {
        name: MATERIAL_PRICES.aco.name,
        unit: MATERIAL_PRICES.aco.unit,
        quantity: results.aco,
        price: MATERIAL_PRICES.aco.price,
        description: MATERIAL_PRICES.aco.description,
      },
      {
        name: MATERIAL_PRICES.arame.name,
        unit: MATERIAL_PRICES.arame.unit,
        quantity: results.arame,
        price: MATERIAL_PRICES.arame.price,
        description: MATERIAL_PRICES.arame.description,
      },
      {
        name: MATERIAL_PRICES.agua.name,
        unit: MATERIAL_PRICES.agua.unit,
        quantity: results.agua,
        price: MATERIAL_PRICES.agua.price,
        description: MATERIAL_PRICES.agua.description,
      },
      {
        name: MATERIAL_PRICES.madeira.name,
        unit: MATERIAL_PRICES.madeira.unit,
        quantity: results.madeira,
        price: MATERIAL_PRICES.madeira.price,
        description: MATERIAL_PRICES.madeira.description,
      },
      {
        name: MATERIAL_PRICES.pregos.name,
        unit: MATERIAL_PRICES.pregos.unit,
        quantity: results.pregos,
        price: MATERIAL_PRICES.pregos.price,
        description: MATERIAL_PRICES.pregos.description,
      },
      {
        name: MATERIAL_PRICES.plastico.name,
        unit: MATERIAL_PRICES.plastico.unit,
        quantity: results.plastico,
        price: MATERIAL_PRICES.plastico.price,
        description: MATERIAL_PRICES.plastico.description,
      },
    ]);

    setShowResults(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? 0 : parseFloat(value);
    setDimensions(prev => ({
      ...prev,
      [name]: numericValue,
    }));
    setShowResults(false);
    setError(null);
  };

  const totalCost = materials.reduce((sum, material) => sum + (material.quantity * material.price), 0);
  const totalArea = dimensions.length * dimensions.width;
  const totalVolume = totalArea * dimensions.thickness;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Calculadora de Laje</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comprimento
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                name="length"
                value={dimensions.length || ''}
                onChange={handleInputChange}
                className="input pr-12"
                min="0"
                step="0.1"
                placeholder="0.0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">m</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: 4.0m
            </p>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Largura
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                name="width"
                value={dimensions.width || ''}
                onChange={handleInputChange}
                className="input pr-12"
                min="0"
                step="0.1"
                placeholder="0.0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">m</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: 3.0m
            </p>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Espessura
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                name="thickness"
                value={dimensions.thickness || ''}
                onChange={handleInputChange}
                className="input pr-12"
                min="0"
                step="0.02"
                placeholder="0.0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">m</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: {DEFAULT_DIMENSIONS.laje.thickness}m
            </p>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Informações da Laje</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-gray-500">Área Total:</span>
              <p className="text-lg font-semibold">{totalArea.toFixed(2)} m²</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Volume Total:</span>
              <p className="text-lg font-semibold">{totalVolume.toFixed(2)} m³</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Peso Aproximado:</span>
              <p className="text-lg font-semibold">{(totalVolume * 2400).toFixed(0)} kg</p>
            </div>
          </div>
        </div>

        <button
          onClick={calculateMaterials}
          className="w-full btn btn-primary"
        >
          Calcular Materiais
        </button>
      </div>

      {showResults && materials.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Resultados</h3>
            <button
              onClick={() => window.print()}
              className="btn btn-secondary text-sm"
            >
              Imprimir
            </button>
          </div>

          <div className="space-y-4">
            {materials.map((material, index) => (
              <div key={index} className="flex justify-between items-start py-2 border-b last:border-0">
                <div>
                  <span className="font-medium text-gray-900">{material.name}</span>
                  <p className="text-xs text-gray-500">{material.description}</p>
                  <span className="text-sm text-gray-500">
                    {material.quantity.toFixed(2)} {material.unit}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-900">
                    R$ {(material.quantity * material.price).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 block">
                    R$ {material.price.toFixed(2)} / {material.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Custo Total</span>
              <span className="text-2xl font-bold text-primary">
                R$ {totalCost.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlabCalculator;