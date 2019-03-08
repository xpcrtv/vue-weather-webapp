<template>
  <div class="weekly-forecast">
    <ul class="weekly-list">
      <li class="weekly-item" v-for="(day, index) in week" :key="index">
        <div class="weekly-item__date">
          <div class="weekly-item__day-name">{{ formatToDayOfWeek(day.ts) }}</div>
          <div class="weekly-item__day">{{ formatToDayAndMonth(day.ts) }}</div>
        </div>
        <div class="weekly-item__icon">{{ day.weather.icon }}</div>
        <div class="weekly-info">
          <div class="weekly-info__item">
            <div class="weekly-info__icon">min</div>
            <div class="weekly-info__value">{{day.min_temp}}</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">pop</div>
            <div class="weekly-info__value">{{day.pop}}</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">wind</div>
            <div class="weekly-info__value">{{day.wind_spd}}</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">max</div>
            <div class="weekly-info__value">{{day.max_temp}}</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">sunrise</div>
            <div class="weekly-info__value">{{ formatToLocalTime(day.sunrise_ts)}}</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">sunset</div>
            <div class="weekly-info__value">{{ formatToLocalTime(day.sunset_ts)}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data: () => ({
    week: [
      {
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
  }),
  props: {
    weather: Object,
  },
  watch: {
    weather(value) {
      this.week = value.data;
    },
  },
  methods: {
    formatToDayOfWeek(value) {
      return dayjs(value * 1000).format('dddd');
    },
    formatToDayAndMonth(value) {
      return dayjs(value * 1000).format('DD/MM');
    },
    formatToLocalTime(value) {
      return dayjs(value * 1000).format('HH:mm');
    },
  },
};
</script>

<style>
</style>
