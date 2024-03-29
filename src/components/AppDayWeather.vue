<template>
  <div class="day-weather">
    <div class="day-weather__city-name">{{ weather.city_name }}</div>
    <div class="day-weather__update-time">last update: {{ formatedUpdateTime }}</div>
    <div class="day-weather__indicators">
      <div class="day-weather__item" v-tooltip.top-center="{content: 'Wind Speed'}">
        <span class="day-weather__icon">
          <img src="/img/weather-icons/wind_spd.svg" width="30" alt />
        </span>
        <span class="day-weather__value">{{ Math.round(weather.wind_spd) }} m/s</span>
      </div>
      <div class="day-weather__item" v-tooltip.top-center="{content: 'Clouds'}">
        <span class="day-weather__icon">
          <img src="/img/weather-icons/clouds.svg" width="30" alt />
        </span>
        <span class="day-weather__value">{{ weather.clouds }}%</span>
      </div>
      <div class="day-weather__item" v-tooltip.top-center="{content: 'Wind Direction'}">
        <span class="day-weather__icon">
          <img src="/img/weather-icons/wind_dir.svg" width="30" alt />
        </span>
        <span class="day-weather__value">{{ weather.wind_cdir }}</span>
      </div>
    </div>
    <span class="day-weather__temperature">{{ weather.temp }}</span>
    <span class="day-weather__description">{{ weather.weather.description }}</span>
    <div class="day-weather__indicators">
      <div class="day-weather__item" v-tooltip.top-center="{content: 'Sunrise'}">
        <span class="day-weather__icon">
          <img src="/img/weather-icons/sunrise.svg" width="30" alt />
        </span>
        <span class="day-weather__value">{{ formatedSunriseTime }}</span>
      </div>

      <div class="day-weather__item" v-tooltip.top-center="{content: 'Sunset'}">
        <span class="day-weather__icon">
          <img src="/img/weather-icons/sunset.svg" width="30" alt />
        </span>
        <span class="day-weather__value">{{ formatedSunsetTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import dateService from '@/services/date';

export default {
  directives: {
    tooltip: VTooltip,
  },
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
      return this.fromatSunriseAndSunsetTime(this.weather.sunrise);
    },
    formatedSunsetTime() {
      return this.fromatSunriseAndSunsetTime(this.weather.sunset);
    },
    formatedUpdateTime() {
      return dateService.getTimeFromNow(this.updateTime);
    },
  },
  methods: {
    fromatSunriseAndSunsetTime(time) {
      const parsedTime = dateService.parseDateWithTemlate(time);
      const timeWithOffset = dateService.getTimeWithOffset(parsedTime);
      return dateService.formatDate(timeWithOffset, 'HH:mm');
    },
  },
};
</script>

<style>
.day-weather {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.day-weather__item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.day-weather__icon {
  margin: 0 10px;
  width: 30px;
}
.day-weather__icon img {
  width: 100%;
}
.day-weather__indicators {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 10px 0;
}
.day-weather__city-name {
  text-align: center;
  font-size: 3em;
}
.day-weather__update-time {
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
}
.day-weather__temperature {
  position: relative;
  text-align: center;
  font-size: 7em;
  padding-right: 20px;
  line-height: 1;
}
.day-weather__temperature::after {
  content: '\00B0';
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.4em;
}
.day-weather__description {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}
.day-weather__value {
  cursor: help;
}
</style>
