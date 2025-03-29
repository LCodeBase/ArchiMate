import { useState } from 'react';
import FormInput from './FormInput';
import { MortarIcon } from './Icons';

interface MortarCalculatorProps {
  onCalculate: (result: {
    cementAmount: number;
    sandAmount: number;
    waterAmount: number;
  }) => void;
}

const MortarCalculator = ({ onCalculate }: MortarCalculatorProps) => {
  const [area, setArea] = useState<number>(0);
  const [thickness, setThickness] = useState<number>(0);
  const [mortarType, setMortarType] = useState<string>('1:3');

  // Proporções de materiais para diferentes traços de argamassa
  const mortarMixes = {
    '1:3': { cement: 1, sand: 3 },
    '1:4': { cement: 1, sand: 4 },
    '1:2': { cement: 1, sand: 2 }
  };

  const calculateMaterials = () => {
    if (area <= 0 || thickness <= 0) return;

    // Volume em metros cúbicos (espessura em cm convertida para m)
    const mortarVolume = area * (thickness / 100);

    // Proporções do traço escolhido
    const mix = mortarMixes[mortarType as keyof typeof mortarMixes];

    // Fator de rendimento (1m³ de argamassa requer ~1.3m³ de materiais secos)
    const totalParts = mix.cement + mix.sand;

    // Cimento (1 saco = 50kg = ~0.033m³)
    const cementVolume = (mortarVolume * mix.cement) / totalParts * 1.3;
    const cementAmount = Math.ceil(cementVolume / 0.033) * 50; // kg (em sacos de 50kg)

    // Areia em m³
    const sandAmount = (mortarVolume * mix.sand) / totalParts * 1.3;

    // Água (aproximadamente 0.5 do volume de cimento)
    const waterAmount = cementVolume * 0.5 * 1000; // litros

    onCalculate({
      cementAmount,
      sandAmount,
      waterAmount
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-card">
      <div className="flex items-center mb-6">
        <MortarIcon size={24} className="text-success mr-3" />
        <h2 className="text-xl font-bold text-neutral-800">Cálculo de Argamassa</h2>
      </div>

      <div className="space-y-6">
        <FormInput
          label="Traço da Argamassa"
          type="select"
          value={mortarType}
          onChange={setMortarType}
          options={[
            { value: '1:3', label: 'Traço 1:3 (Padrão)' },
            { value: '1:4', label: 'Traço 1:4 (Econômico)' },
            { value: '1:2', label: 'Traço 1:2 (Resistente)' }
          ]}
          helpText="Proporção de cimento e areia na mistura"
          required
        />

        <FormInput
          label="Área a ser Revestida"
          type="number"
          value={area || ''}
          onChange={setArea}
          min={0}
          step={0.01}
          placeholder="Digite a área em metros quadrados"
          helpText="Área total a ser revestida em metros quadrados (m²)"
          required
        />

        <FormInput
          label="Espessura do Revestimento"
          type="number"
          value={thickness || ''}
          onChange={setThickness}
          min={0}
          step={0.1}
          placeholder="Digite a espessura em centímetros"
          helpText="Espessura da camada de argamassa em centímetros (cm)"
          required
        />

        <button
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center"
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

export default MortarCalculator;