<template>
  <div class="weekly-forecast">
    <h2 class="app-title">Weekly forecast</h2>
    <ul class="weekly-list">
      <li class="weekly-item" v-for="(day, index) in weather" :key="index">
        <div class="weekly-item__date">
          <div class="weekly-item__day-name">{{ formatToDayOfWeek(day.ts) }}</div>
          <div class="weekly-item__day">{{ formatToDayAndMonth(day.ts) }}</div>
        </div>
        <div class="weekly-item__icon">
          <img :src="getWeatherIcon(day.weather.icon)" width="50" alt>
        </div>
        <div class="weekly-info">
          <div class="weekly-info__item">
            <div class="weekly-info__value">{{Math.round(day.min_temp)}} &deg;</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/drops.svg" alt>
            </div>
            <div class="weekly-info__value">{{day.pop}} %</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/wind.svg" alt>
            </div>
            <div class="weekly-info__value">{{ Math.round(day.wind_spd) }} m/h</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__value">{{Math.round(day.max_temp)}} &deg;</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/sunrise.svg" alt>
            </div>
            <div class="weekly-info__value">{{ formatToLocalTime(day.sunrise_ts)}}</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/sunset.svg" alt>
            </div>
            <div class="weekly-info__value">{{ formatToLocalTime(day.sunset_ts)}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import getWeatherIcon from '../utils/weathericons.js';
import dayjs from 'dayjs';

export default {
  props: {
    weather: Array,
  },
  watch: {
    weather(value) {
      this.week = value;
    },
  },
  methods: {
    getWeatherIcon,
    formatToDayOfWeek(value) {
      return dayjs(value * 1000).format('dddd');
    },
    formatToDayAndMonth(value) {
      return dayjs(value * 1000).format('DD/MM');
    },
    formatToLocalTime(value) {
      return dayjs(value * 1000).format('LT');
    },
  },
};
</script>

<style>
.weekly-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}
.weekly-item {
  display: flex;
  flex-wrap: nowrap;
  margin: 5px 0;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
}
.weekly-item__date {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  font-size: 18px;
  font-weight: bold;
}
.weekly-item__day-name {
  width: 100%;
  text-align: center;
}
.weekly-item__icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.weekly-info {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
}
.weekly-info__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
}
</style>
