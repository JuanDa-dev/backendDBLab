import { Router } from "express"
import { 
    getContinents, 
    getDataContinent, 
    getCountries, 
    getDataCountry, 
    getDates, 
    getDataContinentByDate, 
    getDataCountryByDate
} from '../controllers/index.js'

const router = Router()

router.get('/continents', getContinents)
router.get('/dataContinent/:continent', getDataContinent)
router.get('/dataContinentByDate/:continent/:MIN_DATE/:MAX_DATE', getDataContinentByDate)
router.get('/countries', getCountries)
router.get('/dataCountry/:isoCode', getDataCountry)
router.get('/dataCountryByDate/:isoCode/:MIN_DATE/:MAX_DATE', getDataCountryByDate)
router.get('/dates', getDates)

export default router