<template>
    <div class="container">
        <div class="col">
            <p>Games</p>
            <table class="table">
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
                <tr id="games" v-on:click="onRow(game)" v-for="game of games" v-bind:key="game._id">
                    <td>
                        {{game.pic}}
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
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import config from '../config/config';
import router from '../router';
export default Vue.extend({
    data(){return{
        games: [{}],
    }
    },
    methods:{
        onRow(game:{type:object,_id:''}){
            router.push('/games/'+game._id)
        }
    },
    mounted() {
        axios.get(config.url + '/api/games').then((response) => {
                alert(response);
                this.games = response.data.games;
            });
    },
});
</script>

