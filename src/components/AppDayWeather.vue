<template>
  <div class="day-weather">
    <div class="day-weather__city-name">{{ weather.city_name }}</div>
    <div class="day-weather__update-time">last update: {{ formatedUpdateTime }}</div>
    <div class="day-weather__indicators">
      <div class="day-weather__item">
        <span class="day-weather__icon"> => </span>
        <span class="day-weather__value">{{ weather.wind_spd }} m/s</span>
      </div>
      <div class="day-weather__item">
        <span class="day-weather__icon">
          <img :src='require(`@/assets/clouds.svg`)' width="30" alt="">
        </span>
        <span class="day-weather__value">{{ weather.clouds }}%</span>
      </div>
      <div class="day-weather__item">
        <span class="day-weather__icon"> -> </span>
        <span class="day-weather__value">{{ weather.wind_cdir }}</span>
      </div>
    </div>
    <div class="day-weather__img"></div>
    <div class="day-weather__temperature">{{ weather.temp }}</div>
    <div class="day-weather__indicators">
      <div class="day-weather__item">
        <span class="day-weather__icon">
          <img :src='require(`@/assets/sunrise.svg`)' width="30" alt="">
        </span>
        <span class="day-weather__value">{{ formatedSunriseTime }}</span>
      </div>
      <div class="day-weather__item">
        <span class="day-weather__icon"> )**) </span>
        <span class="day-weather__value">{{ weather.pop }}</span>
      </div>
      <div class="day-weather__item">
        <span class="day-weather__icon">
          <img :src='require(`@/assets/sunset.svg`)' width="30" alt="">
        </span>
        <span class="day-weather__value">{{ formatedSunsetTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const timeOffset = dayjs().utcOffset();

export default {
  props: {
    updateTime: {
      type: Number,
      default: 0,
    },
    weather: {
      type: Object,
    },
  },
  computed: {
    formatedSunriseTime() {
      return dayjs(this.weather.sunrise, 'HH:mm')
        .add(timeOffset, 'minutes')
        .format('HH:mm');
    },
    formatedSunsetTime() {
      return dayjs(this.weather.sunset, 'HH:mm')
        .add(timeOffset, 'minutes')
        .format('HH:mm');
    },
    formatedUpdateTime() {
      return dayjs(this.updateTime).format('DD.MM HH:mm');
    },
  },
};
</script>

<style>

</style>
