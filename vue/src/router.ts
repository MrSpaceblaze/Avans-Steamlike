import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Router from 'vue-router';
import GameList from '@/components/GameList.vue';
import GameDetail from './components/GameDetail.vue';
import Library from './components/Library.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import DevLogin from './components/DevLogin.vue';
import DevRegister from './components/DevRegister.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Router);

Vue.use(BootstrapVue);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameList,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/game/:gid',
      name: 'gamedetail',
      component: GameDetail,
    },
    {
      path: '/game',
      name: 'gamelist',
      component: GameList,
    },
    {
      path: '/library',
      name: 'library',
      component: Library,
    },
    {
      path: '/dev/register',
      name: 'devregister',
      component: DevRegister,
    },
    {
      path: '/dev/login',
      name: 'devlogin',
      component: DevLogin,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    
    
  ],
});
