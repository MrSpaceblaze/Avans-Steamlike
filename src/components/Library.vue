<template>
        <div class="row">
        <div id="sidebar" class="col-3">
            <div class="list-group">
                <div v-for="game in [{name:'Something',desc:'Desc',pic:'pic'},{name:'something2'}]">
                    <button class="list-group-item" v-on:click="setGame(game)">{{game.name}}</button>
                </div>
            </div>
        </div>
        <div class="col">
                <subitem-game v-bind:game="getGame()"/>
        </div>
        </div>
</template>

<style>
 ul{
     overflow-y: scroll;
     height: 100%;
 }
</style>
