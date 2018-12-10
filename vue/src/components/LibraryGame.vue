<template>
<div>
    <div v-if="game!=null" class="center-block">
        {{game}}
    </div>
    
<div v-if="game!=null">
        <div class="col-2">
            <div class="row">
                {{game.name}}
            </div>
            <div class="row">
                <div class="col"/>
                <div class="col 2">
                    <button>
                        Play
                    </button>
                </div>
                <div class="col-5"/>
            </div>
            <div class="container">
                {{game.desc}}
            </div>
        </div>
        <div class= "col">
            <a v-on:click="refund(game)">Refund</a>
            <a v-on:click="review(game)">Review</a>
        </div>
    </div>
    
    
</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
     data(){return{
        game: { name: 'No game selected', desc: '<- Please select a game from the list to the left'},
     }
     },
});
</script>
