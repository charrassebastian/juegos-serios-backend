const Game = require('../models/Game.schema')

/**
 * Endpoint for adding a game to the database
 */
module.exports.saveGame = async (req, res) => {
    try {
        const game = new Game(req.body.game)
        console.log('saving the following game')
        console.log(req.body.game)
        const savedGame = await game.save()
        if (savedGame) {
            console.log('saved')
            res.json({ status: 'ok' })
        } else {
            const error = 'the game could not be saved'
            console.log('error: ' + error)
            res.json({ status: 'error', error })
        }
    } catch (error) {
        console.log('error')
        console.log(error)
        res.json({ status: 'error', error })
    }
}

/**
 * Endpoint for editing a game given its id
 */
module.exports.updateGame = async (req, res) => {
    try {
        const game = await Game.findOneAndUpdate({ _id: req.query.id }, req.body.game)
        if (game) {
            console.log('updated the following game')
            console.log(game)
            res.json({ status: 'ok' })
        } else {
            const error = "game with the id " + req.query.id + " not found"
            module.exports.saveGame =       console.log(error)
            res.json({ status: 'error', error })
        }
    } catch (error) {
        console.log('error')
        console.log(error)
        res.json({ status: 'error', error })
    }
}

/**
 * Endpoint for retrieving a game by its ID
 */
module.exports.getGame = async (req, res) => {
    try {
        const filter = { _id: req.query.id }
        console.log('finding a game with the following filter')
        console.log(filter)
        const game = await Game.findOne(filter)
        if (game) {
            console.log('these is the found game')
            console.log(game)
            res.json({ status: 'ok', game })
        } else {
            const error = 'the game could not be found'
            console.log('error: ' + error)
            res.json({ status: 'error', error })
        }
    } catch (error) {
        console.log('error')
        console.log(error)
        res.json({ status: 'error', error })
    }
}

/**
* Endpoint for deleting a game given its id
*/
module.exports.deleteGame = async (req, res) => {
   try {
       const game = await Game.findOneAndDelete({ _id: req.query.id })
       if (game) {
           console.log('deleted the following game')
           console.log(game)
           res.json({ status: 'ok' })
       } else {
           const error = "game with the id " + req.query.id + " not found"
           console.log(error)
           res.json({ status: 'error', error })
       }
   } catch (error) {
       console.log('error')
       console.log(error)
       res.json({ status: 'error', error })
   }
}