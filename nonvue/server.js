const express = require("express");
const bodyParser = require("body-parser");
var morgan = require("morgan");
const app = express();

// Config
var config = require("./config/config.json");

// Responses
const NotFoundResponse = require("./model/response/notfound.response");
const ApiResponse = require("./model/response/api.response");

// Mongoose
var mongoose = require("mongoose");

mongoose.connect(config.databases.mongo, {
  useNewUrlParser: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Could not connect to " + config.databases.mongo + ": "));

db.once("open", function() {
  console.log("Mongoose: Connected to Mongo Database: " + config.databases.mongo);
});

// Use
app.use(bodyParser.json());
app.use(morgan(":method :url :status :response-time ms - :res[content-length]"));

// Route files
const UserRoutes = require("./routes/user.routes");
const GameRoutes = require("./routes/game.routes");
const DevRoutes = require("./routes/dev.routes");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});

app.options('*',(req,res)=>{
  res.status(200).end()
})
// Routes
app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/users", UserRoutes);
app.use("/api/games", GameRoutes);
app.use("/api/dev", DevRoutes);

// Catch 404's
app.use("*", function(req, res) {
  res.status(404).json(new NotFoundResponse(req.originalUrl)).end();
});

// Listen on port
var server = app.listen(process.env.PORT || config.port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Express: Listening to Socket: http://localhost:" + port);
});

module.exports = {
  app,
};
