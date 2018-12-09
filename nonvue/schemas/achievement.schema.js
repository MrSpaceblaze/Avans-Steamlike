var mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

var AchievementSchema = new Schema({
  pic:{
    type:Blob,
    required:true,
  },
  name:{
    type: String,
    required: true,
  },
  desc:{
    type: String,
    required: true,
  },
  game: {
    type: ObjectId,
    ref:'game',
    required: true,
  },
});

const Achievement = mongoose.model('achievement', AchievementSchema);

module.exports = {
 Achievement,
 AchievementSchema
};
