var mongoose = require('mongoose');
var Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

let UserSchema = new Schema({
  // Username of a user, unique key
  username: {
      type: String,
      required: true,
      unique: true,
  },
  // Password of the user
  password: {
      type: String,
      required: true,
  },
  // Id's of the games that the user owns
  library: {
    type: [ObjectId],
    ref: 'game',
    required: false,
    default:[{}],
  },
});

let User = model('user', UserSchema);

module.exports = User;
