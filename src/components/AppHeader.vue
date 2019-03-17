<template>
  <div class="app-header">
    <button role="button" class="btn" @click="g">
      <span class="btn__icon">
        <img src="/img/icons/geolocation.svg">
      </span>
    </button>
    <button role="button" class="btn"  @click="r">
      <span class="btn__icon">
        <img src="/img/icons/refresh.svg" alt>
      </span>
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    r() {
      this.$emit('refresh');
    },
    g() {
      this.$emit('geo');
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
