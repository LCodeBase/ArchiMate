import { Router } from 'express'
import { calculateWall, calculateSlab } from '../controllers/calculations'

const router = Router()

router.post('/wall', calculateWall)
router.post('/slab', calculateSlab)

export default router
