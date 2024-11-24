import React, { useState, useEffect } from "react";
import useDebounce from "./lib/useDebounce";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const debouncedCity = useDebounce(city, 500);
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const getWeather = async () => {
      if (debouncedCity) {
        try {
          const response = await axios.get(
            `${apiBackendUrl}/weather/${debouncedCity}`
          );
          setWeather(response.data);
        } catch (error) {
          console.error("Error fetching weather data", error);
        }
      } else {
        setWeather(null);
      }
    };

    getWeather();
  }, [debouncedCity]);

  return (
    <div className="app">
      <div className="search">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
          type="text"
        />
      </div>
      <div className="container">
        {!weather && (
          <div className="message">
            <p>
              Check out what the weather looks like in your favorite city today!
            </p>
          </div>
        )}
        {(
          weather && (
            <div className="">
              <div className="top">
                <div className="location">
                  <p>{weather.name} | {weather.sys.country }</p>
                </div>
                <div className="temp">
                  {weather.main ? (
                    <h1>{weather.main.temp.toFixed()}°F</h1>
                  ) : null}
                </div>
                <div className="description">
                  {weather.weather ? <p>{weather.weather[0].main}</p> : null}
                </div>
              </div>

              {weather.name !== undefined && (
                <div className="bottom">
                  <div className="feels">
                    {weather.main ? (
                      <p className="bold">
                        {weather.main.feels_like.toFixed()}°F
                      </p>
                    ) : null}
                    <p>Feels Like</p>
                  </div>
                  <div className="humidity">
                    {weather.main ? (
                      <p className="bold">{weather.main.humidity}%</p>
                    ) : null}
                    <p>Humidity</p>
                  </div>
                  <div className="wind">
                    {weather.wind ? (
                      <p className="bold">{weather.wind.speed.toFixed()} MPH</p>
                    ) : null}
                    <p>Wind Speed</p>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
