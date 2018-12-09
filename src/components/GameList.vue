<template>
    <div class="container">
        <div class="col">
            <p>Games</p>
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
                <tr id="games" v-on:click="onRow(game)" v-for="game of games" v-bind:games="games">
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
import Vue from 'vue'
export default Vue.extend({
    data:{
        
        games:function(){
            return this.getGames()
        }
    },
    methods:{
        getGames:()=>{
            return []
        }
    }
})
</script>

