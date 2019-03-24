import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import getCurrentPosition from './utils/getCurrentPosition';
import buildQueries from './utils/buildQueries';


Vue.use(Vuex);

const baseUrl = process.env.VUE_APP_WEATHER_API_URL;
const apiKey = process.env.VUE_APP_WEATHER_API;

export default new Vuex.Store({
  state: {
    errorState: false,
    errorMessage: '',
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
    setErrorState(state, bool) {
      state.errorState = bool;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
  },
  actions: {
    initState({ dispatch }) {
      const storageData = JSON.parse(localStorage.getItem('vuex'));
      if (!storageData || storageData.updateTime === 0) {
        dispatch('updateForecastByIpCoords');
      }
    },
    updateTime({ commit }) {
      const currentTime = new Date().getTime();
      commit('updateTime', currentTime);
    },
    updateForecastByIpCoords({ dispatch, commit }) {
      axios.get('/mocks/geo.json')
        .then((res) => {
          const { data } = res;
          const coords = {
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
          };
          commit('updateCoords', coords);
        })
        .then(() => {
          dispatch('updateForecast');
          dispatch('updateTime');
        }).catch((err) => {
          commit('setErrorState', true);
          commit('setErrorMessage', err.message);
        });
    },
    updateForecastByDeviceCoords({ commit, dispatch }) {
      getCurrentPosition().then((res) => {
        const { coords } = res;
        const coordinates = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        commit('updateCoords', coordinates);
      })
        .then(() => {
          dispatch('updateForecast');
          dispatch('updateTime');
        })
        .catch((err) => {
          commit('setErrorState', true);
          commit('setErrorMessage', err.message);
        });
    },
    updateForecast({ dispatch }) {
      dispatch('updateCurrentForecast');
      dispatch('updateHourlyForecast');
      dispatch('updateWeeklyForecast');
    },
    updateCurrentForecast({ state, commit }) {
      const queries = buildQueries({
        lat: state.coords.latitude.toFixed(2),
        lon: state.coords.longitude.toFixed(2),
        key: apiKey,
      });
      axios.get(`${baseUrl}/current${queries}`)
        .then((res) => {
          const { data } = res.data;
          commit('updateCurrentForecast', data[0]);
        }).catch((err) => {
          commit('setErrorState', true);
          commit('setErrorMessage', err.message);
        });
    },
    updateWeeklyForecast({ state, commit }) {
      const queries = buildQueries({
        lat: state.coords.latitude.toFixed(2),
        lon: state.coords.longitude.toFixed(2),
        days: 8,
        key: apiKey,
      });
      axios.get(`${baseUrl}/forecast/daily${queries}`)
        .then((res) => {
          const { data } = res.data;
          commit('updateWeeklyForecast', data.filter((_, i) => i !== 0));
        }).catch((err) => {
          commit('setErrorState', true);
          commit('setErrorMessage', err.message);
        });
    },
    updateHourlyForecast({ state, commit }) {
      const queries = buildQueries({
        lat: state.coords.latitude.toFixed(2),
        lon: state.coords.longitude.toFixed(2),
        hours: 26,
        key: apiKey,
      });
      axios.get(`${baseUrl}/forecast/hourly${queries}`)
        .then((res) => {
          const { data } = res.data;
          commit('updateHourlyForecast', data);
        }).catch((err) => {
          commit('setErrorState', true);
          commit('setErrorMessage', err.message);
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
