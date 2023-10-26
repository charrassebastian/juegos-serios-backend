const User = require('../models/User.schema')
const jwt = require('jsonwebtoken')

/**
 * Controller for performing the login
 * When successful returns the jwt with the info of the user
 */
module.exports.login = async (req, res) => {
    try {
        console.log('solicitud de inicio de sesión recibida')
        const { username, password } = req.body;
        console.log('nombre de usuario y contraseña extraídos del cuerpo de la solicitud')
        if (!username || !password) {
            const error = "El nombre de usuario o la contraseña no estaban presentes en la solicitud."
            console.log(error)
            res.status(401).json({ status: 'error', error })
        } else {
            
            const filter = { username, password }
            console.log('buscando un usuario con el siguiente filtro')
            console.log(filter)
            const user = await User.findOne(filter)
            if (user) {
                console.log('este fue el usuario encontrado')
                console.log(user)
                const token = jwt.sign({ username, password }, process.env.JWT_SECRET)
                res.json({ status: 'ok', token })
            } else {
                const error = 'El usuario no pudo ser encontrado'
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