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
    total_cases int,
    new_cases int,
    total_cases_per_million float,
    new_cases_per_million float,
    stringency_index float,
    primary key(dataID),
    foreign key(continentID) references continents(isoCode)
);