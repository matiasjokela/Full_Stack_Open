import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) => {
	return (
		<div>
			find countries <input value={filter} onChange={handleFilterChange}/>
		</div>
	)
}

const Languages = ({ languages }) => {
	let tmp = Object.values(languages)
	console.log(tmp)
	return (
		<ul>
			{tmp.map(lang => {
				return (
					<li key={lang}>{lang}</li>
				)
			})}
		</ul>
	)
}

const Country = ({ country, weatherData, setWeatherData }) => {
	const api_key = process.env.REACT_APP_API_KEY
	const lat = country.capitalInfo.latlng[0]
	const lon = country.capitalInfo.latlng[1]
	axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,hourly,minutely,alerts&appid=${api_key}&units=metric`).then(response => {
		setWeatherData(response.data)
	})

	console.log('jippii', weatherData)
	return (
		<>
			<h1>{country.name.common}</h1>
			<div>capital {country.capital}</div>
			<div>area {country.area}</div>
			<h2>languages</h2>
			<Languages languages={country.languages}/>
			<img src={country.flags.png} alt="country flag"></img>
			<h2>Weather in {country.capital}</h2>
		</>
	)
}

const Display = ({ filteredCountries, setFilteredCountries, weatherData, setWeatherData}) => {

	console.log(filteredCountries)


	if (filteredCountries.length > 10) {
		return (
			<div>too many matches, specify another filter</div>
		)
	}
	else if (filteredCountries.length > 1)
	{
		return (
			filteredCountries.map(country => {
				return (
					<div key={country.name.common}>
						{country.name.common} 
						<button onClick={() => {
							setFilteredCountries([country])
							return (
								<Country key={country.name.common} country={country}
								weatherData={weatherData} setWeatherData={setWeatherData}/>
							)
							}
						}>show</button>
					</div>
				)
			})
		)
	}
	else if (filteredCountries.length === 1)
	{
		return (
			<Country key={filteredCountries[0].name.common} country={filteredCountries[0]}
			weatherData={weatherData} setWeatherData={setWeatherData}/>
		)
	}
}

function App() {
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])
	const [weatherData, setWeatherData] = useState([])
	

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data)
		})
	}, [])

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
		const tmp = countries.filter(country => country.name.common.includes(filter))
		setFilteredCountries(tmp)
	}



	// console.log(countries)
	// countries.map(country => {
	// 	console.log(country.name.common)
	// })
	// console.log(filter)

	return (
		<>
			<Filter filter={filter} handleFilterChange={handleFilterChange}/>
			<Display filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries}
			weatherData={weatherData} setWeatherData={setWeatherData}/>
		</>
	)

}

export default App;
