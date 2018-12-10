const ApiResponse = require('../model/response/api.response')
const neodb = require('../neodb/seraphhelper')
const User = require('../schemas/user.schema')
const Game = require('../schemas/game.schema').Game
const auth = require('../../config/authentication.config')
const Developer = require('../schemas/developer.schema').Developer

function getByID(req,res){
	Game.findOne({_id:req.params.gid},(err,game)=>{
		if(err){
			res.status(500).json(err)
		}else{
			res.status(200).json(game)
		}
	})
}

function createNew(req,res){
	var token = req.get('Authorization') || ''
	var decodedUsername

	var image = req.body.image || undefined

	if (token != '') {
		decodedUsername = auth.decodeToken(token)
	}
	Developer.findOne({devUser:decodedUsername.sub},(err,dev)=>{
		var newGame
		if(image){
			newGame = new Game({
				photo: req.files.image,
				developer: dev,
				gameName: req.body.gameName,
				description: req.body.description,
				price:parseFloat(req.body.price).toFixed(2)
			})
		} else{
			newGame = new Game({
				developer: dev,
				gameName: req.body.gameName,
				description: req.body.description
			})
		}
		newGame.save().then((err)=>{
			console.log(err)
			neodb.saveNode(newGame._id,"Game",(err,game)=>{
				if(err){
					console.log(err)
					res.status(500).json(err).end()
				}else{
					res.status(200).json(game).end()
				}
			})
		})
	})
	
}

function deactivate(req,res){
	Game.findOneAndUpdate({_id:req.params.gid},{active: false},(err,game)=>{
		if(err){
			res.status(500).json(err).end()
		}else{
			res.status(200).json(game).end()
		}
	})
}

function getGamesByDev(req,res){
	var token = req.get('Authorization') || ''
	var decodedUsername

	if (token != '') {
		decodedUsername = auth.decodeToken(token)
	}
	
	Developer.findOne({devUserName:decodedUsername.sub},{games:1},(err,dev)=>{
		res.status(200).json({games:dev.games}).end()
	})
}

function updateById(req,res){
	Game.update({_id:req.params.gid},{$set: {description:req.body.description,active:true}},(err)=>{
		if(err){
			res.status(500).json(err).end()
		}else{
			res.status(500).json({
				status:200,
				message:"Game #"+req.params.gid+" has been updated"
			})
		}
	})
}

function getAll(req,res){
	Game.find({},(err,games)=>{
		var gamelength=0
		var gamez= []
		games.forEach(game=>{
			
			neodb.getAllRels(game._id,(err,rels)=>{
				var rating = 0;
				var length = 0
				rels.forEach(element => {
					rating = rating + element.type
				});
				length++
				if(rels.length==length){
					var finalrating = rating / rels.length
					game.rating= finalrating;
					gamelength++;
					gamez.push(game)
					if(gamelength==games.length){
						res.status(200).json(new ApiResponse(200,gamez)).end()
					}
				}
			})
		})
		
	})
}

function addRating(req,res){
	var token = req.get('Authorization') || ''
	var decodedUsername

	if (token != '') {
		decodedUsername = auth.decodeToken(token)
	}

	User.findOne({username:decodedUsername.sub,games:req.params.gid},(err,game)=>{
		if(!game){
			res.status(403).json("User does not have game").end()
		}else{
			neodb.getRel(decodedUsername.sub,req.params.gid,(rel)=>{
				if(rel!=null){
					neodb.deleteRel(decodedUsername.sub,req.params.gid,(b)=>{
						if(b){
							neodb.saveRel(decodedUsername.sub,req.body.rating,req.params.gid,{ date: Date.now()},(err,done)=>{
								if(err){
									res.status(500).json(err).end()
								}else{
									res.status(200).json(done).end()
								}
							})
						}else{
							res.status(500).json("")
						}
					})
				}else{
					neodb.saveRel(decodedUsername.sub,req.body.rating,req.params.gid,{ date: Date.now()},(err,done)=>{
						if(err){
							res.status(500).json(err).end()
						}else{
							res.status(200).json(done).end()
						}
					})
				}
			})
			
		}
	})
}

function getRating(req,res){
	neodb.getAllRels(req.params.gid,(err,rels)=>{
		var rating = 0;
		var length = 0
		rels.forEach(element => {
			rating = rating + element.type
			length++
			if(rels.length==length){
				var finalrating = rating / rels.length
				res.status(200).json({rating:finalrating}).end()
			}
		});

		
	})
}

module.exports = {
	getByID, getGamesByDev,
	createNew, deactivate,
	updateById,	getAll,
	addRating, getRating,
}