import Vue from 'vue';
import App from './App.vue';
import LibraryGame from './views/LibraryGame.vue'
import router from './router';
import store from './store';
import axios from 'axios';
import { Game } from './schemas/game.schema';
import GameList from './views/GameList.vue';
import * as mongoose from 'mongoose';
import * as VR from 'vue-resource';

const config = require('./config/config.json')

Vue.config.productionTip = false;
Vue.use(VR.default)

new Vue({
  el: "games",
  data () {
    return {
      games: Game.find({},(err,games)=>{
        console.log(games)
        return games})
    }
  },
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
