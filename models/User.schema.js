const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema({
    "user": { type: String, require: true, unique: true },
    "password": { type: String, require: true },
    "isAdmin": Boolean
})

module.exports = mongoose.model('User', User)