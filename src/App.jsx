import { useEffect, useState } from "react";
import SunGIF from "../src/assets/sun.gif";
import SunPNG from "../src/assets/sun.png";
import { Search } from "lucide-react";
import fetchWeather from "./weather";

function App() {
  const [displaySun, setDisplaySun] = useState(true);
  const [city, setCity] = useState("");
  const [currWeather, setCurrWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleCapitalization = (str) => {
    const arr = str.split(" ");
    return arr
      .map((item) => {
        return item.charAt(0).toUpperCase() + item.substring(1);
      })
      .join(" ");
  };

  const fetchWeather = async () => {
    const ApiKey = "fe918525bbb96647bd42d97cd6751414";
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=imperial`
      );
      if (!res.ok) {
        throw new Error(
          "Error occured during fetching",
          setErrorMsg(res.message)
        );
      }

      const data = await res.json();
      setCurrWeather(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log("failed to fetch data from api", error);
      setErrorMsg(error);
      setLoading(false);
    }
  };

  const handleGetDate = (timezone) => {
    const offset = timezone;
    const currTime = new Date();
    const localTime = new Date(currTime.getTime() + offset * 1000);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = localTime.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const handleDisplayCity = (e) => {
    e.preventDefault();
    fetchWeather();
    setCity("");
  };

  useEffect(() => {
    setTimeout(() => {
      setDisplaySun(false);
    }, 2000);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center container">
      <div className="img-con relative">
        {displaySun ? (
          <img src={SunGIF} width={150} />
        ) : (
          <img src={SunPNG} width={150} />
        )}
      </div>
      <p className="text-white font-bold text-[45px] ">Weather App</p>
      <h1 className="font-ligt text-[1em] text-center text-gray-600/60 tracking-wider">
        Your Personal Weather Guide
      </h1>
      <div className="my-5">
        <form onSubmit={handleDisplayCity} className="flex items-center gap-2">
          <input
            className="text-center w-full focus:outline-none p-2 rounded-sm shadow-inner"
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button
            className=" flex justify-center w-[50px] p-2 my-3 bg-[#FDCB50] rounded-sm shadow-md "
            type="submit"
          >
            <Search color="white" />
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center w-4/6">
        {loading ? (
          <h1>Loading........</h1>
        ) : (
          currWeather && (
            <div className="flex flex-col items-center bg-[#FDCB50] p-5 rounded-md shadow-md w-full">
              <p className="font-bold text-white text-[1.6rem]">
                {currWeather?.weather[0]?.main}
              </p>
              <img
                className="weather-icon"
                src={`http://openweathermap.org/img/w/${currWeather?.weather[0]?.icon}.png`}
                alt={currWeather?.weather[0]?.description}
                width={100}
              />
              <p className="text-white">
                {handleGetDate(currWeather?.timezone)}
              </p>
              <p className="font-bold text-white text-[1.5rem] text-center">
                {currWeather?.main?.temp} C °
              </p>
              <p className="font-bold text-white text-[2.5rem] text-center">
                {currWeather?.name}, {currWeather?.sys?.country}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
