import VueCompositionAPI from '@vue/composition-api';
import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);
Vue.use(VueAxios, axios);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
