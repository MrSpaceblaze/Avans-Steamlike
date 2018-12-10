<template>
    <div class="container">
        <div>
            <h4> Developer Register</h4>
            <form id="register">
                 <div class="row">
                    <div class="col">
                        <p>Dev Name</p>
                    </div>
                    <div class="col">
                        <input type="text" v-model="name">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>Dev Username</p>
                    </div>
                    <div class="col">
                        <input type="text" v-model="username">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>Dev Password</p>
                    </div>
                    <div class="col">
                        <input type="password" v-model="password">
                    </div>
                </div>
                
                
                <button v-on:click="submit"> Register </button>
            </form>
        </div>
        <div>
            <router-link to="/register"> regular register </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import config from '../config/config';
export default Vue.extend({
    data(){return{
        name: '',
        username: '',
        password: '',
    }
    },
    methods: {
        submit() {
            alert('Submitted');
            axios.post(config.url + '/api/dev/register',
            {username: this.username, password: this.password, name: this.name})
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

