<template>
  <div class="app-header">
    <button role="button" class="btn" @click="getGeo">
      <span class="btn__icon">
        <img src="/img/icons/geolocation.svg">
      </span>
    </button>
    <button role="button" class="btn"  @click="update">
      <span class="btn__icon">
        <img src="/img/icons/refresh.svg" alt>
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
    async getGeo() {
      await this.$store.dispatch('updateCoordsByDevice');
      this.$store.dispatch('updateForecast')
      this.$store.dispatch('updateTime');
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
