import { pool } from '../src/db.js';
import jsonData from './owid-covid-data.json' assert { type: "json" };

const addContinent = async (isoCode, value) => {
    await pool.query(`
    INSERT INTO continents (isoCode, continent, location, population, population_density, 
        median_age, aged_65_older, aged_70_older, gdp_per_capita, cardiovasc_death_rate, 
        diabetes_prevalence, handwashing_facilities, hospital_beds_per_thousand, 
        life_expectancy, human_development_index) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            isoCode,
            value['continent'],
            value['location'],
            value['population'],
            value['population_density'],
            value['median_age'],
            value['aged_65_older'],
            value['aged_70_older'],
            value['gdp_per_capita'],
            value['cardiovasc_death_rate'],
            value['diabetes_prevalence'],
            value['handwashing_facilities'],
            value['hospital_beds_per_thousand'],
            value['life_expectancy'],
            value['human_development_index']
        ])

    return isoCode;
}

const addDataContinent = async (continentID, data) => {
    await pool.query(`
    INSERT INTO datacontinents (continentID, dateR, total_cases, new_cases, 
        total_cases_per_million, new_cases_per_million, stringency_index) 
    VALUES (?,?,?,?,?,?,?)`,
        [
            continentID,
            data['date'],
            data['total_cases'],
            data['new_cases'],
            data['total_cases_per_million'],
            data['new_cases_per_million'],
            data['stringency_index']
        ])
}

const createDatabase = async () => {
    for (const isoCode in jsonData) {
        const value = jsonData[isoCode]
        const continentID = await addContinent(isoCode, value)

        for (const key in value['data']) {
            await addDataContinent(continentID, value['data'][key])
        }
    }
}

createDatabase()