import React, { useState, useEffect } from 'react';
import axios from 'axios'

function App() {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(result => {
        setCountries(result.data)
      })
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div className="App">
      <Search search={search} handleChange={handleChange} />
      <Countries countries={countries} search={search} />
    </div>
  );
}

const Search = ({ search, handleChange }) => {
  return (
    <>
      <form>
        Find countries: <input value={search} onChange={handleChange}></input>
      </form>
    </>
  )
}

const Countries = ({ countries, search }) => {
  const filteredList = countries
    .filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
  
  if (filteredList.length > 10) {
    return <p>Too many matching countries</p>
  } else if (filteredList.length > 1) {
    return (
      <ul>
        { filteredList.map(country => <Country key={country.name} country={country} fullInfo={false} />) }
      </ul>
    )
  } else if (filteredList.length === 1) {
    return  <Country country={filteredList[0]} fullInfo={true}/>
  } else {
    return <p>No countries found</p>
  }
}

const Country = ({ country, fullInfo }) => {
  const [ showAll, toggleShowAll ] = useState(fullInfo)

  const handleClick = () => {
    toggleShowAll(!showAll)
  }

  if (showAll) {
    return (
      <li>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>{ country.languages.map(lan => <li key={lan.iso639_1}>{lan.name}</li>)}</ul>
        <img src={country.flag} alt='flag' style={{width: '20%'}}></img>
        <CapitalWeather name={country.capital}/>
      </li>
    )
  } else {
    return <li>{country.name} <button onClick={handleClick}>Show!</button></li>
  }
}

const CapitalWeather = ({ name }) => {
  const [ weatherData, setWeatherData ] = useState(undefined)

  useEffect(() => {
    axios.get(`http://api.apixu.com/v1/current.json?key=${process.env.REACT_APP_KEY}&q=${name}`)
      .then(response => {
        setWeatherData(response.data.current)
      })
  }, [name])

  if (weatherData) {
    return (
      <>
        <h3>Weather in {name}</h3>
        <p><b>Temperature:</b> {weatherData.temp_c}</p>
        <img src={weatherData.condition.icon} alt='weather icon'></img>
        <p><b>Wind:</b> {weatherData.wind_kph} kph, direction {weatherData.wind_dir}</p>
      </>
    )
  } else {
    return <p>Loading weather data...</p>
  }
}

export default App;
