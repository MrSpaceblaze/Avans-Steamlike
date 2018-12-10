let routes = require("express").Router();
let achievement = require("../controller/achievement.controller");

routes.post("*", achievement.createNew);

routes.get("*", achievement.getAll);

module.exports = routes;
