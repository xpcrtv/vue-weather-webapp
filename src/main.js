import Vue from 'vue';
import Trend from 'vuetrend';
import App from './App.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(Trend);

new Vue({
  render: h => h(App),
}).$mount('#app');
