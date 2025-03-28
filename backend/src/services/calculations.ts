import {
  WallDimensions,
  CalculationResult,
  SlabDimensions,
  SlabResult,
} from '../types/calculations'

// Constantes para cálculos
const BLOCK_LENGTH = 14 // cm
const BLOCK_HEIGHT = 19 // cm
const BLOCK_THICKNESS = 9 // cm
const BLOCK_PRICE = 2.5 // R$

const CEMENT_PRICE = 35.0 // R$ por saco
const SAND_PRICE = 80.0 // R$ por m³
const GRAVEL_PRICE = 120.0 // R$ por m³

export const calculateWallMaterials = (
  dimensions: WallDimensions
): CalculationResult => {
  const { length, height, thickness } = dimensions

  // Converter dimensões para centímetros
  const lengthCm = length * 100
  const heightCm = height * 100

  // Calcular área da parede
  const wallArea = lengthCm * heightCm

  // Calcular área de um bloco
  const blockArea = BLOCK_LENGTH * BLOCK_HEIGHT

  // Calcular número de blocos
  const totalBlocks = Math.ceil(wallArea / blockArea)

  // Calcular volume de argamassa (considerando 10% de perda)
  const mortarVolume = ((wallArea * thickness) / 1000000) * 1.1 // m³

  // Calcular quantidade de cimento (1:3:3 - cimento:areia:água)
  const cementBags = Math.ceil(mortarVolume * 7.5) // 7.5 sacos por m³

  // Calcular quantidade de areia
  const sandVolume = mortarVolume * 3 // m³

  // Calcular custos
  const blocksCost = totalBlocks * BLOCK_PRICE
  const cementCost = cementBags * CEMENT_PRICE
  const sandCost = sandVolume * SAND_PRICE
  const totalCost = blocksCost + cementCost + sandCost

  return {
    totalBlocks,
    totalMortar: {
      cement: cementBags,
      sand: sandVolume,
    },
    totalCost,
  }
}

export const calculateSlabMaterials = (
  dimensions: SlabDimensions
): SlabResult => {
  const { length, width, thickness } = dimensions

  // Calcular volume de concreto em m³
  const concreteVolume = (length * width * thickness) / 100

  // Proporção do traço: 1:2:3 (cimento:areia:brita)
  const cementBags = Math.ceil(concreteVolume * 7.5) // 7.5 sacos por m³
  const sandVolume = concreteVolume * 2 // m³
  const gravelVolume = concreteVolume * 3 // m³

  // Calcular custos
  const cementCost = cementBags * CEMENT_PRICE
  const sandCost = sandVolume * SAND_PRICE
  const gravelCost = gravelVolume * GRAVEL_PRICE
  const totalCost = cementCost + sandCost + gravelCost

  return {
    concreteVolume,
    cement: cementBags,
    sand: sandVolume,
    gravel: gravelVolume,
    totalCost,
  }
}
