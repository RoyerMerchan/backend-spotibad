const express = require('express');
const router = express.Router();
const tokenM = require('../middlewares/tokenM')
const playlistC = require('../controllers/replist/PLcontroller')

/*
openapi: 3.0.0
info:
  title: API de Creación de Playlists
  version: 1.0.0
paths:
  /ap/pl/Createplaylist:
    post:
      summary: Crear una nueva playlist
      tags:
        - Playlists
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                Name
                songs "esto lo busca en bdd"
                image
                Ejemplo: title, userId, etc.
      responses:
        '201':
          description: Playlist creada exitosamente
          content:
            application/json:
              example:
                msg: "Playlist creada"
        '404':
          description: No se encontró la playlist
          content:
            application/json:
              example:
                msg: "No encontrada"
        '500':
          description: Error del servidor
          content:
            application/json:
              example:
                error: "Error al crear la playlist"
*/
router.post('/Createplaylist', tokenM, playlistC.createPl)

/*
openapi: 3.0.0
info:
  title: API de Eliminación de Playlists
  version: 1.0.0
paths:
  /ap/pl/Deleteplaylist/id:
    delete:
      summary: Eliminar una playlist por ID
      tags:
        - Playlists
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
          description: ID de la playlist a eliminar
      responses:
        '200':
          description: Playlist eliminada exitosamente
          content:
            application/json:
              example:
                msg: "Playlist eliminada"
        '404':
          description: No se encontró la playlist
          content:
            application/json:
              example:
                msg: "No encontrada"
        '500':
          description: Error del servidor
          content:
            application/json:
              example:
                error: "Error al eliminar la playlist"

*/
router.delete('/Deleteplaylist/:id', tokenM, playlistC.playDel)

/*
openapi: 3.0.0
info:
  title: API de Edición de Playlists
  version: 1.0.0
paths:
  /playEdit/{id}:
    put:
      summary: Editar una playlist por ID
      tags:
        - Playlists
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
          description: ID de la playlist a editar
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                # Define aquí las propiedades para la edición
                # Ejemplo: title, userId, etc.
      responses:
        '200':
          description: Playlist editada exitosamente
          content:
            application/json:
              example:
                msg: "Playlist editada"
        '404':
          description: No se encontró la playlist
          content:
            application/json:
              example:
                msg: "No encontrada"
        '500':
          description: Error del servidor
          content:
            application/json:
              example:
                error: "Error al editar la playlist"

*/
router.put('/editplaylist/:id', tokenM, playlistC.playEdit)

/*

*/
router.delete('/playlist/:idplylist/song/:idsong', tokenM, playlistC.songRemove)

/*
openapi: 3.0.0
info:
  title: API de Listado de Playlists
  version: 1.0.0
paths:
  /listPl:
    get:
      summary: Obtener una lista de todas las playlists
      tags:
        - Playlists
      responses:
        '200':
          description: Éxito
          content:
            application/json:
              example:
                - _id: 1
                  name: "Playlist 1"
                  songs:
                    - title: "Canción 1"
                      artist: "Artista 1"
                    - title: "Canción 2"
                      artist: "Artista 2"
                - _id: 2
                  name: "Playlist 2"
                  songs:
                    - title: "Canción 3"
                      artist: "Artista 3"
                    - title: "Canción 4"
                      artist: "Artista 4"
        '500':
          description: Error del servidor
          content:
            application/json:
              example:
                error: "Error al listar las playlists"

*/
router.get('/playlists', tokenM, playlistC.listPl)

module.exports = router