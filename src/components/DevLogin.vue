<template>
    <div class="container">
        <div>
            <h4> Developer Login</h4>
            <form id="login">
                <div class="row">
                    <div class="col">
                        <p>Username</p>
                    </div>
                    <div class="col">
                        <input type="text" v-model="username">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>Password</p>
                    </div>
                    <div class="col">
                        <input type="password" v-model="password">
                    </div>
                </div>
                
                
                <button v-on:click="submit()"> Login </button>
            </form>
        </div>
        <div>
            <router-link to="/login"> regular login </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { config } from '../../config/config'

export default Vue.extend({
    el:"login",
    data:{
        username:"",
        password:"",
        
    },
    methods:{
        submit:function(){
            alert("Submitted")
            axios.post("localhost:"+ config.prototype.port+"/api/dev/login",{username:this.username,password:this.password})
                .then((response)=>{
                    if(response.status==200){
                        alert("logged in: " + response.data)
                    }else{
                        alert("Error")
                    }
                })
        }
    }
})
</script>
