const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
title: {type: String,  require: true},
artist: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist',  require: true,}],
Album: {type: String,  require: true},
gender: {type: String, require: true},
long: {type: Number,  require: true},
spotifyCode: {type: String, require: true},
})

const Song  = mongoose.model('Song', songSchema)

module.exports = Song