const User = require('../models/User.schema')
const jwt = require('jsonwebtoken')

/**
 * Controller for performing the login
 * When successful returns the jwt with the info of the user
 */
module.exports.login = async (req, res) => {
    try {
        console.log('recieved login request')
        const { username, password } = req.body;
        console.log('extracted username and password from the request body')
        if (!username || !password) {
            const error = "Authentication header not present in the request"
            console.log(error)
            res.status(401).json({ status: 'error', error })
        } else {
            
            const filter = { username, password }
            console.log('finding a user with the following filter')
            console.log(filter)
            const user = await User.findOne(filter)
            if (user) {
                console.log('this is the found user')
                console.log(user)
                const token = jwt.sign({ username, password }, process.env.JWT_SECRET)
                res.json({ status: 'ok', token })
            } else {
                const error = 'the user could not be found'
                console.log('error: ' + error)
                res.status(401).json({ status: 'error', error })
            }
        }
    } catch (error) {
        console.log('error')
        console.log(error)
        res.status(500).json({ status: 'error', error })
    }
}