import { useState } from 'react';
import FormInput from './FormInput';
import { ConcreteIcon } from './Icons';

interface ConcreteCalculatorProps {
  onCalculate: (result: {
    concreteVolume: number;
    cementBags: number;
    sandVolume: number;
    gravelVolume: number;
  }) => void;
}

const ConcreteCalculator = ({ onCalculate }: ConcreteCalculatorProps) => {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [thickness, setThickness] = useState<number>(0);
  const [concreteType, setConcreteType] = useState<string>('1:2:3');

  // Proporções de materiais para diferentes traços de concreto
  const concreteMixes = {
    '1:2:3': { cement: 1, sand: 2, gravel: 3 },
    '1:3:4': { cement: 1, sand: 3, gravel: 4 },
    '1:2:4': { cement: 1, sand: 2, gravel: 4 }
  };

  const calculateMaterials = () => {
    if (length <= 0 || width <= 0 || thickness <= 0) return;

    // Volume em metros cúbicos
    const concreteVolume = (length * width * thickness) / 1000; // Convertendo cm para m³

    // Proporções do traço escolhido
    const mix = concreteMixes[concreteType as keyof typeof concreteMixes];

    // Fator de rendimento (1m³ de concreto requer ~1.5m³ de materiais secos)
    const totalParts = mix.cement + mix.sand + mix.gravel;

    // Cimento (1 saco = 50kg = ~0.033m³)
    const cementVolume = (concreteVolume * mix.cement) / totalParts * 1.5;
    const cementBags = Math.ceil(cementVolume / 0.033);

    // Areia e brita em m³
    const sandVolume = (concreteVolume * mix.sand) / totalParts * 1.5;
    const gravelVolume = (concreteVolume * mix.gravel) / totalParts * 1.5;

    onCalculate({
      concreteVolume,
      cementBags,
      sandVolume,
      gravelVolume
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-card">
      <div className="flex items-center mb-6">
        <ConcreteIcon size={24} className="text-info mr-3" />
        <h2 className="text-xl font-bold text-neutral-800">Cálculo de Concreto para Lajes</h2>
      </div>

      <div className="space-y-6">
        <FormInput
          label="Traço do Concreto"
          type="select"
          value={concreteType}
          onChange={setConcreteType}
          options={[
            { value: '1:2:3', label: 'Traço 1:2:3 (Estrutural)' },
            { value: '1:3:4', label: 'Traço 1:3:4 (Convencional)' },
            { value: '1:2:4', label: 'Traço 1:2:4 (Intermediário)' }
          ]}
          helpText="Proporção de cimento, areia e brita na mistura"
          required
        />

        <FormInput
          label="Comprimento"
          type="number"
          value={length || ''}
          onChange={setLength}
          min={0}
          step={0.01}
          placeholder="Digite o comprimento em metros"
          helpText="Comprimento da laje em metros (m)"
          required
        />

        <FormInput
          label="Largura"
          type="number"
          value={width || ''}
          onChange={setWidth}
          min={0}
          step={0.01}
          placeholder="Digite a largura em metros"
          helpText="Largura da laje em metros (m)"
          required
        />

        <FormInput
          label="Espessura"
          type="number"
          value={thickness || ''}
          onChange={setThickness}
          min={0}
          step={0.5}
          placeholder="Digite a espessura em centímetros"
          helpText="Espessura da laje em centímetros (cm)"
          required
        />

        <button
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
          onClick={calculateMaterials}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
          </svg>
          Calcular Materiais
        </button>
      </div>
    </div>
  );
};

export default ConcreteCalculator;