var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var Game = require('./game.schema');

export var DeveloperSchema = new Schema({
	
	//Name of the developer
	devName: {
		type: String,
		required: true,
		unique: true,
	},
	
	devUserName:{
		type: String,
		required:true,
		unique:true,
	},
	//Pasword the developer uses to log in
	devPass: {
		type: String,
		required: true,
	},
	//The games they have developed
	games: [Game],
});

export var Developer = mongoose.model('developer', DeveloperSchema);

module.exports = {
  Developer,
  DeveloperSchema,
};
