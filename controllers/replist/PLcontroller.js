const Playlist = require('../../models/playlistmodel')
const Song = require('../../models/songmodel')
//creacion
exports.createPl = async (req,res) =>{
try {
    const defaultImage = "https://promocionmusical.es/wp-content/uploads/2018/08/album-musical.jpg"
    const nPlay = new Playlist({...req.body, userId: req.user._id, image: req.body.image || defaultImage,})
    await nPlay.save()
    const pPlay = await group.findById(nPlay._id).populate({
        path: 'Songs',
        model: 'songmodel',
        select: 'title artist Album gender long SpotifyCode'
    })

    if(!pPlay){
        return res.status(404).json({
msg:'not found'
        })
    }
    res.status(201).json({
        msg:'play listcreated'
    })
} catch (error) {
    console.error(error)   
}
}
//borrado de playlist

exports.playDel = async (req,res) =>{
    try {
        const {id} = req.params
        const dPlay = await group.findOneAndDelete({_id: id, userId: req.user_id})
    
        if(!dPlay){
            return rs.status(404).json({
    
                msg:'cant eliminated'
            })
        }
        res.json({
    msg:'playlist eliminated'
        })
    } catch (error) {
      console.error(error)  
    }
    }
//edicion
    exports.playEdit = async (req,res) =>{
        try {
            const {id} = req.params
            const edit = await Playlist.findOneAndUpdate({
                _id: id,
                userId: req.user._id},
                req.body,
                {new: true 
                }).populate({
                    path: 'Songs',
                    model:'contactmodel',
                    select: 'name'
                })
        
                if(!edit) {
        return res.status(404).json({
            msg:'not found'
        })
    }
    res.json(edit)
        } catch (error) {
            console.error(error)   
        }
        }
    //borrado de cancion
    exports.songRemove = async (req,res) =>{
        try {
            const {playlistId, songId} = req.params
            const playL = await Playlist.findById(playlistId)
        
            if(!playL){
        return res.status(404).json({
            msg:"playlist not found"
        })
            }
            const oldS = await Song.findById(songId)
        
            if(!oldS){
                res.status(404).json({
                    msg:'song not found'
                })
            }
            const playOld = playL.oldS.some(playlistSongId=>playlistSongId.equals(songId))
             if(!playOld){
                res.status(400).json({
                    msg:'song not exist in pl'
                })
             }
        
             playL.oldS.pull(songId)
             await playL.save()
        
             res.json({msg:'remove song '})
        } catch (error) {
            console.error(error)
            res.json({error: error})
        }
        }   
//listado
        exports.listPl = async (req,res) =>{
            try{
               const play = await Playlist.find({}).populate({
                    path: "songs",
                    model: "Song",
                    select: "title artist spotifyCode"
                }).populate('userId').exec()
                res.json(play)

            }catch(error){

                res.status(500).json({
                    msg: "error al listar las playlist"
                })
            }



        }

        // Endpoint para obtener una playlist por id
exports.getPlById = async (req, res) => {
    try {
      // Busca la playlist por id
      const playlist = await Playlist.findById(req.params.id)
        .populate('songs') // Incluye las canciones asociadas
        .populate('user'); // Incluye el usuario 
  
      // Si no se encuentra la playlist
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist no encontrada' });
      }
  
      // Retorna la playlist con las canciones asociadas
      res.json(playlist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la playlist' });
    }
  };