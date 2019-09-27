<template>
  <div class="hours-chart">
    <h2 class="app-title">Hours Chart</h2>
    <div class="trend" v-dragscroll="isDraggable">
      <ul class="hours-list">
        <li class="hours-list__item" v-for="(hour, index) in hoursData" :key="index">
          <div class="hours-list__day">{{ Math.round(hour.temp) }} &deg;</div>
        </li>
      </ul>
      <trend
        class="chart"
        :data="hoursTemp"
        auto-draw
        smooth
        :gradient="['#fff']"
        :padding="30"
        :width="780"
        :height="100"
      />
      <ul class="hours-list">
        <li class="hours-list__item" v-for="(hour, index) in hoursData" :key="index">
          <div class="hours-list__day hours-list__day--time">{{ hour.ts }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import dateService from '@/services/date';
import trend from 'vuetrend';
import { dragscroll } from 'vue-dragscroll';

export default {
  components: {
    trend,
  },
  directives: {
    dragscroll,
  },
  props: {
    weather: {
      type: Array,
    },
  },
  computed: {
    isDraggable() {
      return window.matchMedia('(min-width: 768px)').matches;
    },
    evenHoursForecast() {
      return this.$store.state.hourly.filter((_, index) => index % 2 === 0);
    },
    hoursData() {
      return this.evenHoursForecast.map((hourItem) => {
        const { ts } = hourItem;
        const dateOffset = 1000;
        const formatedTime = dateService.formatDate(ts * dateOffset, 'HH:mm');
        return Object.assign({}, hourItem, { ts: formatedTime });
      });
    },
    hoursTemp() {
      return this.evenHoursForecast.map((hour) => hour.temp);
    },
  },
};
</script>

<style>
.hours-list {
  width: 780px;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: grab;
}

.hours-list__item {
  text-align: center;
  width: 60px;
  font-size: 14px;
  font-weight: bold;
  padding-left: 10px;
}

.hour_temp {
  font-size: 2em;
}
.trend {
  overflow: hidden;
  overflow-x: scroll;
  padding-top: 10px;
  padding-bottom: 10px;
}
@media screen and (max-width: 768px) {
  .trend {
    overflow-x: scroll;
  }
}
.chart {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0) 1px
  );
  cursor: grab;
  background-size: 60px;
  background-position: 30px center;
}
</style>
