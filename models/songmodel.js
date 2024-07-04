const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
title: {type: String,  require: true},
artistid: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist',  require: true,}],
artistname:[{type: String}],
Album: {type: String,  require: true},
gender: {type: String, require: true},
long: {type: Number,  require: true},
spotifyCode: {type: String, require: true},
image: {type: String, require: true}
})

const Song  = mongoose.model('Song', songSchema)

module.exports = Song