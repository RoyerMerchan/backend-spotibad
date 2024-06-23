const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
name:{type: String,  require: true},
joinDate:{type: Date, require: true},
})

const Artist = mongose.model('Artist', artistSchema)

module.exports = Artist