const User = require('../models/User.schema')

/**
 * Endpoint for editing a user given its id
 */
module.exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.query.id }, req.body.user)
        if (user) {
            console.log('updated the following user')
            console.log(user)
            res.json({ status: 'ok' })
        } else {
            const error = "user with the id " + req.query.id + " not found"
            module.exports.saveUser = console.log(error)
            res.json({ status: 'error', error })
        }
    } catch (error) {
        console.log('error')
        console.log(error)
        res.json({ status: 'error', error })
    }
}

/**
 * Endpoint for retrieving a user by its id
 */
module.exports.getUser = async (req, res) => {
    try {
        const filter = { _id: req.query.id }
        console.log('finding a user with the following filter')
        console.log(filter)
        const user = await User.findOne(filter)
        if (user) {
            console.log('these is the found user')
            console.log(user)
            res.json({ status: 'ok', user })
        } else {
            const error = 'the user could not be found'
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
* Endpoint for deleting a user given its id
*/
module.exports.deleteUser = async (req, res) => {
   try {
       const user = await User.findOneAndDelete({ _id: req.query.id })
       if (user) {
           console.log('deleted the following user')
           console.log(user)
           res.json({ status: 'ok' })
       } else {
           const error = "user with the id " + req.query.id + " not found"
           console.log(error)
           res.json({ status: 'error', error })
       }
   } catch (error) {
       console.log('error')
       console.log(error)
       res.json({ status: 'error', error })
   }
}