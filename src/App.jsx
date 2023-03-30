import "./App.css";

import React, { useState } from "react";

function App() {
  function kelvin_to_fahrenheit(temperature) {
    return ((temperature - 273.15) * 9) / 5 + 32;
  }

  function kelvin_to_celcius(temperature) {
    return temperature - 273.15;
  }

  function fahrenheit_to_celcius(temperature) {
    return ((temperature - 32) * 5) / 9;
  }

  function celcius_to_fahrenheit(temperature) {
    return (temperature * 9) / 5 + 32;
  }

  const [stateOfSky, setstateOfSky] = useState([""]);
  const [tempinFar, settempinFar] = useState([0]);
  const [feelsLikeC, setFeelsLikeC] = useState([0]);
  const [minTemp, setminTemp] = useState([0]);
  const [maxcelciusTemp, setmaxcelciusTemp] = useState([0]);
  const [feelsLikeFar, setfeelsLikeFar] = useState([0]);
  const [maxTemp, setmaxTemp] = useState([0]);
  const [minTempFar, setminTempFar] = useState([0]);
  const [speedOfWind, setspeedOfWind] = useState([0]);
  const [cloudiness, setCloudiness] = useState([0]);
  const [temp, setTemp] = useState([0]);
  const [feelsLike, setFeelsLike] = useState([0]);
  const [celciusTemp, setcelciusTemp] = useState([0]);
  const [maxTempF, setmaxTempF] = useState([0]);
  const [mincelciusTemp, setmincelciusTemp] = useState([0]);
  const [city, setCity] = useState([""]);
  const [location, setlocation] = useState([""]);

  function setCloudinessState(cloudiness) {
    if (cloudiness > 75) {
      setstateOfSky("Very Cloudy ");
    } else if (cloudiness > 50) {
      setstateOfSky("Cloudy ");
    } else if (cloudiness > 25) {
      setstateOfSky("Slightly Cloudy ");
    } else {
      setstateOfSky("Clear skies ");
    }
  }

  async function get_the_weather(city, country) {
    const weatherPromise = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country},1&appid=43798259c6b658443a0cd71b973accaa`
    );
    const weatherJson = await weatherPromise.json();
    setcelciusTemp(kelvin_to_celcius(weatherJson.main.temp));
    setFeelsLikeC(kelvin_to_celcius(weatherJson.main.feels_like));
    setmincelciusTemp(kelvin_to_celcius(weatherJson.main.temp_min));
    setTemp(kelvin_to_fahrenheit(weatherJson.main.temp));
    setFeelsLike(kelvin_to_fahrenheit(weatherJson.main.feels_like));
    setminTemp(kelvin_to_fahrenheit(weatherJson.main.temp_min));
    setmaxTemp(kelvin_to_fahrenheit(weatherJson.main.temp_max));
    settempinFar(kelvin_to_fahrenheit(weatherJson.main.temp));
    setfeelsLikeFar(kelvin_to_fahrenheit(weatherJson.main.feels_like));
    setmaxcelciusTemp(kelvin_to_celcius(weatherJson.main.temp_max));
    setspeedOfWind(weatherJson.wind.speed);
    setCloudiness(weatherJson.clouds.all);
    setCloudinessState(cloudiness);
    setminTempFar(kelvin_to_fahrenheit(weatherJson.main.temp_min));
    setmaxTempF(kelvin_to_fahrenheit(weatherJson.main.temp_max));
  }

  function fahrenheit_to_celcius() {
    setTemp(celciusTemp);
    setFeelsLike(feelsLikeC);
    setminTemp(mincelciusTemp);
    setmaxTemp(maxcelciusTemp);
  }

  function celcius_to_fahrenheit() {
    setTemp(tempinFar);
    setFeelsLike(feelsLikeFar);
    setminTemp(minTempFar);
    setmaxTemp(maxTempF);
  }

  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={onSubmit}>
          <label htmlFor="city">(City)</label>
          <input
            type="text"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <label htmlFor="">(State or Country)</label>
          <input
            type="text"
            onChange={(event) => {
              setlocation(event.target.value);
            }}
          />
          <button
            className="button"
            onClick={() => {
              get_the_weather(city, location);
            }}
          >
            get weather
          </button>
        </form>
        <br /> <br />
        <div>
          <span>Current Temp is: {Number(temp).toFixed(2)}°</span>
        </div>
        <div>
          <span>{stateOfSky}</span>
          <br />
          <span>it Feels Like: {Number(feelsLike).toFixed(2)}°</span>
          <br />
          <span>Highest: {Number(maxTemp).toFixed(2)}° </span>
          <span>Lowest: {Number(minTemp).toFixed(2)}° </span>
          <br />
          <span>Wind Speed: {speedOfWind}mph</span>
          <br />
          <br />
          <button class="f" onClick={celcius_to_fahrenheit}>
            °fahrenheit
          </button>{" "}
          |{" "}
          <button class="c" onClick={fahrenheit_to_celcius}>
            °celcius
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
