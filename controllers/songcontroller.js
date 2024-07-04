const Song = require('../models/songmodel')
const Artist = require('../models/artistmodel')
const MyToken = require('../controllers/tokencontroller')
const axios = require('axios')

exports.songCheck = async (req,res) =>{
    tokenS = await MyToken()
    const NameSong = req.query.name
    // const NameArtist = req.query.artist
    try{
        const SonginMDB = await Song.findOne({title: NameSong})

        if(SonginMDB){
            res.json(SonginMDB)
        }else{
            const searchS = await axios.get('https://api.spotify.com/v1/search',
                {
                    params: {
                        q: NameSong,
                        type: 'track',
                    },
                    headers:{
                        Authorization: `Bearer ${tokenS}`,
                    }
                });
                const spotifyD = searchS.data.tracks.items[0]
    
                const artistas = spotifyD.artists.map((artista)=>artista.name)
                
                console.log(spotifyD.artists)
                const artistPromise = artistas.map(async (nombreArtista) => {
                    let artistMdb = await Artist.findOne({nombreArtista})
                    if(!artistMdb){
                        
                        const nArt = new Artist({
                            name: nombreArtista,
                            joinDate: Date.now(),
                            image: artistas.images
                        })
                        artistMdb = await nArt.save()
                        
                        // res.json(nArt)
                    }
                    return artistMdb
                    })
                    
                    const artistsInMDB = await Promise.all(artistPromise);
                        
                        const Nsong = new Song({
                            artistid: artistsInMDB.map((a) => a._id),
                            artistname: artistsInMDB.map((e) => e.name),
                            title: spotifyD.name,
                            Album: spotifyD.album.name,
                            gender: spotifyD.genres,
                            long: spotifyD.duration_ms,
                            spotifyCode: spotifyD.preview_url,
                            image: spotifyD.images
                        })
                    
                    await Nsong.save()
                    res.json(Nsong)
                }}catch(error){
                    console.log(error)
                    // console.log(tokenS)
res.status(500).json({
    msg:"error al buscar cancion o anadir artistaa"
})
    }}


exports.searchByart = async (req,res) =>{
    const NameArtist = req.query.artist
    tokenS = await MyToken()
    try{
        const artistInDB = await Artist.findOne({name: NameArtist})
        if(artistInDB){
            res.json(artistInDB)
        }else{
            const searchArt = await axios.get('https://api.spotify.com/v1/search',
                {
                    params: {
                        q: NameArtist,
                        type: 'Artist',
                    },
                    headers:{
                        Authorization: `Bearer ${tokenS}`,
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