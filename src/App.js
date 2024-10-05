import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const API_KEY = 'bfe7b1ca9477b3525ed42511536a99b1';  // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input 
        type="text" 
        placeholder="Enter city" 
        value={city} 
        onChange={handleChange} 
      />
      <button onClick={getWeather}>Get Weather</button>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp} °C</p>
        </div>
      )}
    </div>
  );
}

export default App;