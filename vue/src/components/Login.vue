<template>
    <div class="container">
        <div>
            <h4>Login</h4>
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
            <router-link to="/dev/login"> developer login</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import config from '../config/config';
import { Emit } from 'vue-property-decorator';
import router from '../router';

export default Vue.extend({
    data(){return{
        username: '',
        password: '',
    }
    },
    methods: {
        submit() {
            alert(config.url)
            axios.post(config.url + '/api/users/login',
            { username: this.username, password: this.password})
                .then((response) => {
                    if (response.status === 200) {
                        alert('logged in: ' + response.data);
                        document.cookie=response.data.token
                        Emit('user')
                        router.push('/')
                    } else {
                        alert('Error');
                    }
                });
        },
    },
});
</script>
