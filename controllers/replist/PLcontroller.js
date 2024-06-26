const Playlist = require('../../models/playlistmodel')
const Song = require('../models/songmodel')

exports.createPl = async (req,res) =>{
try {
    const nPlay = new Playlist({...req.body, userId: req.user._id})
    await nPlay.save()
    const ppPlay = await group.findById(nPlay._id).populate({
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

    // exports.playEdit = async (req,res) =>{
    //     try {
    //         const {id} = req.params
    //         const edit = await Playlist.findOneAndUpdate({
    //             _id: id,
    //             userId: req.user._id},
    //             req.body,
    //             {new: true 
    //             }).populate({
    //                 path: 'Songs',
    //                 model:'contactmodel',
    //                 select: 'name lastname'
    //             })
        
    //             if(!edit) {
    //     return res.status(404).json({
    //         msg:'not found'
    //     })
    //     res.json(edit)
    //             }
    //     } catch (error) {
    //         console.error(error)   
    //     }
    //     }
    
    exports.groupRC = async (req,res) =>{
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
