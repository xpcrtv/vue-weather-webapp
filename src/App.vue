<template>
  <div class="weather-app">
    <app-header/>
    <app-day-weather :weather="current" :updateTime="updateTime"/>
    <app-hours :weather="hourly"/>
    <app-week-forecast :weather="weekly"/>
  </div>
</template>

<script>

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';


import { mapState } from 'vuex';
import AppWeekForecast from './components/AppWeekForecast.vue';
import AppHours from './components/AppHours.vue';
import AppDayWeather from './components/AppDayWeather.vue';
import AppHeader from './components/AppHeader.vue';

dayjs.extend(LocalizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.locale('en');

export default {
  name: 'app',
  components: {
    AppHeader,
    AppDayWeather,
    AppHours,
    AppWeekForecast,
  },
  computed: {
    ...mapState(['updateTime', 'coords', 'current', 'hourly', 'weekly']),
  },
  mounted() {
    this.$store.dispatch('initState');
  },
};
</script>

<style>
html {
  -ms-overflow-style: none;
  background-color: #fff;
}
body {
  font-family: 'Dosis', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  background-color: #fafafa;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.weather-app {
  color: #fff;
  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
  width: 375px;
  height: 700px;
  border-radius: 30px;
  background: rgb(224, 167, 161);
  background: linear-gradient(to top, #b7dcd5 0%, #e0a7a1 100%);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  -webkit-overflow-scrolling: touch;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
}
@media screen and (max-width: 768px) {
  .weather-app {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}
::-webkit-scrollbar {
  display: none;
}
.app-title {
  text-align: center;
  margin: 20px 0;
  font-size: 2em;
  font-weight: normal;
}
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: none;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  border: 1px solid #fff;
  padding: 5px;
  cursor: pointer;
  outline: none;
  transition: 0.4s all;
}
.btn__icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
}
.btn__icon img {
  display: inline-block;
  width: 100%;
}
</style>
