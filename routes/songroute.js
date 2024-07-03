const express = require("express");
const router = express.Router();
const songcontroller = require("../controllers/songcontroller");
const tokenM = require("../middlewares/tokenM");
const { swaggerDocs } = require('../swaggercontroller');

  /** POST Methods */
    /**
     * @openapi
     * '/ap/song/':
     *  post:
     *    tags:
     *      -Song Controller
     *    summary: searching song
     *    parameters:
     *      - name: name
     *       in: query
     *       required: true
     *       type: string
     *       description: Song name
     *       - name: artist
     *        in: query
    *        required: true
     *        type: string
     *        description: Artist name
     *    responses:
     *      200:
     *        description: Song found or created and save
     *        content:
     *          application/json:
     *            schema:
     *              oneOf:
     *             - type: object
     *                properties:
     *                  _id:
     *                    type: string
     *                  title:
     *                    type: string
     *                  artist:
     *                    type: string
     *                  Album:
     *                    type: string
     *                  gender:
     *                    type: array
     *                  long:
     *                    type: integer
     *                  spotifyCode:
     *                    type: string
     *                 - type: object
     *                properties:
     *                 _id:
     *                   type: string
     *                 name:
     *                   type: string
     *                 joinDate
     *                   type: string
     *                 image:
     *                   type: string
     *      400:
     *        description: bad request
     *        content:
     *          application/json:
     *             example:
     *               error: "not parameters"
     *      500:
     *        description: Server Error
     *        content:
     *          application/json:
     *            example:
     *              error: Error to search
     */
router.post("/searchSong", tokenM, songcontroller.songCheck);
/*openapi: 3.0.0
info:
  title: Mi API de Búsqueda de Artistas
  version: 1.0.0
paths:
  /api/song/searchartist:
    post:
      summary: Buscar artistas por nombre
      tags:
        - Artistas
      parameters:
        - name: artist
          in: query
          required: true
          schema:
            type: string
          description: Nombre del artista a buscar
      responses:
        '200':
          description: Éxito
          content:
            application/json:
              example:
                _id: 123
                name: "Nombre del artista"
                joinDate: "2023-05-11T18:00:00Z"
                image: "https://example.com/imagen-del-artista.jpg"
        '400':
          description: Solicitud incorrecta
          content:
            application/json:
              example:
                error: "Parámetros incorrectos"
        '500':
          description: Error del servidor
          content:
            application/json:
              example:
                error: "Error al buscar"
*/

router.post("/searchartist", tokenM, songcontroller.searchByart);

module.exports = router;
