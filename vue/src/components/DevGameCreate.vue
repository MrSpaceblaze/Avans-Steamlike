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
                        <img :src="'data:image/jpg;base64,'+game.image">
                        <input type="file" @change="handleFileSelect('g',0,$event)">
                    </div>
                    
                </div>

                <button @click="addAchievement">+</button>
                <div class="row" v-for="achievement in achievements" v-bind:key="achievement.index">
                    <div class="row">
                        <div class="col">
                            <p> Image </p>
                        </div>
                        <div>
                            <img :src="'data:image/jpg;base64,'+achievements[achievement.index].image">
                            <input type="file" @change="handleFileSelect('a',achievement.index,$event)">
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
        game:{},
        achievements: [{}],
        }
    },
    methods: {
        addAchievement() {
            this.achievements.push({});
        },
        submit(){
            axios.post(config.url+"/api/games",{image:this.game.image,desc:this.game.desc,name:this.game.name}).then(
                (res)=>{
                    if(res.status==200){
                        var achievementSize = this.achievements.length
                        this.achievements.forEach(achievement=>{
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
        },
        handleFileSelect(a,index,evt){
            var files = evt.target.files;
            var file = files[0];
  
            if (files && file) {
                var reader = new FileReader();
  
                reader.onload =this._handleReaderLoaded(this,index,a);
                reader.readAsBinaryString(file);
            }
        },
  
        _handleReaderLoaded(readerEvt,index,a:string) {
            var binaryString = readerEvt.target.result;
            if(a.charAt(0)=='a'){
                this.achievements[index].image=btoa(binaryString)
            }else{
                this.game.image = btoa(binaryString);
            }
        }
    },
});
</script>
