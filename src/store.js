import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import getCurrentPosition from './utils/getCurrentPosition';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    updateTime: 0,
    coords: {
      latitude: 0,
      longitude: 0,
    },
    hourly: [{
      ts: 0,
      temp: 0,
    }],
    current: {
      city_name: '',
      wind_spd: 0,
      clouds: 0,
      wind_cdir: '',
      temp: 0,
      sunrise: 0,
      sunset: 0,
      weather: {
        description: '',
      },
    },
    weekly: [{
      ts: 0,
      sunrise_ts: 0,
      sunset_ts: 0,
      wind_spd: 0,
      pop: 0,
      max_temp: 0,
      min_temp: 0,
      weather: {
        icon: '',
      },
    },
    ],
  },
  mutations: {
    updateTime(state, time) {
      state.updateTime = time;
    },
    updateCoords(state, coords) {
      state.coords = coords;
    },
    updateCurrentForecast(state, forecast) {
      state.current = forecast;
    },
    updateWeeklyForecast(state, forecast) {
      state.weekly = forecast;
    },
    updateHourlyForecast(state, forecast) {
      state.hourly = forecast;
    },
  },
  actions: {
    async initState({ dispatch }) {
      const storageData = JSON.parse(localStorage.getItem('vuex'));
      if (!storageData || storageData.updateTime === 0) {
        await dispatch('updateCoordsByIp');
        dispatch('updateForecast');
        dispatch('updateTime');
      }
    },
    updateTime({ commit }) {
      const currentTime = new Date().getTime();
      commit('updateTime', currentTime);
    },
    async updateCoordsByIp({ commit }) {
      await axios.get('/mocks/geo.json')
        .then((res) => {
          const { data } = res;
          const coords = {
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
          };
          commit('updateCoords', coords);
        });
    },
    async updateCoordsByDevice({ commit }) {
      await getCurrentPosition().then((res) => {
        const { coords } = res;
        const coordinates = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        commit('updateCoords', coordinates);
      });
    },
    updateForecast({ dispatch }) {
      dispatch('updateCurrentForecast');
      dispatch('updateHourlyForecast');
      dispatch('updateWeeklyForecast');
    },
    updateCurrentForecast({ state, commit }) {
      const baseUrl = 'https://api.weatherbit.io/v2.0/';
      const apiKey = process.env.VUE_APP_WEATHER_API;
      const lat = state.coords.latitude.toFixed(2);
      const lon = state.coords.longitude.toFixed(2);
      const resUrl = `${baseUrl}current?lat=${lat}&lon=${lon}&key=${apiKey}`;
      axios.get(resUrl)
        .then((res) => {
          const { data } = res.data;
          commit('updateCurrentForecast', data[0]);
        });
    },
    updateWeeklyForecast({ state, commit }) {
      const baseUrl = 'https://api.weatherbit.io/v2.0/';
      const apiKey = process.env.VUE_APP_WEATHER_API;
      const lat = state.coords.latitude.toFixed(2);
      const lon = state.coords.longitude.toFixed(2);
      const resUrl = `${baseUrl}/forecast/daily?lat=${lat}&lon=${lon}&days=7&key=${apiKey}`;
      axios.get(resUrl)
        .then((res) => {
          const { data } = res.data;
          commit('updateWeeklyForecast', data);
        });
    },
    updateHourlyForecast({ state, commit }) {
      const baseUrl = 'https://api.weatherbit.io/v2.0/';
      const apiKey = process.env.VUE_APP_WEATHER_API;
      const lat = state.coords.latitude.toFixed(2);
      const lon = state.coords.longitude.toFixed(2);
      const resUrl = `${baseUrl}/forecast/hourly?lat=${lat}&lon=${lon}&hours=26&key=${apiKey}`;
      axios.get(resUrl)
        .then((res) => {
          const { data } = res.data;
          commit('updateHourlyForecast', data);
        });
    },
  },
  getters: {
    getEvenHoursForecast(state) {
      return state.hourly.filter((_, index) => index % 2 === 0);
    },
    getHoursTemp(state) {
      return state.hourly
        .filter((_, index) => index % 2 === 0)
        .map((hour) => hour.temp);
    },
  },
  plugins: [createPersistedState()],
});
