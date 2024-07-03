const express = require("express");
const router = express.Router();
const songcontroller = require("../controllers/songcontroller");
const tokenM = require("../middlewares/tokenM");
const { swaggerDocs } = require('../swaggercontroller');


router.post("/searchSong", tokenM, songcontroller.songCheck);



router.post("/searchartist", tokenM, songcontroller.searchByart);

module.exports = router;
