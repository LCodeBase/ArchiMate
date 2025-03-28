export interface WallDimensions {
  length: number // comprimento em metros
  height: number // altura em metros
  thickness: number // espessura em centímetros
}

export interface CalculationResult {
  totalBlocks: number
  totalMortar: {
    cement: number // sacos de cimento
    sand: number // metros cúbicos de areia
  }
  totalCost: number
}

export interface SlabDimensions {
  length: number // comprimento em metros
  width: number // largura em metros
  thickness: number // espessura em centímetros
}

export interface SlabResult {
  concreteVolume: number // volume em metros cúbicos
  cement: number // sacos de cimento
  sand: number // metros cúbicos de areia
  gravel: number // metros cúbicos de brita
  totalCost: number
}
