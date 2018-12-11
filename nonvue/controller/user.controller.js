const ApiResponse = require('../model/response/api.response')
const User = require('../schemas/user.schema')
const Game = require('../schemas/game.schema').Game
const auth = require('../config/authentication.config')
const neo = require('../neodb/seraphhelper')


function update(req, res) {

	// Get parameters from body
	let uname = req.body.username || ''
	let pass = req.body.password || ''
	let newpassword = req.body.newpassword || ''

	// Get token from header
	var token = req.get('Authorization') || ''
	var decodedUsername
	if (token != '') {
		decodedUsername= auth.decodeToken(token)
	}

	// Check if all params are present
	if (uname == '' || pass == '' || newpassword == '') {
		res.status(412).json(new ApiResponse(412, "Please provide the parameters: username, password, newpassword")).end()
	}

	// Check for Authorization
	if (!token || !decodedUsername) {
		res.status(413).json(new ApiResponse(413, "You need to be logged in to update your password")).end()
	}

	// Find the user
	User.findOne({
			username: uname
		},

		function (err, user) {

			// If givenpassword equals the "old" password
			if (pass == user.password) {

				// Change the password
				user.password = newpassword

				// Save the changes
				user.save(function (err) {
					if (err) {
						res.status(500).json(new ApiResponse(200, err)).end()
					} else {
						res.status(200).json(new ApiResponse(200, "Changed password for user " + user.username)).end()
					}
				})
			}

			// Notify the user that the provide password does not match the current password
			else {
				res.status(413).json(new ApiResponse(200, "Old password does not match database")).end()
			}
		})
}

function getLibrary(req,res){
	var token = req.get('Authorization') || ''
	var decodedUsername
	if (token != '') {
		decodedUsername= auth.decodeToken(token)
	}
	User.findOne({username:decodedUsername.sub},(err,user)=>{
		if(err){
			res.status(500).json(err).end()
		}else{
			res.status(200).json(user.library)
		}
	})
}

function addGame(req,res){
	var token = req.get('Authorization') || ''
	var decodedUsername
	if (token != '') {
		decodedUsername= auth.decodeToken(token)
	}
	User.findOne({username:decodedUsername.sub},(err,user)=>{
		if(err){
			res.status(500).json(err).end()
		}else{
			Game.findOne({_id:req.body.game},(err,game)=>{
				User.findOneAndUpdate({username:decodedUsername.sub},{'$addtoset':game},(err,game)=>{
					if(err){
						res.status(500).json(err).end()
					} else {
						res.status(200).json("Added to library").end()
					}
				})
			})
			
		}
	})
}

function deleteGame(req,res){
	var token = req.get('Authorization') || ''
	var decodedUsername
	if (token != '') {
		decodedUsername= auth.decodeToken(token)
	}
	User.findOne({username:decodedUsername.sub},(err,user)=>{
		if(err){
			res.status(500).json(err).end()
		}else{
			Game.findOne({_id:req.body.game},(err,game)=>{
				User.findOneAndUpdate({username:decodedUsername.sub},{'$pull':game},(err,game)=>{
					if(err){
						res.status(500).json(err).end()
					} else {
						var count = game.achievements.length
						game.achievements.forEach(element => {
							neo.deleteRel(decodedUsername.sub,element._id,(err,re)=>{
								count--;
								if(count==0){
									res.status(200).json("All deleted").end()
								}
							})
						});
					}
				})
			})
			
		}
	})
}

module.exports = {
	update,
	getLibrary,
	addGame,
	deleteGame
}