import axios from 'axios'
import {
  WallDimensions,
  CalculationResult,
  SlabDimensions,
  SlabResult,
} from '../types/calculations'

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
})

export const calculateWallMaterials = async (
  dimensions: WallDimensions
): Promise<CalculationResult> => {
  const response = await api.post('/calculate/wall', dimensions)
  return response.data
}

export const calculateSlabMaterials = async (
  dimensions: SlabDimensions
): Promise<SlabResult> => {
  const response = await api.post('/calculate/slab', dimensions)
  return response.data
}

export const saveCalculation = async (calculation: any) => {
  const response = await api.post('/calculations', calculation)
  return response.data
}

export const getSavedCalculations = async () => {
  const response = await api.get('/calculations')
  return response.data
}
