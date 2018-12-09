const server = require('../config/config.json').databases.neo4j
const db = require('seraph')(server)

//Save Objects
function saveNode(item, label=null, next){
	db.find(item,(err,i)=>{
		if(i){
			next({err:"It already Exists"})
		} else{
			if(label !=null){
				db.save(item,(err,done)=>{next(err,done)})
			}
		}
	})
}

//Save Relationships
function saveRel(preItem1,type,preItem2,properties,next){
	getAllRels(preItem1,(rels)=>{
		getNode(preItem2,(i1)=>{
			var hasItem = rels.some((rel,index,array)=>{
				if(rel.start==i1.id||rel.end==i1.id){
					return true
				}
			})
			if(hasItem){
				var err = {err:"Err: Relationship already exists"}
				console.log(err)
				next(err)
			} else {
				getNode(preItem1,(i2)=>{
					db.create(i2,type,i1,properties,(err,rel)=>{
						next(rel)
					})
				})
			}
		})
	})
}

//Get Object by Label
function getNodeByLabel(label,next){
	db.nodeWithLabel(label,(err,nodes)=>{
		next(nodes)
	})
}

//Get All rels with a certain Object
function getAllRels(preItem,next){
	getNode(preItem,(i)=>{
		db.relationships(i,'all','',(err,rels)=>{
			next(rels)
		})
	})
}

//Gets an Object by name
function getNode(preItem,next){
	db.find(preItem,(err,i)=>{
		next(i)
	})
}

function getRel(preItem1,preItem2,next){
	getNode(preItem1,(i1)=>{
		getAllRels(preItem2,(err,rels)=>{
			var rel=null;
			if(rels.some((value,index,array)=>{
				if(value.start==i1.id||value.end==i1.id){
					rel = value
					return true;
				}else{
					return false;
				}
			})){
				next(rel)
			}
		})
	})
	return false;
}

function deleteRel(preItem1,preItem2,next){
	getRel(preItem1,preItem2,(rel)=>{
		if(rel){
			db.delete(rel,(err)=>{
				next(true)
			})
		} else {
			next(false)
		}
	})
}

module.exports={
	saveNode, saveRel,
	getAllRels, getNode,
	getNodeByLabel, getRel,
	deleteRel
}