const express = require('express');
const router = express.Router();
const songcontroller = require('../controllers/songcontroller')

router.post('/searchSong', songcontroller.songCheck)
router.post('/searchartist',songcontroller.searchByart)


module.exports = router