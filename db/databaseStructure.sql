create database coviddatabase;

use coviddatabase;

create table continents(
	isoCode varchar(50),
    continent varchar(50),
    location varchar(50), 
    population double,
    population_density float,
    median_age float,
    aged_65_older float,
    aged_70_older float,
    gdp_per_capita float,
    cardiovasc_death_rate float,
    diabetes_prevalence float,
    handwashing_facilities float,
    hospital_beds_per_thousand float,
    life_expectancy float,
    human_development_index float,
    primary key(isoCode)
);

create table datacontinents (
	dataID int auto_increment,
    continentID varchar(50),
	dateR date,
    total_cases bigint,
    new_cases bigint,
    new_cases_smoothed float,
    total_deaths bigint,
    new_deaths bigint,
    new_deaths_smoothed bigint,
    total_cases_per_million float,
    new_cases_per_million float,
    new_cases_smoothed_per_million float,
    total_deaths_per_million float,
    new_deaths_per_million float,
    new_deaths_smoothed_per_million float,
    reproduction_rate float,
    new_tests_smoothed bigint,
    new_tests_smoothed_per_thousand float,
    positive_rate float,
    tests_per_case float,
    tests_units varchar(50),
    total_vaccinations bigint,
    people_vaccinated bigint,
    people_fully_vaccinated bigint,
    new_vaccinations_smoothed bigint,
    total_vaccinations_per_hundred float,
    people_vaccinated_per_hundred float,
    people_fully_vaccinated_per_hundred float,
    new_vaccinations_smoothed_per_million bigint,
    new_people_vaccinated_smoothed bigint,
    new_people_vaccinated_smoothed_per_hundred float,
    stringency_index float,
    primary key(dataID),
    foreign key(continentID) references continents(isoCode)
);