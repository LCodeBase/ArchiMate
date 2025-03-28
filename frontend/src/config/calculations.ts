// Dados atualizados em março/2024
export const MATERIAL_PRICES = {
  // Materiais para Parede
  tijolo: {
    name: 'Tijolo Cerâmico 8 Furos',
    unit: 'unidades',
    price: 2.5,
    quantityPerSquareMeter: 25, // 25 tijolos por m²
  },
  cimento: {
    name: 'Cimento Portland',
    unit: 'sacos',
    price: 35.0,
    description: 'Cimento Portland CP II-32',
  },
  areia: {
    name: 'Areia Média',
    unit: 'm³',
    price: 120.0,
    description: 'Areia lavada e peneirada',
  },
  brita: {
    name: 'Brita 1',
    unit: 'm³',
    price: 180.0,
    description: 'Brita 1 (19mm)',
  },
  // Materiais para Laje
  aco: {
    name: 'Aço CA-50',
    unit: 'kg',
    price: 12.0,
    description: 'Aço CA-50 8mm a 12mm',
  },
  arame: {
    name: 'Arame Recozido',
    unit: 'kg',
    price: 25.0,
    description: 'Arame recozido 18',
  },
  agua: {
    name: 'Água',
    unit: 'm³',
    price: 0.0,
    description: 'Água potável',
  },
  madeira: {
    name: 'Chapas de Compensado',
    unit: 'm²',
    price: 45.0,
    description: 'Chapas de compensado 15mm',
  },
  pregos: {
    name: 'Pregos',
    unit: 'kg',
    price: 15.0,
    description: 'Pregos 18x27',
  },
  plastico: {
    name: 'Plástico para Cura',
    unit: 'm²',
    price: 2.5,
    description: 'Plástico preto para cura do concreto',
  },
  concreto_usinado: {
    name: 'Concreto Usinado',
    unit: 'm³',
    price: 450.0,
    description: 'Concreto usinado fck 20MPa',
  },
  // Materiais para Revestimento
  argamassa: {
    name: 'Argamassa AC-III',
    unit: 'sacos',
    price: 28.0,
    quantityPerSquareMeter: 0.5, // 0.5 sacos por m²
  },
  rejunte: {
    name: 'Rejunte Flexível',
    unit: 'kg',
    price: 15.0,
    quantityPerSquareMeter: 0.3, // 0.3kg por m²
  },
}

// Fatores de correção para diferentes tipos de construção
export const CONSTRUCTION_FACTORS = {
  parede: {
    tijolo: 1.1, // 10% de perda
    argamassa: 1.15, // 15% de perda
  },
  laje: {
    concreto: 1.05, // 5% de perda
    aco: 1.1, // 10% de perda
  },
}

// Dimensões recomendadas (não são restrições)
export const DEFAULT_DIMENSIONS = {
  parede: {
    thickness: 0.15,
    minThickness: 0.1,
    maxThickness: 0.25,
  },
  laje: {
    thickness: 0.1,
    minThickness: 0.08,
    maxThickness: 0.2,
  },
}

// Fatores de perda e rendimento
const FATORES = {
  perda_concreto: 1.1, // 10% de perda
  perda_aco: 1.05, // 5% de perda
  perda_areia: 1.15, // 15% de perda
  perda_brita: 1.1, // 10% de perda
  perda_madeira: 1.2, // 20% de perda
  perda_pregos: 1.15, // 15% de perda
  perda_plastico: 1.1, // 10% de perda
}

// Consumo de materiais por m³ de concreto
const CONSUMO_MATERIAIS = {
  cimento: 7.5, // sacos/m³
  areia: 0.5, // m³/m³
  brita: 0.8, // m³/m³
  agua: 0.2, // m³/m³
  aco: 100, // kg/m³ (média para lajes)
  arame: 1.5, // kg/m³
  madeira: 2.5, // m²/m³
  pregos: 0.5, // kg/m³
  plastico: 1.1, // m²/m³
}

// Funções auxiliares para cálculos
export const calculateWallMaterials = (dimensions: {
  length: number
  height: number
  thickness: number
}) => {
  const volume = dimensions.length * dimensions.height * dimensions.thickness
  const volumeComPerdas = volume * FATORES.perda_concreto

  return {
    tijolos: Math.ceil(
      dimensions.length *
        dimensions.height *
        MATERIAL_PRICES.tijolo.quantityPerSquareMeter *
        CONSTRUCTION_FACTORS.parede.tijolo
    ),
    cimento:
      volumeComPerdas * CONSUMO_MATERIAIS.cimento * FATORES.perda_concreto,
    areia: volumeComPerdas * CONSUMO_MATERIAIS.areia * FATORES.perda_areia,
    brita: volumeComPerdas * CONSUMO_MATERIAIS.brita * FATORES.perda_brita,
    agua: volumeComPerdas * CONSUMO_MATERIAIS.agua,
    madeira:
      volumeComPerdas * CONSUMO_MATERIAIS.madeira * FATORES.perda_madeira,
    pregos: volumeComPerdas * CONSUMO_MATERIAIS.pregos * FATORES.perda_pregos,
    plastico:
      volumeComPerdas * CONSUMO_MATERIAIS.plastico * FATORES.perda_plastico,
    concreto_usinado: volumeComPerdas,
  }
}

export const calculateSlabMaterials = (dimensions: {
  length: number
  width: number
  thickness: number
}) => {
  const volume = dimensions.length * dimensions.width * dimensions.thickness
  const volumeComPerdas = volume * FATORES.perda_concreto

  return {
    cimento:
      volumeComPerdas * CONSUMO_MATERIAIS.cimento * FATORES.perda_concreto,
    areia: volumeComPerdas * CONSUMO_MATERIAIS.areia * FATORES.perda_areia,
    brita: volumeComPerdas * CONSUMO_MATERIAIS.brita * FATORES.perda_brita,
    aco: volumeComPerdas * CONSUMO_MATERIAIS.aco * FATORES.perda_aco,
    arame: volumeComPerdas * CONSUMO_MATERIAIS.arame * FATORES.perda_aco,
    agua: volumeComPerdas * CONSUMO_MATERIAIS.agua,
    madeira:
      volumeComPerdas * CONSUMO_MATERIAIS.madeira * FATORES.perda_madeira,
    pregos: volumeComPerdas * CONSUMO_MATERIAIS.pregos * FATORES.perda_pregos,
    plastico:
      volumeComPerdas * CONSUMO_MATERIAIS.plastico * FATORES.perda_plastico,
    concreto_usinado: volumeComPerdas,
  }
}
