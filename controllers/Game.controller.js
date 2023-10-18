const Game = require('../models/Game.schema')

/**
 * Controller for adding a game to the database
 */
module.exports.saveGame = async (req, res) => {
    try {
        const { username, password } = await jwt.verify(req.headers.authentication, process.env.JWT_SECRET)
        const filter = { username, password }
        const user = User.findOne(filter)
        console.log('found user')
        console.log(user)
        if (!user) {
            const error = "User not found"
            console.log(error)
            res.status(401).json({ status: 'error', error })
        } else {
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
                res.status(500).json({ status: 'error', error })
            }
        }
    } catch (error) {
        console.log('error')
        console.log(error)
        res.status(500).json({ status: 'error', error })
    }
}

/**
 * Controller for editing a game given its id
 */
module.exports.updateGame = async (req, res) => {
    try {
        const { username, password } = await jwt.verify(req.headers.authentication, process.env.JWT_SECRET)
        const filter = { username, password }
        const user = User.findOne(filter)
        console.log('found user')
        console.log(user)
        if (!user) {
            const error = "User not found"
            console.log(error)
            res.status(401).json({ status: 'error', error })
        } else {
            const game = await Game.findOneAndUpdate({ _id: req.query.id }, req.body.game)
            if (game) {
                console.log('updated the following game')
                console.log(game)
                res.json({ status: 'ok' })
            } else {
                const error = "game with the id " + req.query.id + " not found"
                module.exports.saveGame = console.log(error)
                res.status(500).json({ status: 'error', error })
            }
        }
    } catch (error) {
        console.log('error')
        console.log(error)
        res.status(500).json({ status: 'error', error })
    }
}

/**
 * Controller for retrieving a game by its ID
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
            res.status(500).json({ status: 'error', error })
        }
    } catch (error) {
        console.log('error')
        console.log(error)
        res.status(500).json({ status: 'error', error })
    }
}

/**
* Controller for deleting a game given its id
*/
module.exports.deleteGame = async (req, res) => {
    try {
        const { username, password } = await jwt.verify(req.headers.authentication, process.env.JWT_SECRET)
        const filter = { username, password }
        const user = User.findOne(filter)
        console.log('found user')
        console.log(user)
        if (!user) {
            const error = "User not found"
            console.log(error)
            res.status(401).json({ status: 'error', error })
        } else {
            const game = await Game.findOneAndDelete({ _id: req.query.id })
            if (game) {
                console.log('deleted the following game')
                console.log(game)
                res.json({ status: 'ok' })
            } else {
                const error = "game with the id " + req.query.id + " not found"
                console.log(error)
                res.status(500).json({ status: 'error', error })
            }
        }
    } catch (error) {
        console.log('error')
        console.log(error)
        res.status(500).json({ status: 'error', error })
    }
}