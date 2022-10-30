import { pool } from '../db.js'
import { httpError } from '../helpers/handleError.js';

export const getContinents = async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT c.continent as name, 
        SUM(population) as population, 
        SUM(population_density) as population_density, 
        SUM(total_cases) as total_cases, 
        SUM(new_cases) as new_cases, 
        SUM(total_deaths) as total_deaths, 
        SUM(new_deaths) as new_deaths, 
        SUM(new_deaths_smoothed) as new_deaths_smoothed, 
        SUM(total_vaccinations) as total_vaccinations, 
        SUM(people_vaccinated) as people_vaccinated, 
        SUM(people_fully_vaccinated) as people_fully_vaccinated, 
        SUM(new_vaccinations_smoothed) as new_vaccinations_smoothed, 
        SUM(new_vaccinations_smoothed_per_million) as new_vaccinations_smoothed_per_million, 
        SUM(new_people_vaccinated_smoothed) as new_people_vaccinated_smoothed
        FROM countries c, datacountries dc WHERE c.isoCode = dc.idCountry GROUP BY name`)
        res.json(rows)
    } catch (err) {
        httpError(res, err)
    }
}

export const getDataContinent = async (req, res) => {
    const { continent } = req.params;
    try {
        const [rows] = await pool.query(`
        SELECT * FROM countries c, datacountries dc 
        WHERE dc.idCountry = c.isoCode 
        and c.continent = ? ORDER BY dc.dateR ASC
        `, [continent])
        res.json(rows)
    } catch (err) {
        httpError(res, err)
    }
}

export const getCountries = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM countries')
        res.json(rows)
    } catch (err) {
        httpError(res, err)
    }
}

export const getDataCountry = async (req, res) => {
    const { isoCode } = req.params;
    try {
        const [rows] = await pool.query(`
        SELECT * FROM countries c, datacountries dc 
        WHERE c.isoCode = dc.idCountry and c.isoCode = ? ORDER BY dc.dateR ASC
        `, [isoCode])
        res.json(rows)
    } catch (err) {
        httpError(res, err)
    }
}

export const getDates = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT DISTINCT dateR FROM datacountries ORDER BY dateR ASC')
        res.json(rows)
    } catch (err) {
        httpError(res, err)
    }
}

export const getDataContinentByDate = async (req, res) => {
    const { continent, MIN_DATE, MAX_DATE } = req.params;
    try {
        const [rows] = await pool.query(`
        SELECT * FROM countries c, datacountries dc 
        WHERE dc.idCountry = c.isoCode and c.continent = ? 
        and dc.dateR >= ? AND dc.dateR <= ?
        ORDER BY dc.dateR ASC`, [continent, new Date(MIN_DATE), new Date(MAX_DATE)])
        res.json(rows)
    } catch (err) {
        httpError(res, err)
    }
}

export const getDataCountryByDate = async (req, res) => {
    const { isoCode, MIN_DATE, MAX_DATE } = req.params;
    try {
        const [rows] = await pool.query(`
        SELECT * FROM countries c, datacountries dc 
        WHERE c.isoCode = dc.idCountry and c.isoCode = ? 
        and dc.dateR >= ? AND dc.dateR <= ?
        ORDER BY dc.dateR ASC
        `, [isoCode, new Date(MIN_DATE), new Date(MAX_DATE)])
        res.json(rows)
    } catch (err) {
        httpError(res, err)
    }
}