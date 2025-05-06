import { useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import clouad_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import { useEffect } from "react";

const WeatherCard = () => {
  const inputRef = useRef();
  const [weather, setWeather] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clouad_icon,
    "02n": clouad_icon,
    "03d": clouad_icon,
    "03n": clouad_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city) => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }
    try {
      console.log(import.meta.env.VITE_API_KEY); // ตรวจสอบว่า API Key ถูกโหลดหรือไม่
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok) {
        alert("City not found. Please try again.");
        setWeather(false);
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon; // ใช้ icon ที่ถูกต้องตามเงื่อนไข
      
      setWeather({
        city: data.name,
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: icon,
      }
    );
    } catch (error) {
      setWeather(false);
      console.error("Error loading asset:", error);
    }
  };
  const [city, setCity] = useState("");

  useEffect(() => {
    search(""); // เรียกใช้ฟังก์ชัน search เมื่อโหลดคอมโพเนนต์
  }, []);

  const handleSearch = () => {
    // Add API call logic here to fetch weather data
    console.log(`Searching weather for: ${city}`);
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="w-full max-w-sm bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none"
            />
            <button
              onClick={() => search(inputRef.current.value)}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-r-lg flex items-center justify-center"
            >
              <CiSearch />
            </button>
          </div>
          {weather ? (
            <>
              <div className="text-center">
                <div className="text-6xl mb-4">
                  <img
                    src={weather.icon}
                    alt="Weather Icon"
                    className="w-30 h-30 mx-auto"
                  />
                </div>
                <h1 className="text-5xl font-bold">{weather.temperature}°C</h1>
                <h2 className="text-2xl mt-2">{weather.city}</h2>
                <div className="flex justify-between items-center mt-6">
                  <div className="text-center">
                    <img
                      src={humidity_icon}
                      alt="Humidity Icon"
                      className="mx-auto mb-2 w-8 h-8"
                    />
                    <p className="mt-1">{weather.humidity}%</p>
                    <p className="text-sm text-gray-400">Humidity</p>
                  </div>
                  <div className="text-center">
                    <img
                      src={wind_icon}
                      alt="Wind Icon"
                      className="mx-auto mb-2 w-8 h-8"
                    />
                    <p className="mt-1">{weather.windSpeed} Km/h</p>
                    <p className="text-sm text-gray-400">Wind Speed</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default WeatherCard;
