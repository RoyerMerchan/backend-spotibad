const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
name:{type: String,  require: true},
joinDate:{type: Date, require: true},
image:{type: String, require: true}
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist