<template>
    <div class="container">
        <div>
            <h4> Developer Login</h4>
            <form>
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
                
                
                <button @click="submit()"> Login </button>
            </form>
        </div>
        <div>
            <router-link to="/login"> regular login </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import config from '../config/config';
import App from '../App.vue'
import { Emit } from 'vue-property-decorator';
import router from '../router';

export default Vue.extend({
    data() {
        return{
        username: '',
        password: '',
        }
    },
    methods: {
        submit() {
            alert();
            axios.post(config.url + '/api/dev/login',
            {username: this.username, password: this.password})
                .then((response) => {
                    if (response.status === 200) {
                        alert('logged in: ' + response.data);
                        document.cookie=response.data.token
                        Emit('user-dev')
                        router.push('/dev')
                    } else {
                        alert('Error');
                    }
                    
                });
        },
    },
    mounted(){
        
    }
});
</script>
