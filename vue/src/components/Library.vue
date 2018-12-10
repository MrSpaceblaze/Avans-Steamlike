<template>
        <div class="row">
        <div id="sidebar" class="col-3">
            <div class="list-group">
                <div v-for="game in games" v-bind:key="game._id">
                    <button class="list-group-item" v-on:click="setGame(game)">{{game.name}}</button>
                </div>
            </div>
        </div>
        <div class="col">
                <subitem-game name="selectedGame.name" desc="selectedGame.desc" image="selectedgame.image"/>
        </div>
        </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import config from '../config/config';
import LibraryGame from './LibraryGame.vue';

export default Vue.extend({
    data(){return{
        games: [{}],
        selectedGame:{}
    }
    },
    components: {
        'subitem-game': {
            props: {
                name: String,
                desc: String,
                image: String,
            },
            component: LibraryGame,
        },
    },
    mounted() {
        axios
            .get(config.url + '/users/library', {headers: {Authorisation:
                document.cookie
                    .split(';')
                    .map((c) => c.trim())
                    .filter((cookie) => {
                        return cookie.substring(0, 'Auth'.length + 1) === `${'Auth'}=`;
                    })
                    .map((cookie) => {
                        return decodeURIComponent(cookie.substring( 'Auth'.length + 1));
                    })[0],
                },
            }).then((response) => {
                alert(response);
                this.games = response.data;
            });
    },
});
</script>


<style>
 ul{
     overflow-y: scroll;
     height: 100%;
 }
</style>
