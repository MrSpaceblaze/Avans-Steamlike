let routes = require("express").Router();
let user = require("../controller/user.controller");
let auth = require("../controller/auth.controller");

/**
 * Creates a new user
 * @route POST /users/register
 * @group User
 * @param {string} username.required - Username of user
 * @param {string} password.required - Password of user
 */
routes.post("/register", auth.register);

/**
 * Logs a user in
 * @route POST /users/login
 * @group User
 * @param {string} username.required - Username of user
 * @param {string} password.required - Password of user
 */
routes.post("/login", auth.login);

/**
 * Updates a users password
 * @route PUT /users
 * @group User
 * @param {string} username.required - Username of user
 * @param {string} oldPassword.required - Old password of user
 * @param {string} newPassword.required - New password of user
 */
routes.put("*", user.update);

routes.get("/library", user.getLibrary);

routes.post("/library", user.addGame);

routes.delete("/library", user.deleteGame);

module.exports = routes;
