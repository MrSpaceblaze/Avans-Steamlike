<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/game">Games</router-link>
      <div v-if="userType=='user'">
        <router-link to="/library">Library</router-link>
      </div>
      <div v-if="userType=='dev'">
        <router-link to="/dev">Dev Enviroment</router-link>
      </div>
      <div v-if="userType=='none'">
          <router-link to="/login">Log In</router-link>
        | <router-link to="/register">Register</router-link>
      </div>
    </div>
    <router-view @user-dev="setUser('dev')" @user="serUser('user')"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios';
import config from './config/config'
export default Vue.extend({
  data(){
    return{
      userType:'none',
    }
  },
  methods:{
    setUser(userType:string){
      this.userType==userType
    }
  }
})
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
