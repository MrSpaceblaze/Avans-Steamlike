<template>
    <div class="container">
        <div>
            <h4>Create Game</h4>
            <form id="create">
                 <div class="row">
                    <div class="col">
                        <p>Name</p>
                    </div>
                    <div class="col">
                        <input type="text" v-model="game.name">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>Description</p>
                    </div>
                    <div class="col">
                        <input type="text" v-model="game.desc">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>Price</p>
                    </div>
                    <div class="col">
                        <input type="number" v-model="game.price">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>Photo</p>
                    </div>
                    <div class="col">
                        <img :src="game.image">
                        <input type="image" v-model="game.image">
                    </div>
                    
                </div>

                <button @click="addAchievement">+</button>
                <div class="row" v-for="achievement in achievements" v-bind:key="achievement.index">
                    <div class="row">
                        <div class="col">
                            <p> Image </p>
                        </div>
                        <div>
                            <input type="image" v-model="achievement.image">
                        </div>
                        <div class="row">
                            <div class="col">
                                <p>Name</p>
                            </div>
                            <div class="col">
                                <input type="text" v-model="achievement.name">
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col">
                                <p>Description</p>
                            </div>
                            <div class="col">
                                <input type="text" v-model="achievement.desc">
                            </div>
                        </div>
                    </div>
                </div>
                
                <button v-on:click="submit"> Create </button>
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
import config from '../config/config'
import router from '../router';
export default Vue.extend({
    data() {
        return{
        game:{image:{},
            desc:"",
            name:"",
            },
        achievements: [{}],
        
        setAchievements: [{}],
        }
    },
    methods: {
        addAchievement() {
            this.achievements.push({});
        },
        setAchievement() {
            this.setAchievements.push(this.achievements);
        },
        submit(){
            axios.post(config.url+"/api/games",{image:this.game.image,desc:this.game.desc,name:this.game.name}).then(
                (res)=>{
                    if(res.status==200){
                        var achievementSize = this.setAchievements.length
                        this.setAchievements.forEach(achievement=>{
                            axios.post(config.url+"/api/games/"+res.data._id+"/achievements",{achievement})
                                .then((res)=>{
                                    if(res.status==200){
                                        achievementSize--
                                    }else{
                                        alert("error: "+res.data.err)
                                        achievementSize--
                                    }
                                    if(achievementSize==0){
                                        router.push('/dev')
                                    }
                                })
                        })
                    }else{
                        alert("error: "+res.data.err)
                    }
                }
            )
        }
    },
});
</script>
