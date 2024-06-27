const express = require('express');
const router = express.Router();
const tokenM = require('../middlewares/tokenM')
const playlistC = require('../controllers/replist/PLcontroller')


router.post('/Createplaylist', tokenM, playlistC.createPl)
router.delete('/Deleteplaylist/:id', tokenM, playlistC.playDel)
router.put('/editplaylist/:id', tokenM, playlistC.playEdit)
router.delete('/playlist/:idplylist/song/:idsong', tokenM, playlistC.songRemove)
router.get('/playlists', tokenM, playlistC.listPl)

module.exports = router