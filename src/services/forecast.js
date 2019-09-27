import buildQueries from '../utils/buildQueries';
const baseWeatherUrl = process.env.VUE_APP_WEATHER_API_URL;
const apiKey = process.env.VUE_APP_WEATHER_API;

export default class {
  constructor() {
    this.currentForecast = {};
    this.weeklyForecast = [];
    this.hourlyForecast = [];
  }

  async getCurrentForecast(coordinates) {
    const queries = buildQueries({
      lat: coordinates.latitude,
      lon: coordinates.longitude,
      key: apiKey,
    });
    await fetch(`${baseWeatherUrl}/current${queries}`)
      .then((response) => response.json())
      .then((jsonData) => {
        const { data } = jsonData;
        const [currentForecast] = data;
        this.currentForecast = currentForecast;
      });
    return this.currentForecast;
  }

  async getWeeklyForecast(coordinates) {
    const queries = buildQueries({
      lat: coordinates.latitude,
      lon: coordinates.longitude,
      days: 8,
      key: apiKey,
    });
    await fetch(`${baseWeatherUrl}/forecast/daily${queries}`)
      .then((response) => response.json())
      .then((jsonData) => {
        const { data } = jsonData;
        const weeklyForecast = data.slice(1);
        this.weeklyForecast = weeklyForecast;
      });
    return this.weeklyForecast;
  }

  async getHourlyForecast(coordinates) {
    const queries = buildQueries({
      lat: coordinates.latitude,
      lon: coordinates.longitude,
      hours: 26,
      key: apiKey,
    });
    await fetch(`${baseWeatherUrl}/forecast/hourly${queries}`)
      .then((response) => response.json())
      .then((jsonData) => {
        const { data } = jsonData;
        const hourlyForecast = data.slice(1);
        this.hourlyForecast = hourlyForecast;
      });
    return this.hourlyForecast;
  }
}
