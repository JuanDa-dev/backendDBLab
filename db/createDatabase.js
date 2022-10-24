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
    INSERT INTO datacontinents (continentID, dateR, total_cases, new_cases, new_cases_smoothed, total_deaths, new_deaths, new_deaths_smoothed, 
        total_cases_per_million, new_cases_per_million, new_cases_smoothed_per_million, total_deaths_per_million, new_deaths_per_million, 
        new_deaths_smoothed_per_million, reproduction_rate, new_tests_smoothed, new_tests_smoothed_per_thousand, positive_rate, tests_per_case, 
        tests_units, total_vaccinations, people_vaccinated, people_fully_vaccinated, new_vaccinations_smoothed, total_vaccinations_per_hundred, 
        people_vaccinated_per_hundred, people_fully_vaccinated_per_hundred, new_vaccinations_smoothed_per_million, new_people_vaccinated_smoothed, 
        new_people_vaccinated_smoothed_per_hundred, stringency_index) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            continentID,
            data['date'],
            data['total_cases'],
            data['new_cases'],
            data['new_cases_smoothed'],
            data['total_deaths'],
            data['new_deaths'],
            data['new_deaths_smoothed'],
            data['total_cases_per_million'],
            data['new_cases_per_million'],
            data['new_cases_smoothed_per_million'],
            data['total_deaths_per_million'],
            data['new_deaths_per_million'],
            data['new_deaths_smoothed_per_million'],
            data['reproduction_rate'],
            data['new_tests_smoothed'],
            data['new_tests_smoothed_per_thousand'],
            data['positive_rate'],
            data['tests_per_case'],
            data['tests_units'],
            data['total_vaccinations'],
            data['people_vaccinated'],
            data['people_fully_vaccinated'],
            data['new_vaccinations_smoothed'],
            data['total_vaccinations_per_hundred'],
            data['people_vaccinated_per_hundred'],
            data['people_fully_vaccinated_per_hundred'],
            data['new_vaccinations_smoothed_per_million'],
            data['new_people_vaccinated_smoothed'],
            data['new_people_vaccinated_smoothed_per_hundred'],
            data['stringency_index']
        ])
}

const createDatabase = async () => {
    let total = 0;
    for (const isoCode in jsonData) {
        const value = jsonData[isoCode]
        //const continentID = await addContinent(isoCode, value)

        for (const key in value['data']) {
            await addDataContinent(isoCode, value['data'][key])
            total += 1
        }
    }
    console.log(total)
    console.log("Termino!")
    await pool.end()
}

createDatabase()