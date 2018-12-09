import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Router from 'vue-router';
import GameList from '@/components/GameList.vue'
import GameDetail from './components/GameDetail.vue';
import Library from './components/Library.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router);

Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Library,
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
      path: '/game/:id',
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
  ],
});
