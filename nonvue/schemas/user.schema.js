var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let UserSchema = new Schema({
  // Id's of the games that the user owns
  library: {
    ref: "game",
    required: false,
    type: [ObjectId],
  },
  // Password of the user
  password: {
      required: true,
      type: String,
  },
  // Username of a user, unique key
  username: {
      required: true,
      type: String,
      unique: true,
  },
});

let User = mongoose.model("user", UserSchema);

module.exports = User;
