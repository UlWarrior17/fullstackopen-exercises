import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [condition, setCondition] = useState(null);
  const apiKey = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setCondition(response.data);
      });
  }, [capital, apiKey]);
  if (condition) {

    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>Temperature {condition.main.temp} °C</p>
        <img
          src={`https://openweathermap.org/img/wn/${condition.weather[0].icon}@2x.png`}
                alt={condition.weather.main}
                style={{background: 'lightgrey'}}
        />
        <p>Wind {condition.wind.speed} m/s</p>
      </div>
    );
  }
};
export default Weather;
