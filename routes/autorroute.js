const express = require('express');
const router = express.Router();
const multer = require('../controllers/replist/multercontroller')
const NewSong = require('../controllers/replist/AutorController')

const upload = multer({ storage });

router.post('upload', upload.fields([
{name: 'song', maxCount: 1},
{name: 'image', maxCount: 1}
]),NewSong)

module.exports = router