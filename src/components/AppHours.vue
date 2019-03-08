<template>
  <div class="hours-chart" style="text-align: center">
    <h2>Hours Chart</h2>

    <div class="trend" v-dragscroll="true">
      <ul class="hours-list">
        <li class="hours-list__item" v-for="(hour, index) in hoursData" :key="index">
          <!-- <div class="hours-list__day">{{ hour.ts }}</div> -->
          <div class="hours-list__day">{{ Math.floor(hour.temp) }}</div>
        </li>
      </ul>
      <trend
        class="chart"
        :data="hoursTemp"
        auto-draw
        smooth
        :gradient="['#fff']"
        :padding="30"
        :width="720"
        :height="100"
      />
      <ul class="hours-list">
        <li class="hours-list__item" v-for="(hour, index) in hoursData" :key="index">
          <div class="hours-list__day hours-list__day--time">{{ formatedDay(hour.ts) }}</div>
          <!-- <div class="hours-list__day">{{ hour.temp }}</div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll';
import dayjs from 'dayjs';

export default {
  directives: {
    dragscroll,
  },
  data: () => ({
    hoursTemp: [0],
    hoursData: [{ ts: 0, temp: 0 }],
  }),
  props: {
    weather: {
      type: Object,
    },
  },
  watch: {
    weather(value) {
      this.hoursTemp = value.data
        .filter((el, i) => i % 2 === 0)
        .map((el) => el.temp);
      this.hoursData = value.data.filter((el, i) => i % 2 === 0);
    },
  },
  methods: {
    formatedDay(value) {
      return dayjs(value * 1000).format('HH:mm');
    },
  },
};
</script>

<style>
.hours-list {
  width: 720px;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  /* overflow: hidden; */
  cursor: grab;
}

.hours-list__item {
  text-align: center;
  width: 60px;
  font-size: 14px;
  font-weight: bold;
}

.hour_temp {
  font-size: 2em;
}
.trend {
  overflow: hidden;
  padding-bottom: 10px;
}
.chart {
  background:
  linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0) 1px
  );
  cursor: grab;
  background-size: 60px;
  background-position: center center;
}
</style>
