<template>
<div>
    <div v-if="name!=null" class="center-block">
        {{game}}
    </div>
    
<div v-if="name!=null">
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
            <a v-on:click="refund()">Refund</a>
            <a v-on:click="review(game)">Review</a>
        </div>
    </div>
    
    
</div>
</template>
