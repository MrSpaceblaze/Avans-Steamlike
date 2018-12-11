const ApiResponse = require('../model/response/api.response')
const Developer = require('../schemas/developer.schema').Developer
const Achievement = require('../schemas/achievement.schema').Achievement
const Game = require('../schemas/game.schema').Game
const User = require('../schemas/user.schema').User
const auth = require('../config/authentication.config')
const neodb = require('../neodb/seraphhelper')

function createNew(req,res){
	var token = req.get('Authorization') || ''
	var decodedUsername

	var image = req.body.image || ''
	var name = req.body.name || ''
	var desc = req.body.desc || ''

	if(image==''||name==''||desc==''){
		res.status(412).json({err:"Image, name or desc aren't filled out"}).end()
	}else{
		if (token != '') {
			decodedUsername = auth.decodeToken(token)
		}
		Developer.findOne({devUserName:decodedUsername.sub},(err,dev)=>{
			Game.findOne({developer:dev,_id:req.params.gid},(err,game)=>{
				var ac = new Achievement({pic:image,name:name,desc:desc,game:game})
				game.achievements.push(ac)
				game.save().then(()=>{
					res.status(200).json(ac).end()
				})
			})
		})
	}
}

function getAll(req,res){
	Game.findOne({_id:req.params.gid},{},(err,game)=>{
		if(err){
			res.status(500).json(err).end()
		}else{
			res.status(200).json(game.achievements).end()
		}
	})
}

function achieve(req,res){
	var token = req.get('Authorization') || ''
	var decodedUsername

	if (token != '') {
		decodedUsername = auth.decodeToken(token)
	}

	User.findOne({username:decodedUsername.sub},(err,user)=>{
		if (err){
			res.status(200).json(err).end()
		} else {
			Game.findOne({_id:req.params.gid},(err,game)=>{
				if(user.library.some((val)=>{
					return val._id==req.params.gid
				})) {
					neodb.saveRel(user.username,"achieved",req.body.id,{},(err,rel)=>{
						res.status(200).json(rel).end()
					})
				} else {
					res.status(403).json("Client does not own game #"+req.params.gid)
				}
			})
		}
	})
}

module.exports = {
	createNew,
	getAll,
	achieve
}