import axios from 'axios';
import { Weather } from '../models/WeatherModel';

// const API_KEY = process.env.VUE_APP_API_KEY;
const BASE_URL = 'http://api.weatherstack.com/';

export const fetchWeather = async (city: string): Promise<Weather> => {
  try {
    const response = await axios.get(`${BASE_URL}current`, {
      params: {
        access_key: 'e16a5c9f0b395804b5d0b33baa44e99e',
        query: city,
      },
    });

    const data = response.data;

    if (!data || !data.current || !data.location) {
      throw new Error('Invalid response format');
    }

    return {
      cityName: data.location.name,
      temperature: data.current.temperature,
      description: data.current.weather_descriptions[0] || 'Weather description not available',
      iconUrl: data.current.weather_icons[0] || '',
      detailsUrl: '',
    };
  } catch (error) {
    // console.error('Error fetching weather:', error);
    throw new Error('Failed to fetch weather data');
  }
};
