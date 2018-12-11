const ApiResponse = require('../model/response/api.response')
const neo = require('../neodb/seraphhelper')
const auth = require('../config/authentication.config')
const secret = require('../config/config.json').devsecret
const Developer = require('../schemas/developer.schema').Developer

function getAll(req,res){
	Developer.find({},{_id:0,devUserName:0,devPass:0},(err,dev)=>{
		res.status(200).json(dev).end()
	})
}

function register(req,res){
	let uname = req.body.username || ''
	let pass = req.body.password || ''
	let name = req.body.name || ''
	if (uname != '' || pass != '' || name != '') {
		var dev = new Developer({
			devName:name,
			devUserName:uname,
			devPass:pass
		})
		dev.save().then(()=>{
			neo.saveNode(dev._id,"Dev",(err,node)=>{
				res.status(200).json(node).end()
			})
		})
	}else{
		res.status(412).json({msg:"Not all params entered"})
	}
}

function login(req,res){
	let uname = req.body.username || ''
	let pass = req.body.password || ''
	
	Developer.findOne({devUserName:uname},(err,dev)=>{
		if(!dev){
			res.status(404).json(new ApiResponse(404, "Couldn't find a user with username " + uname)).end()
		}else{
			if(dev.devPass==pass){
				let token = auth.encodeToken(dev.devUserName,secret)
				res.status(200).json({token:token}).end()
			}
			else{
				res.status(412).json({msg:"Incorrect credentials"}).end()
			}
		}
	})
}

module.exports = {
	getAll,
	register,
	login	
}
