import { Request, Response } from 'express'
import {
  calculateWallMaterials,
  calculateSlabMaterials,
} from '../services/calculations'
import { WallDimensions, SlabDimensions } from '../types/calculations'

export const calculateWall = async (req: Request, res: Response) => {
  try {
    const dimensions: WallDimensions = req.body
    const result = calculateWallMaterials(dimensions)
    res.json(result)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao calcular materiais da parede' })
  }
}

export const calculateSlab = async (req: Request, res: Response) => {
  try {
    const dimensions: SlabDimensions = req.body
    const result = calculateSlabMaterials(dimensions)
    res.json(result)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao calcular materiais da laje' })
  }
}
