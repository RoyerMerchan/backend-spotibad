const express = require('express');
const router = express.Router();
const upload = require('../controllers/replist/multercontroller')
const {NewSong} = require('../controllers/replist/AutorController')
const token = require('../middlewares/tokenM')
// const upload = multer( storage);

router.use(token)

router.post('/upload' , token, upload.fields([
{name: 'song', maxCount: 1},
{name: 'image', maxCount: 1}
]),NewSong)

module.exports = router