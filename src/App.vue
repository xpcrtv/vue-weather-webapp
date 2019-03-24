<template>
  <div :class="`weather-app ${daytime}`">
    <app-header/>
    <app-day-weather :weather="current" :updateTime="updateTime"/>
    <app-hours :weather="hourly"/>
    <app-week-forecast :weather="weekly"/>
    <app-error-message/>
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
import AppErrorMessage from './components/AppErrorMessage.vue';

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
    AppErrorMessage,
  },
  computed: {
    ...mapState(['updateTime', 'coords', 'current', 'hourly', 'weekly']),
    daytime() {
      const hour = new Date().getHours();
      return hour > 6 && hour < 20 ? 'weather-app--day' : 'weather-app--night';
    },
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
  position: relative;
  color: #fff;
  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
  width: 375px;
  height: 700px;
  border-radius: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  -webkit-overflow-scrolling: touch;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
}
.weather-app > :nth-child(-n + 4) {
  opacity: 0;
  animation-name: fadeIn;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}
.weather-app > :nth-child(1) {
  animation-delay: 0s;
}

.weather-app > :nth-child(2) {
  animation-delay: 0.4s;
}

.weather-app > :nth-child(3) {
  animation-delay: 0.8s;
}

.weather-app > :nth-child(4) {
  animation-delay: 1.2s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.weather-app--night {
  background: rgb(224, 167, 161);
  background: linear-gradient(to top, #b7dcd5 0%, #191919 100%);
}
.weather-app--day {
  background: rgb(224, 167, 161);
  background: linear-gradient(to top, #b7dcd5 0%, #e0a7a1 100%);
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
  text-decoration: none;
  outline: none;
  display: inline-block;
  padding: 10px;
  position: relative;
  background-color: transparent;
  border: 2px solid #ffffff;
  border-radius: 50%;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  transition: 0.4s;
  cursor: pointer;
}
.btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 50%;
  transition: 0.4s;
}
.btn:hover .btn__icon--scale img {
  animation: 1s scale linear infinite;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.btn:hover .btn__icon--rotate img {
  transform: rotate(-180deg);
}
.btn:active:after,
.btn:hover:after {
  border-color: rgba(255, 255, 255, 0.753);
  transform: scale(1.3);
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
  transition: 0.4s;
}
</style>
