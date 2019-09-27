import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Forecast from './services/forecast';
import Location from './services/location';

const location = new Location();
const forecastApi = new Forecast();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    errorState: false,
    errorMessage: '',
    updateTime: 0,
    coords: {
      latitude: 0,
      longitude: 0,
    },
    hourly: [
      {
        ts: 0,
        temp: 0,
      },
    ],
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
    weekly: [
      {
        ts: 0,
        sunrise_ts: 0,
        sunset_ts: 0,
        wind_spd: 0,
        pop: 0,
        max_temp: 0,
        min_temp: 0,
        weather: {
          icon: 'c01d',
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
    setErrorState(state, boolean) {
      state.errorState = boolean;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
    setLoadingState(state, boolean) {
      state.loading = boolean;
    },
  },
  actions: {
    async initState({ dispatch, commit }) {
      commit('setErrorState', false);
      commit('setErrorMessage', '');
      const storageData = JSON.parse(localStorage.getItem('vuex'));
      if (!storageData || storageData.updateTime === 0) {
        commit('updateCoords', await location.getLocationByIp());
        dispatch('updateForecast');
        dispatch('updateTime');
      }
    },
    updateTime({ state, commit }) {
      if (state.errorState === false) {
        const currentTime = new Date().getTime();
        commit('updateTime', currentTime);
      }
    },
    async updateCoordsByDevice({ commit }) {
      commit('updateCoords', await location.getLocationByDevice());
    },
    async updateForecast({ state, commit }) {
      if (state.errorState === false) {
        commit('setLoadingState', true);
        commit('updateCurrentForecast', await forecastApi.getCurrentForecast(state.coords));
        commit('updateWeeklyForecast', await forecastApi.getWeeklyForecast(state.coords));
        commit('updateHourlyForecast', await forecastApi.getHourlyForecast(state.coords));
        commit('setLoadingState', false);
      }
    },
  },
  getters: {
    evenHoursForecast(state) {
      return state.hourly.filter((_, index) => index % 2 === 0);
    },
  },
  plugins: [createPersistedState()],
});
