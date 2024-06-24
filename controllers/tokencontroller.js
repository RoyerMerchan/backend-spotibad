const Token = require('../models/tokenmodel')
const getTokenAPi = require('./replist/spotifycontroller')

// Función para guardar o actualizar el token en la base de datos
const MyToken = async () => {
    try {

      // Busca si ya existe un token en la base de datos
      const existingToken = await Token.findOne();
console.log('token disponible', existingToken)
if(existingToken){
    const oldToken = existingToken.token
if(Date.now()-existingToken.timeTouse > 350000){
    console.log(oldToken, "este token es a replazo")
    const newToken = await getTokenAPi()
  const filter = { token: oldToken}
  const remplace = {token: newToken, timeTouse: Date.now()}
  const options = {new: true}
  const existingToken = await Token.findOneAndReplace(filter, remplace, options)

  console.log('Estamos aqui 2')

  console.log("este es el token nuevo", existingToken.token)
  return existingToken.token
}

console.log("el token no ha expirado", existingToken.token)
  return existingToken.token
}

      if(!existingToken){
          const token = await getTokenAPi()
          const timeTouse= Date.now()
          const ntoken = new Token({token, timeTouse})
          const existingToken = await ntoken.save()

        console.log(existingToken)
        console.log(timeTouse)

        console.log("este token es nuevo", existingToken.token)
        return existingToken.token
    }


    } catch (error) {
        console.error("Error al guardar o actualizar el token:", error.message);
    }
  };
  

module.exports = MyToken