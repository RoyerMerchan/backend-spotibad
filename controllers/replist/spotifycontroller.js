//llamada cancion
//traer id de album
//llamada para ese id de almbum (Este es un endpoint diferente)
//ilaf tal llamada si no tiene genero el album
//traer id artista
//llamda para ese id artista (Este es un endpoint diferente)
require('dotenv').config()

const SpotifyWebApi = require('spotify-web-api-node');


//solicitar token de acceso, nose si hacerlo directo o requerirlo de la cabecera

//TODO: Esto lo mejor es guardarlo en la base de datos, que se guarde y asi guardar el tiempo de expiracion en 1 hora desde que se creo y asi actualizar el token si expiro
//! Aqui se hara ese acceso a la base de datos para actualizar siempre que expire ese token
/* Solo falta ese calculo ya que buscara primero ese valor en la base de datos, 
si no esta hace la llamada y si esta y expiro entonces hace la llamada, si no
ocurre ningun de los casos anteriores entonces simplemente se devuelve el token 
de la base de datos
*/

const urlAuthorization = 'https://accounts.spotify.com/api/token'

const secrets = {
  // client_id: process.env.CLIENT_ID,
  // client_secret: process.env.CLIENT_SECRET,
  client_id: "d3d5a381154a4cc29687da4082477ed5",
  client_secret: "5407f30977644908bec66039c6ac20f9"
  
  };
  
const getTokenAPi = async () => {
  
  const { client_id, client_secret } = secrets;
// console.log(secrets)
  if (!client_id || !client_secret) return false;

  const options = {
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id,
      client_secret,
    }),
  };

  try {
    const response = await fetch(urlAuthorization, options);
    const result = await response.json();

    if (!result) return false;

    return result["access_token"];
  } catch (error) {
    console.log("Hubo un error al obtener token", error.message());
    return false;
  }
};

module.exports = getTokenAPi