import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    if (!capital) return

    const capitalName = Array.isArray(capital) ? capital[0] : capital

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalName}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.error("Error fetching weather data:", error)
      })
  }, [capital, api_key])

  if (!weather) {
    return null
  }

  return (
    <div>
      <h3>Weather in {Array.isArray(capital) ? capital[0] : capital}</h3>
      <div>temperature: {weather.main.temp} °C</div>
      
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={weather.weather[0].description} 
      />
      
      <div>wind: {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather