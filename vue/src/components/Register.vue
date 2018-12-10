<template>
    <div class="container">
        <div>
            <h4> Register</h4>
            <form id="register">
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
                
                
                <button v-on:click="submit()"> Register </button>
            </form>
        </div>
        <div>
            <router-link to="/dev/register"> Developer register </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import config from '../config/config';
export default Vue.extend({
    data(){return{
        username: '',
        password: '',
    }
    },
    methods: {
        submit() {
            axios.post( 'http://localhost:' + 50 + '/api/users/register',
            { username: this.username, password: this.password})
                .then((response) => {
                    if (response.status === 200) {
                        alert('registered: ' + response.data);
                    } else {
                        alert('Error');
                    }
                });
        },
    },
});
</script>


<style>

</style>
