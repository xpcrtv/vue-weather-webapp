<template>
  <div class="weather-app">
    <!-- <button @click="getGeo">get position</button> -->
    <div class="city">{{current.city_name}}</div>
    <div class="time">{{current.datetime}}</div>
    <div class="temp">
      <span class="temp_deg">
        {{current.temp}}
      </span>
      <span class="temp_metric">°</span>
    </div>
    <div class="hours">
      <ul class="hours_list" v-dragscroll>
        <li class="hour" v-for="(hour, index) in hourly.data" :key="index">
          <div class="hour_time">
            {{new Date(hour.timestamp_local).getDate()}}
            /
            0{{new Date(hour.timestamp_local).getMonth() + 1 }}
          </div>
          <div class="hour_temp">{{Math.floor(hour.temp)}}</div>
          <div class="hour_time">{{new Date(hour.timestamp_local).getHours()}}:00</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll';
import Weather from './services/weather';
import Geolocation from './services/geolocation';

const weather = new Weather();
const geolocation = new Geolocation();

export default {
  name: 'app',
  directives: {
    dragscroll,
  },
  data: () => ({
    coords: {},
    hourly: {},
    current: {},
    week: {},
  }),
  async mounted() {
    const initialPosition = await geolocation.getCoordinatesByIp()
      .then((coords) => {
        this.coords = coords;
        return this.coords;
      });
    this.hourly = await weather.getHourlyForecast(initialPosition);
    this.current = await weather.getDailyForecast(initialPosition);
    this.week = await weather.getWeeklyForecast(initialPosition);
  },
  methods: {
    getGeo() {
      geolocation.getCoordinatesByDevice().then((pos) => {
        this.coords.latitude = pos.coords.latitude;
        this.coords.longitude = pos.coords.longitude;
        weather.updateForecasts(this.coords);
      });
    },
  },
};
</script>

<style>
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 10px;
  width: 375px;
  height: 700px;
  border-radius: 30px;
  background: rgb(224,167,161);
  background: linear-gradient(0, rgba(183,220,213,1) 0%, rgba(224,167,161,1) 100%);
  box-shadow: 0 10px 20px rgba(0,0,0,.30);
  overflow: hidden;
}

.temp {
  color: #fff;
  text-align: center;
  width: 100%;
}
.temp_deg {
  font-size: 9em;
}

.city {
  text-align: center;
  font-size: 3em;
  font-weight: bold;
  color: #DD564C;
}

.time {
  text-align: center;
  font-size: 1em;
  font-weight: bold;
  color: #DD564C;
}

.temp_metric {
  display: inline-block;
  margin-top: 20px;
  vertical-align: top;
  font-size: 5em
}

.hours {
  position: relative;
  padding: 0;
  margin: 0;
  color: #fff;
  cursor: grab;
}

.hours_list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

.hour {
  text-align: center;
  min-width: 50px;
}

.hour_temp {
  font-size: 2em;
}

@media screen and (max-width: 380px) {
  .weather-app {
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: 0 0 0 #fafafa;
  }
}
</style>
