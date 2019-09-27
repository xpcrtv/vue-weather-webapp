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
          <img
            v-tooltip.top-center="day.weather.description"
            :src="getWeatherIcon(day.weather.icon)"
            width="50"
            :alt="day.weather.description"
            slot="reference"
          >
        </div>
        <div class="weekly-info">
          <div class="weekly-info__item">
            <div
              class="weekly-info__value"
              v-tooltip.top-center="{content: 'Minimum temp', trigger: 'click'}"
            >{{Math.round(day.min_temp)}} &deg;</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/drops.svg" alt>
            </div>
            <div
              class="weekly-info__value"
              v-tooltip.top-center="{content: 'Probability of Precipitation'}"
            >{{day.pop}} %</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/wind.svg" alt>
            </div>
            <div
              class="weekly-info__value"
              v-tooltip.top-center="{content: 'Wind speed'}"
            >{{ Math.round(day.wind_spd) }} m/h</div>
          </div>
          <div class="weekly-info__item">
            <div
              class="weekly-info__value"
              v-tooltip.top-center="{content: 'Maximum temp'}"
            >{{Math.round(day.max_temp)}} &deg;</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/sunrise.svg" alt>
            </div>
            <div
              class="weekly-info__value"
              v-tooltip.top-center="{content: 'Sunrise'}"
            >{{ formatToLocalTime(day.sunrise_ts)}}</div>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/sunset.svg" alt>
            </div>
            <div
              class="weekly-info__value"
              v-tooltip.top-center="{content: 'Sunset'}"
            >{{ formatToLocalTime(day.sunset_ts)}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import getWeatherIcon from '@/utils/weathericons';
import dateService from '@/services/date';
export default {
  directives: {
    tooltip: VTooltip,
  },
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
      return dateService.formatDate(value * 1000, 'dddd');
    },
    formatToDayAndMonth(value) {
      return dateService.formatDate(value * 1000, 'DD/MM');
    },
    formatToLocalTime(value) {
      return dateService.formatDate(value * 1000, 'LT');
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
.weekly-info__value,
.weekly-item__icon {
  cursor: help;
}
.weekly-info__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
}
.weekly-info__value {
  -webkit-tap-highlight-color: transparent;
}
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: #3c455c;
  color: white;
  border-radius: 10px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: #3c455c;
  z-index: 1;
}

.tooltip[x-placement^='top'] {
  margin-bottom: 5px;
}

.tooltip[x-placement^='top'] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: #3c455c;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(#3c455c, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
