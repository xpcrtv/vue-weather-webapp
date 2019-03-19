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
          <popper
            trigger="hover"
            :delay-on-mouse-over="500"
            transition="fade"
            enter-active-class="fade-enter-active"
            leave-active-class="fade-leave-active"
            :options="{
                placement: 'bottom',
                modifiers: { offset: { offset: '0,10px' } }
              }"
          >
            <div class="popper">{{day.weather.description}}</div>
            <img :src="getWeatherIcon(day.weather.icon)" width="50" alt slot="reference">
          </popper>
        </div>
        <div class="weekly-info">
          <div class="weekly-info__item">
            <popper
              trigger="hover"
              :delay-on-mouse-over="500"
              transition="fade"
              enter-active-class="fade-enter-active"
              leave-active-class="fade-leave-active"
              :options="{
                placement: 'top',
                modifiers: { offset: { offset: '0,10px' } }
              }"
            >
              <div class="popper">Minimum temp</div>
              <div class="weekly-info__value" slot="reference">
                {{Math.round(day.min_temp)}} &deg;
              </div>
            </popper>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/drops.svg" alt>
            </div>
            <popper
              trigger="hover"
              :delay-on-mouse-over="500"
              transition="fade"
              enter-active-class="fade-enter-active"
              leave-active-class="fade-leave-active"
              :options="{
                placement: 'bottom',
                modifiers: { offset: { offset: '0,10px' } }
              }"
            >
              <div class="popper">Probability of Precipitation</div>
              <div class="weekly-info__value" slot="reference">{{day.pop}} %</div>
            </popper>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/wind.svg" alt>
            </div>
            <popper
              trigger="hover"
              :delay-on-mouse-over="500"
              transition="fade"
              enter-active-class="fade-enter-active"
              leave-active-class="fade-leave-active"
              :options="{
                placement: 'bottom',
                modifiers: { offset: { offset: '0,10px' } }
              }"
            >
              <div class="popper">Wind speed</div>
              <div class="weekly-info__value" slot="reference">
                {{ Math.round(day.wind_spd) }} m/h
              </div>
            </popper>
          </div>
          <div class="weekly-info__item">
            <popper
              trigger="hover"
              :delay-on-mouse-over="500"
              transition="fade"
              enter-active-class="fade-enter-active"
              leave-active-class="fade-leave-active"
              :options="{
                placement: 'top',
                modifiers: { offset: { offset: '0,10px' } }
              }"
            >
              <div class="popper">Maximum temp</div>
              <div class="weekly-info__value" slot="reference">
                {{Math.round(day.max_temp)}} &deg;
              </div>
            </popper>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/sunrise.svg" alt>
            </div>
            <popper
              trigger="hover"
              :delay-on-mouse-over="500"
              transition="fade"
              enter-active-class="fade-enter-active"
              leave-active-class="fade-leave-active"
              :options="{
                placement: 'bottom',
                modifiers: { offset: { offset: '0,10px' } }
              }"
            >
              <div class="popper">Sunrise</div>
              <div
                class="weekly-info__value"
                slot="reference"
              >{{ formatToLocalTime(day.sunrise_ts)}}</div>
            </popper>
          </div>
          <div class="weekly-info__item">
            <div class="weekly-info__icon">
              <img src="/img/weather-icons/sunset.svg" alt>
            </div>
            <popper
              trigger="hover"
              :delay-on-mouse-over="500"
              transition="fade"
              enter-active-class="fade-enter-active"
              leave-active-class="fade-leave-active"
              :options="{
                placement: 'bottom',
                modifiers: { offset: { offset: '0,10px' } }
              }"
            >
              <div class="popper">Sunset</div>
              <div class="weekly-info__value" slot="reference">
                {{ formatToLocalTime(day.sunset_ts)}}
              </div>
            </popper>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Popper from 'vue-popperjs';
import getWeatherIcon from '../utils/weatherIcons';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  components: {
    popper: Popper,
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
.popper {
  background-color: #3c455c;
  padding: 5px;
  box-shadow: none;
  color: #ffffff;
  border-radius: 8px;
  border: 1px solid #3c455c;
}

.popper[x-placement^='top'] .popper__arrow {
  border-color: #3c455c transparent transparent transparent;
}

.popper[x-placement^='bottom'] .popper__arrow {
  border-color: transparent transparent #3c455c transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
