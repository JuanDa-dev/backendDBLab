import { pool } from '../db.js'
import { httpError } from '../helpers/handleError.js';

export const getContinents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM continents')
        res.json(rows)
    } catch (err) {
        httpError(res)
    }
}

export const getDataContinents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM continents c, datacontinents dc WHERE c.isoCode = dc.continentID')
        res.json(rows)
    } catch (err) {
        httpError(res)
    }
}

export const getDataContinentsByContinentID = async (req, res) => {
    const { continentID } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM continents c, datacontinents dc WHERE c.isoCode = dc.continentID and c.isoCode = ?', [continentID])
        res.json(rows)
    } catch (err) {
        httpError(res)
    }
}