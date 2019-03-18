import Vue from 'vue';
import Trend from 'vuetrend';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(Trend);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
