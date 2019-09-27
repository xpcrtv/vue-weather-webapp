<template>
  <div class="app-header">
    <button role="button" aria-label="Get geolocation" class="btn" @click="getGeo">
      <span class="btn__icon btn__icon--scale">
        <img src="/img/icons/geolocation.svg" aria-hidden="true" />
      </span>
    </button>
    <button role="button" aria-label="Update weather" class="btn" @click="update">
      <span class="btn__icon btn__icon--rotate">
        <img src="/img/icons/refresh.svg" aria-hidden="true" />
      </span>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    update() {
      this.$store.dispatch('updateTime');
      this.$store.dispatch('updateForecast');
    },
    getGeo() {
      this.$store.dispatch('updateForecastByDeviceCoords');
    },
  },
};
</script>

<style>
.app-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
</style>
