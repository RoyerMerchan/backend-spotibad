const Song = require('../models/songmodel')
const Artist = require('../models/artistmodel')
const MyToken = require('../controllers/tokencontroller')
const axios = require('axios')
tokenS = MyToken()

exports.songCheck = async (req,res) =>{
    const NameSong = req.query.name
    const NameArtist = req.query.artist
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
                const spotifyD = searchS.data.tracks.items[0]

                const Nsong = new Song({
                    artist: spotifyD.artists[0].name,
                    title: spotifyD.name,
                    Album: spotifyD.album.name,
                    gender: spotifyD.genres,
                    long: spotifyD.duration_ms,
                    spotifyCode: spotifyD.external_urls.spotify,
                    image: spotifyD.images
                })
                await Nsong.save()
                res.json(spotifyD)

                const artistas = spotifyD.artists.map((artista)=>artista.name)

                artistas.forEach(async (nombreArtista) => {
                    const artistMdb = await Artist.findOne({nombreArtista})
                        if(!artistMdb){
                    
                    const nArt = new Artist({
                        name: nombreArtista,
                        joinDate: Date.now(),
                        image: artistas.images
                    })
                    await nArt.save()
                    res.json(nArt)
        }})
                }}catch(error){
res.status(500).json({
    msg:"error al buscar cancion o anadir artista"
})
    }}


exports.searchByart = async (req,res) =>{
    const NameArtist = req.query.artist
    try{
        const artistInDB = await Artist.findOne({name: NameArtist})
        if(artistInDB){
            res.json(artistInDB)
        }else{
            const searchArt = await axios.get('https://api.spotify.com/v1/search',
                {
                    params: {
                        q: nombreArtista,
                        type: 'Artist',
                    },
                    headers:{
                        Authorizatiom: `Bearer ${tokenS}`,
                    }
                });

                if(searchArt.ok){
                    const searchA = await searchArt.json()
                    const artistF = searchA.artists.items
                    for(const artist of artistF){
                        res.json(artist.name)


                    const Nartist = new Artist({
                        name: artist,
                        joinDate: Date.now(),
                        image: artist.images
                    })
                    Nartist.save()
                    return res.json(Nartist)
                }
                }else{
                    return res.json({msg: "error aqui"})
                }



        }


    }catch(error){

        res.status(200).json({
            msg: 'error to search' 
        })

}
}