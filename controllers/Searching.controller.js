const Game = require('../models/Game.schema')

/**
 * Controller for retrieving the saved games
 */
module.exports.getGames = async (req, res) => {
    try {
        const games = await Game.find()
        if (games) {
            let filteredGames = null
            // filter and order the games
            filteredGames = []
            if (req.query.value) {
                const value = req.query.value ?? ""
                const regexArg = req.query.value ? ".*" + value + ".*" : ".*"
                const regex = new RegExp(regexArg, "i")
                games.forEach(game => {
                    if (game.name.match(regex)) {
                        filteredGames.push({ game, priority: 1 })
                    } else if (game.description.match(regex)) {
                        filteredGames.push({ game, priority: 2 })
                    } else if (game.observationsAndSuggestions.match(regex)) {
                        filteredGames.push({ game, priority: 3 })
                    } else if (game.others.match(regex)) {
                        filteredGames.push({ game, priority: 4 })
                    }
                })
            } else {
                filteredGames = games.map(game => ({ game, priority: 1 }))
            }
            console.log('req.query')
            console.log(req.query)
            if(req.query.onlyValidatedContent === 'true'){
                filteredGames = filteredGames.filter(e => e.game.contentValidation)
            }
            if(req.query.area?.length){
                filteredGames = filteredGames.filter(e => e.game.area.includes(req.query.area))
            }
            if(req.query.purpose?.length){
                filteredGames = filteredGames.filter(e => e.game.purpose.includes(req.query.purpose))
            }
            if(req.query.market?.length){
                filteredGames = filteredGames.filter(e => e.game.scope.market.includes(req.query.market))
            }
            if(req.query.public?.length){
                filteredGames = filteredGames.filter(e => e.game.scope.public.includes(req.query.public))
            }
            const orderedGames = []
            for (let i = 1; i <= 4; i++){
                filteredGames
                    .filter(filteredGame => filteredGame.priority === i)
                    .map(filteredGame => filteredGame.game)
                    .forEach(game => orderedGames.push(game))
            }
            res.json({ status: 'ok', games: orderedGames })
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
