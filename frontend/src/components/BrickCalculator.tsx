import { useState } from 'react';
import FormInput from './FormInput';
import { BrickIcon } from './Icons';

interface BrickCalculatorProps {
  onCalculate: (result: {
    brickCount: number;
    cementAmount: number;
    sandAmount: number;
  }) => void;
}

const BrickCalculator = ({ onCalculate }: BrickCalculatorProps) => {
  const [wallLength, setWallLength] = useState<number>(0);
  const [wallHeight, setWallHeight] = useState<number>(0);
  const [brickType, setBrickType] = useState<string>('comum');

  // Dimensões padrão dos tijolos em metros
  const brickDimensions = {
    comum: { length: 0.19, height: 0.09, width: 0.09 },
    baiano: { length: 0.29, height: 0.19, width: 0.09 },
    estrutural: { length: 0.39, height: 0.19, width: 0.14 }
  };

  const calculateMaterials = () => {
    if (wallLength <= 0 || wallHeight <= 0) return;

    const brick = brickDimensions[brickType as keyof typeof brickDimensions];

    // Área da parede em m²
    const wallArea = wallLength * wallHeight;

    // Área do tijolo em m² (considerando a face visível)
    const brickArea = brick.length * brick.height;

    // Quantidade de tijolos com 5% de margem para quebras
    const brickCount = Math.ceil((wallArea / brickArea) * 1.05);

    // Cálculo de argamassa (valores aproximados)
    // Para cada m² de parede: ~15kg de cimento e ~45kg de areia
    const cementAmount = wallArea * 15; // kg
    const sandAmount = wallArea * 45; // kg

    onCalculate({
      brickCount,
      cementAmount,
      sandAmount
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-card">
      <div className="flex items-center mb-6">
        <BrickIcon size={24} className="text-primary-600 mr-3" />
        <h2 className="text-xl font-bold text-neutral-800">Cálculo de Tijolos/Blocos</h2>
      </div>

      <div className="space-y-6">
        <FormInput
          label="Tipo de Tijolo"
          type="select"
          value={brickType}
          onChange={setBrickType}
          options={[
            { value: 'comum', label: 'Tijolo Comum (19x9x9cm)' },
            { value: 'baiano', label: 'Tijolo Baiano (29x19x9cm)' },
            { value: 'estrutural', label: 'Bloco Estrutural (39x19x14cm)' }
          ]}
          helpText="Selecione o tipo de tijolo que será utilizado na construção"
          required
        />

        <FormInput
          label="Comprimento da Parede"
          type="number"
          value={wallLength || ''}
          onChange={setWallLength}
          min={0}
          step={0.01}
          placeholder="Digite o comprimento em metros"
          helpText="Medida horizontal da parede em metros"
          required
        />

        <FormInput
          label="Altura da Parede"
          type="number"
          value={wallHeight || ''}
          onChange={setWallHeight}
          min={0}
          step={0.01}
          placeholder="Digite a altura em metros"
          helpText="Medida vertical da parede em metros"
          required
        />

        <button
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center justify-center"
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

export default BrickCalculator;