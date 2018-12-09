let routes = require('express').Router()
let game = require('../controller/game.controller')
let achievement = require('../controller/achievement.controller')

routes.get('/:gid', game.getByID)

routes.delete('/:gid', game.deactivate)

routes.put('/:gid', game.updateById)

routes.use('/:gid/achievement', achievement)

routes.post(':gid/rating',game.addRating)

routes.get('/:git/rating',game.getRating)

routes.post('*', game.createNew)

routes.get('*',game.getAll)

module.exports = routes