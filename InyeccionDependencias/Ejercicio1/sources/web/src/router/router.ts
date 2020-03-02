import { itiRouterGuardService } from '@iti/vue-core';
import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home/home';
import Login from '../views/login/login-formulario';
import MainLayout from '../views/main-layout/main-layout';
import UsuariosRoutes from './usuarios-routes';
import TareasProgramadas from './tareas-programadas-routes';
import RolesRoutes from './roles-routes';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '*',
      redirect: '/main',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/main',
      redirect: '/main/home',
      name: 'mainlayout',
      component: MainLayout,
      beforeEnter: itiRouterGuardService.beforeEnter,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home,
        },
        { ...UsuariosRoutes },
        { ...RolesRoutes },
        { ...TareasProgramadas},
      ],
    },
  ],
});
