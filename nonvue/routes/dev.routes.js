let routes = require('express').Router()
let Developer = require('../controller/dev.controller')

routes.get('*', Developer.getAll)

routes.post('/register',Developer.register)

routes.post('/login',Developer.login)

module.exports = routes