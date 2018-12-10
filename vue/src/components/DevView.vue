<template>
    <div class="container">
        <div>
            <div class="row">
                <div class="col">
                    <h2>Games</h2>
                </div>
                <div class="col">
                    <router-link to="/dev/create">Create new</router-link>
                </div>
            </div>
            <div class="row">
                <table>
                <tr>
                    <th>
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Rating
                    </th>
                </tr>
                <tr id="games" v-on:click="onRow(game.index)" v-for="game of games" v-bind:key="game._id" >
                    <td>
                        <img :src="'data:image/png;base64,'+game.pic">
                    </td>
                    <td>
                        {{game.name}}
                    </td>
                    <td>
                        {{game.price}}
                    </td>
                    <td>
                        {{game.rating}}
                    </td>
                </tr>
            </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Router from '../router';
import config from '../config/config';
import axios from 'axios';
import * as config2 from '../config/authentication.config';
export default Vue.extend({
    data(){return{
        games: [{_id:''}],
    }
    },
    methods: {
        onRow(game: number) {
            const Game = this.games[game];
            Router.push({path: 'gamedetail', params: {gid: Game._id}});
        },
    },
    mounted() {
        axios.get(config.url + '/api/games/dev', {headers: {Authorisation:
        document.cookie
                    .split(';')
                    .map((c) => c.trim())
                    .filter((cookie) => {
                        return cookie.substring(0, 'Auth'.length + 1) === `${'Auth'}=`;
                    })
                    .map((cookie) => {
                        return decodeURIComponent(cookie.substring('Auth'.length + 1));
                    })[0],
                },
            }).then((response) => {
                alert(response.toString());
                this.games = response.data.games
            });
    },
});
</script>

<style>
img{
    height: 50px;
    width: 50px;
}
</style>

