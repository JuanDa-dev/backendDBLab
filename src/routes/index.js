import { Router } from "express"
import { getContinents, getDataContinent, getCountries, getDataCountry, getDates } from '../controllers/index.js'

const router = Router()

router.get('/continents', getContinents)
router.get('/dataContinent/:continent', getDataContinent)
router.get('/countries', getCountries)
router.get('/dataCountry/:isoCode', getDataCountry)
router.get('/dates', getDates)

export default router