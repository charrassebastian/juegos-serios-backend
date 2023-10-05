const mongoose = require('mongoose')
const { Schema } = mongoose

const Scope = new Schema({
    "market": [String],
    "public": [String]
})

const Game = new Schema({
    "name": { type: String, require: true, unique: true },
    "area": [String],
    "purpose": [String],
    "scope": Scope,
    "hasGoal": Boolean,
    "description": { type: String, require: true },
    "link": { type: String },
    "contentValidation": { type: String },
    "observationsAndSuggestions": { type: String },
    "score": { type: Number },
    "imageLink": { type: String },
    "others": { type: String }
})

module.exports = mongoose.model('Game', Game)
