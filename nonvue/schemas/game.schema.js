var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Achievement = require("./achievement.schema.js").AchievementSchema;

var GameSchema = new Schema({
    photo: {
      required: false,
      type: String,
    },

    developer: {
      ref: "developer",
      required: true,
      type: ObjectId,
    },

    gameName: {
      required: true,
      type: String,
    },

    price: {
      required: true,
      type: Number,
    },

    description: {
      required: true,
      type: String,
    },

    achievements: [Achievement],

    active: {
      default: true,
      type: Boolean,
    },
});

var Game = mongoose.model("game", GameSchema);

module.exports = {
  Game,
  GameSchema,
};
