const fetchWeather = async (city, setWeatherData, weatherData) => {
  const ApiKey = "fe918525bbb96647bd42d97cd6751414";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`
    );
    if (!res.ok) throw new Error("Error occured during fetching");

    const data = await res.json();
    setWeatherData(data);
    return weatherData;
  } catch (error) {
    console.log("failed to fetch data from api", error);
  }
};

export default fetchWeather;
