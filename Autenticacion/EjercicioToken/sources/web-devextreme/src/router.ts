import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/home.vue';
import defaultLayout from './layouts/side-nav-outer-toolbar.vue';
import Displaydata from './views/display-data/display-data.vue';
// import { itiRouterGuardService, ItiRouterView } from '@iti/vue-core'; TODO

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Home,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        // content: Profile,
      },
    },
    {
      path: '/display-data',
      name: 'display-data',
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Displaydata,
      },
    },
    // {
    //   path: '/login-form',
    //   name: 'login-form',
    //   meta: { requiresAuth: false },
    //   components: {
    //     layout: simpleLayout,
    //     // route level code-splitting
    //     // this generates a separate chunk (login.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     content: () =>
    //       import(/* webpackChunkName: 'login' */ './views/login-form')
    //   }
    // },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/recovery',
      redirect: '/home',
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
});
