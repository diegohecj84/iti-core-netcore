import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from './en';
import esLocale from './es';

Vue.use(VueI18n);

const messages = {
  es: esLocale,
  en: enLocale,
};

const i18n = new VueI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
