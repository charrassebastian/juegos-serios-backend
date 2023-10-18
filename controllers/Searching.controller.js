const Game = require('../models/Game.schema')

/**
 * Controller for retrieving the saved games
 */
module.exports.getGames = async (req, res) => {
    try {
        const games = await Game.find()
        if (games) {
            console.log('these are the saved games')
            console.log(games)
            console.log('saved')
            let filteredGames = null
            // filter and order the games
            if (req.query.value) {
                filteredGames = []
                const value = req.query.value ?? ""
                const regexArg = req.query.value ? ".*" + value + ".*" : ".*"
                const regex = new RegExp(regexArg, "i") // this is not very flexible
                console.log('regex')
                console.log(regex)
                games.forEach(game => {
                    if (game.name.match(regex)) {
                        filteredGames.push({ game, priority: 1 })
                    } else if (game.area.some(area => area.match(regex))) {
                        filteredGames.push({ game, priority: 2 })
                    } else if (game.description.match(regex)) {
                        filteredGames.push({ game, priority: 3 })
                    } else if (game.others.match(regex)) {
                        filteredGames.push({ game, priority: 4 })
                    }
                })
                console.log('filtered games')
                console.log(filteredGames)
                const orderedGames = []
                for (let i = 1; i <= 4; i++){
                    console.log('adding games with this priority: ' + i)
                    filteredGames
                        .filter(filteredGame => filteredGame.priority === i)
                        .map(filteredGame => filteredGame.game)
                        .forEach(game => orderedGames.push(game))
                }
                res.json({ status: 'ok', games: orderedGames })
            } else {
                res.json({ status: 'ok', games })
            }
        } else {
            const error = 'the games could not be retrieved'
            console.log('error: ' + error)
            res.json({ status: 'error', error })
        }
    } catch (error) {
        console.log('error')
        console.log(error)
        res.json({ status: 'error', error })
    }
}