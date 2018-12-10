<template>
    <div class="container">
        <div>
            <div class="col 3">
                <div class="row">
                    Something {{game}}
                </div>
                <div class="row">
                </div>
            </div>
            <div class="col">
            </div>
        </div>
        <div class="row">
            <button></button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import config from '../config/config';
export default Vue.extend({
    data() {
        return{
            game:{name:"name",pic:"",desc:""}
        }
        
    },
    methods:{
        getGame(){
            var r:String = this.$route.path
        var _id = r.split('/')[2]
        Axios.get(config.url+"/api/games/" + _id).then((response) => {
            this.game=response.data.game
        })
        }
    },
    mounted(){
        this.game = {name:"name",pic:"",desc:""}
    }
});
</script>

