var mongoose = require('mongoose')
var Schema = mongoose.Schema
  const ObjectId = Schema.Types.ObjectId;
  
  const Achievement = require('./achievement.schema.ts');

 var GameSchema = new Schema({
    photo:{
      type: Blob,
      required:false,
    },

    developer: {
      type: ObjectId,
      ref:'developer',
      required:true,
    },

    gameName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    achievements: {
      type: [Achievement],
      required: false,
    },

    active:{
      type:Boolean,
      default:true
    }
});

 var Game = mongoose.model('game', GameSchema);

  module.exports = {
	  Game,
	  GameSchema,
  };
