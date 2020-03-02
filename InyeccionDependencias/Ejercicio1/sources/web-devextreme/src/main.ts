import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';
import 'devextreme/dist/css/dx.common.css';
import i18n from './locales/i18n';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount('#app');
