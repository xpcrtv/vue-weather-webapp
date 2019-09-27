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
    async update() {
      try {
        await this.$store.dispatch('updateForecast');
      } catch (e) {
        this.$store.commit('setErrorState', true);
        this.$store.commit('setErrorMessage', e);
        this.$store.commit('setLoadingState', false);
      }
      this.$store.dispatch('updateTime');
    },
    async getGeo() {
      try {
        await this.$store.dispatch('updateCoordsByDevice');
      } catch (e) {
        this.$store.commit('setErrorState', true);
        this.$store.commit('setErrorMessage', e.message);
      }
      this.update();
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
