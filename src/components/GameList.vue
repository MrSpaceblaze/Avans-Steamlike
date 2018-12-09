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
import Vue from 'vue'
import axios from 'axios'
import {config} from '../../config/config'
export default Vue.extend({
    data:{
        games:[{}]
    },
    mounted:function(){
        axios.get("localhost:"+ config.prototype.port+"/api/dev/register",{headers:{Authorisation:
        document.cookie
                    .split(';')
                    .map(c=>c.trim())
                    .filter(cookie=>{
                        return cookie.substring(0,"Auth".length+1)==`${"Auth"}=`;
                    })
                    .map(cookie=>{
                        return decodeURIComponent(cookie.substring("Auth".length+1));
                    })[0]
                }
            }).then((response)=>{
                alert(response)
                this.games=response.data
            })
    }
})
</script>

