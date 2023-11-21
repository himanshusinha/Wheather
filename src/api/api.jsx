import {API_KEY} from '../constants/apikey';

export const fetchWeatherData = async cityName => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`,
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
export const fetchWeatherWeeklyData = async cityName => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=7&appid=${API_KEY}`,
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
export const fetchWeatherMonthlyData = async cityName => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export default fetchWeatherData;
