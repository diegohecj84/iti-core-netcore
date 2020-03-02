import VeeValidate, { Validator } from 'vee-validate';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'vuetify/src/stylus/app.styl';
import App from './app.vue';
import './plugins/iti-core-vue';
import router from './router/router';
import { validateLocaleEs, store, i18n } from '@iti/vue-core';

import 'material-design-icons/iconfont/material-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);

// Para validación usaremos VeeValidate, que está documentado aquí:
//    https://baianat.github.io/vee-validate/guide/rules.html#after
//
// Detalle explicado en https://www.mistergoodcat.com/post/vuejs-validation-with-typescript
// HACK: delay: 1 avoids "one-behind"-error in text fields with dot-properties
Vue.use(VeeValidate, { inject: false, delay: 1 });
// Localize takes the locale object as the second argument (optional) and merges it.
Validator.localize('es', validateLocaleEs);

new Vue({
  router,
  i18n,
  store,
  render: (h: any) => h(App),
}).$mount('#app');
