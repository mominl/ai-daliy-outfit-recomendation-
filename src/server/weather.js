import axios from 'axios';

export async function getWeatherData() {
  try {
    // Replace with your preferred weather API
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=auto:ip`
    );
    
    return {
      temperature: response.data.current.temp_f,
      condition: response.data.current.condition.text,
      humidity: response.data.current.humidity
    };
  } catch (error) {
    console.error('Weather API error:', error);
    throw new Error('Failed to fetch weather data');
  }
}