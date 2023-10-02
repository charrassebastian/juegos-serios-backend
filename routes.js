const {saveGame, getGame, updateGame, deleteGame} = require ('./controllers/Game.controller')
const {getGames} = require('./controllers/Searching.controller')
const express = require('express')
const router = express.Router()

/**
 * Game.controller routes
 */
router.post('/api/game', saveGame)
router.get('/api/game', getGame)
router.put('/api/game', updateGame)
router.delete('/api/game', deleteGame)

/**
 * Searching.controller routes
 */
router.get('/api/games', getGames)

module.exports.router = router