import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as VR from 'vue-resource';

Vue.config.productionTip = false;
Vue.use(VR.default);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
