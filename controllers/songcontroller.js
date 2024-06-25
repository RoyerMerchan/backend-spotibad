const Song = require('../models/songmodel')
const Artist = require('../models/artistmodel')
const MyToken = require('../controllers/tokencontroller')
const axios = require('axios')
tokenS = MyToken()
exports.songCheck = async (req,res) =>{
    const NameSong = req.query.name
    try{
        const SonginMDB = await Song.findOne({title: NameSong})

        if(SonginMDB){
            res.json(SonginMDB)
        }else{
            const searchS = await axios.get('https://api.spotify.com/v1/search',
                {
                    params: {
                        q: nombreCancion,
                        type: 'track',
                    },
                    headers:{
                        Authorizatiom: `Bearer ${tokenS}`,
                    }
                });
                const spotifyD = searchS.data.tracks.item[0]

                const Nsong = new Song({
                    artist: spotifyD.artists[0].name,
                    title: spotifyD.name,
                    Album: spotifyD.album.name,
                    gender: spotifyD.genres,
                    long: spotifyD.duration_ms,
                    spotifyCode: spotifyD.external_urls.spotify,
                })
                await Nsong.save()
                res.json(spotifyD)
        }

    }catch(error){
res.status(500).json({
    msg:"error al buscar cancion"
})
    }
}

exports.GetArtist = async (req,res) =>{ 
    try{
        const searchS = await axios.get('https://api.spotify.com/v1/artist',
            {
                params: {
                    q: nombreCancion,
                    type: 'track',
                },
                headers:{
                    Authorizatiom: `Bearer ${tokenS}`,
                }
            });


    }catch(error){


    }




}
