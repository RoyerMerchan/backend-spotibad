const songmodel = require('../../models/songmodel')
const Artist = require('../../models/artistmodel')
const User = require('../../models/authmodel')
const multer = require('../replist/multercontroller')
const admin = require('../../firebasec')




exports.NewSong = async (req,res) =>{

try{
const user = req.params.userId
const autor = await User.findById(user)
if(user.autor == true){
    const bucket = admin.storage().bucket();


    const {title, artist} = req.body;
    const spotifyCode = req.file["song"][0].path;
    const image = req.file["image"][0].path

    await bucket.upload(songFile.buffer, { destination: 'songs/' + spotifyCodeoriginalname });
    await bucket.upload(imageFile.buffer, { destination: 'images/' + image.originalname });

res.json({
    msg: 'canciones subidas'
})

const newS = new songmodel({title, artist, spotifyCode, image})
const saveS = await newS.save()
res.json(saveS)


const nameArtist = saveS.artist
const artistB = await Artist.findOne({nameArtist})

if(!artistB){
    const nArt = new Artist({
        name: saveS.artist,
        joinDate: Date.now(),
        image: image
    })
    const saveA = await nArt.save()
    res.json({msg: "new artist", saveA})
}}else{
    res.json({
        msg: 'cant submit a song'
    })
}


}catch(error){
res.status(500).json({
    msg:"error al subir cancion"
})
}

}