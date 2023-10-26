const Game = require('../models/Game.schema')
const User = require('../models/User.schema')
const jwt = require('jsonwebtoken')

/**
 * Controller for adding a game to the database
 */
module.exports.saveGame = async (req, res) => {
    try {        
        if (!req.headers?.authentication) {
            const error = "Encabezado de autenticación no presente en la solicitud"
            console.log(error)
            res.status(401).json({ status: 'error', error })
        } else {
            const { username, password } = await jwt.verify(req.headers.authentication, process.env.JWT_SECRET)
            const filter = { username, password }
            const user = User.findOne(filter)
            console.log('Usuario encontrado')
            console.log(user)
            if (!user) {
                const error = "Usuario no encontrado"
                console.log(error)
                res.status(401).json({ status: 'error', error })
            } else {
                const game = new Game(req.body.game)
                console.log('guardando el juego')
                console.log(req.body.game)
                const savedGame = await game.save()
                if (savedGame) {
                    console.log('guardado')
                    res.json({ status: 'ok' })
                } else {
                    const error = 'el juego no se pudo guardar'
                    console.log('error: ' + error)
                    res.status(500).json({ status: 'error', error })
                }
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
        if (!req.headers?.authentication) {
            const error = "Encabezado de autenticación no presente en la solicitud"
            console.log(error)
            res.status(401).json({ status: 'error', error })
        } else {
            const { username, password } = await jwt.verify(req.headers.authentication, process.env.JWT_SECRET)
            const filter = { username, password }
            const user = User.findOne(filter)
            console.log('Usuario encontrado')
            console.log(user)
            if (!user) {
                const error = "Usuario no encontrado"
                console.log(error)
                res.status(401).json({ status: 'error', error })
            } else {
                const game = await Game.findOneAndUpdate({ _id: req.query.id }, req.body.game)
                if (game) {
                    console.log('actualizado el juego')
                    console.log(game)
                    res.json({ status: 'ok' })
                } else {
                    const error = "juego con id " + req.query.id + " no encontrado"
                    module.exports.saveGame = console.log(error)
                    res.status(500).json({ status: 'error', error })
                }
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
        console.log('encontrando un juego con el siguiente filtro')
        console.log(filter)
        const game = await Game.findOne(filter)
        if (game) {
            console.log('estos son los juegos encontrados')
            console.log(game)
            res.json({ status: 'ok', game })
        } else {
            const error = 'el juego no pudo ser encontrado'
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
        if (!req.headers?.authentication) {
            const error = "Encabezado de autenticación no presente en la solicitud"
            console.log(error)
            res.status(401).json({ status: 'error', error })
        } else {
            const { username, password } = await jwt.verify(req.headers.authentication, process.env.JWT_SECRET)
            const filter = { username, password }
            const user = User.findOne(filter)
            console.log('usuario encontrado')
            console.log(user)
            if (!user) {
                const error = "usuario no encontrado"
                console.log(error)
                res.status(401).json({ status: 'error', error })
            } else {
                const game = await Game.findOneAndDelete({ _id: req.query.id })
                if (game) {
                    console.log('eliminado el juego')
                    console.log(game)
                    res.json({ status: 'ok' })
                } else {
                    const error = "juego con id " + req.query.id + " no encontrado"
                    console.log(error)
                    res.status(500).json({ status: 'error', error })
                }
            }
        }
    } catch (error) {
        console.log('error')
        console.log(error)
        res.status(500).json({ status: 'error', error })
    }
}