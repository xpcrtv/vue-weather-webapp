<template>
  <div :class="`error-message ${errorState}`">
    <p class="error-message__text">{{ errorMessage }}</p>
    <button
      role="button"
      aria-label="Close erroe message"
      class="error-message__close"
      @click="closeError"
    ></button>
  </div>
</template>

<script>
export default {
  computed: {
    errorState() {
      return this.$store.state.errorState ? 'error-message--open' : '';
    },
    errorMessage() {
      return this.$store.state.errorMessage;
    },
  },
  methods: {
    closeError() {
      this.$store.commit('setErrorState', false);
    },
  },
};
</script>

<style>
.error-message {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  background-color: #dd564c;
  border-radius: 30px;
  padding: 12px 30px;
  transform: translateY(-100px);
  transition: transform 0.3s;
}
.error-message__text {
  text-align: center;
  margin: 0;
}
.error-message__close {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  padding: 0;
  margin: 0;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  border-radius: 50%;
  outline: none;
  transition: all 0.3s;
  -webkit-tap-highlight-color: none;
  cursor: pointer;
}
.error-message__close:hover,
.error-message__close:active {
  box-shadow: 0 0 1px 1px #fff;
}

.error-message__close::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  display: inline-block;
  width: 13px;
  height: 2px;
  background-color: #fff;
}
.error-message__close::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  display: inline-block;
  width: 13px;
  height: 2px;
  background-color: #fff;
}
.error-message--open {
  transform: translateY(0);
}
</style>
