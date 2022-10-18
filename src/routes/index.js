import { Router } from "express"
import { getContinents, getDataContinents, getDataContinentsByContinentID } from '../controllers/index.js'

const router = Router()

router.get('/continents', getContinents)
router.get('/dataContinents', getDataContinents)
router.get('/dataContinents/:continentID', getDataContinentsByContinentID)

export default router