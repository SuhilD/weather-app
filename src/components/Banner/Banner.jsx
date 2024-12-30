import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./assets/styles/_index.scss";

const Banner = () => {
  const [search, setSearch] = useState("erode");
  const [city, setCity] = useState(null);
  const [background, setBackground] = useState(""); // State for background class

  const getWeatherData = async () => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=7db7f4dc24f41ff2956b0ddce4ddf5da&units=metric`
      );
      let result = await response.json();
      setCity(result);

      // Map weather condition to background class
      const condition = result?.weather[0]?.main?.toLowerCase();
      switch (condition) {
        case "clear":
          setBackground("clear");
          break;
        case "rain":
          setBackground("rain");
          break;
        case "clouds":
          setBackground("clouds");
          break;
        case "snow":
          setBackground("snow");
          break;
        default:
          setBackground("default");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, [search]);

  return (
    <div className={`App ${background}`}>
      <div className="weather-card">
        <div className="search">
          <input
            type="search"
            placeholder="Enter city name"
            spellCheck="false"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="weather">
          <img
            className="weather-icon"
            src="https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png"
            alt="..."
          />
          <h1 className="temp">{city?.main?.temp}°C </h1>
          <h2 className="city">{city?.name} - {city?.weather?.[0]?.main}</h2>
          <div className="details">
            <Row>
              <Col xl={6} md={6} sm={12} className="content-col">
                {/* <img
                  className="humidity-img"
                  src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png"
                /> */}
                <div className="info">
                  <p className="humidity">{city?.main?.humidity}%</p>
                  <p className="humidity-title">Humidity</p>
                </div>
              </Col>
              <Col xl={6} md={6} sm={12} className="content-col content-col-2">
                {/* <img
                  className="wind-img"
                  src="https://cdn-icons-png.flaticon.com/512/136/136712.png"
                /> */}
                <div className="info">
                  <p className="wind">{city?.wind?.speed} km/h</p>
                  <p className="wind-title">Wind Speed</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
