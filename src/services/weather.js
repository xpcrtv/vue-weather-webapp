const fetchData = (url, coordinates, ...queries) => {
  const baseUrl = 'https://api.weatherbit.io/v2.0';
  const apiKey = process.env.VUE_APP_WEATHER_API;
  const latitude = coordinates.latitude.toFixed(2);
  const longitude = coordinates.longitude.toFixed(2);
  const queryString = queries.map(query => `&${query}`).join('');
  return fetch(`${baseUrl}${url}?lat=${latitude}&lon=${longitude}&key=${apiKey}${queryString}`)
    .then(response => response.json());
};

class Weather {
  constructor() {
    this.hourly = {};
    this.current = {};
    this.weekly = {};
  }

  async getHourlyForecast(coordinates) {
    if (localStorage.getItem('hourly')) {
      this.hourly = JSON.parse(localStorage.getItem('hourly'));
    } else {
      await fetchData('/forecast/hourly', coordinates, 'hours=24')
        .then((data) => {
          this.hourly = data;
          localStorage.setItem('hourly', JSON.stringify(data));
        });
    }
    return this.hourly;
  }

  async getDailyForecast(coordinates) {
    if (localStorage.getItem('current')) {
      this.current = JSON.parse(localStorage.getItem('current'));
    } else {
      await fetchData('/current', coordinates)
        .then((data) => {
          const [resultForecast] = data.data;
          this.current = resultForecast;
          localStorage.setItem('current', JSON.stringify(resultForecast));
        });
    }
    return this.current;
  }

  async getWeeklyForecast(coordinates) {
    if (localStorage.getItem('weekly')) {
      this.weekly = JSON.parse(localStorage.getItem('weekly'));
    } else {
      await fetchData('/forecast/daily', coordinates, 'days=7')
        .then((data) => {
          this.weekly = data;
          localStorage.setItem('weekly', JSON.stringify(data));
        });
    }
    return this.weekly;
  }

  async updateForecasts(coordinates) {
    Object.keys(this).forEach(key => localStorage.removeItem(key));
    Promise.all([
      this.getHourlyForecast(coordinates),
      this.getDailyForecast(coordinates),
      this.getWeeklyForecast(coordinates),
    ]);
    return this;
  }
}

export default Weather;
