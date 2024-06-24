const songmodel = require('../../models/songmodel')

exports.NewSong = async (req,res,next) =>{

try{
const artist = req.body.user
const {title, album, gender, long} = req.body;
const newS = new songmodel({title, artist, album, gender, long})
const saveS = await newS.save()

}catch(error){
res.status(500).json({
    msg:"error al subir cancion"
})
}

}