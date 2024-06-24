const Token = require('../models/tokenmodel')
const getTokenAPi = require('./replist/spotifycontroller')

// Función para guardar o actualizar el token en la base de datos
const MyToken = async () => {
    try {

      // Busca si ya existe un token en la base de datos
      const existingToken = await Token.findOne();
console.log('ya bsuque el token', existingToken)
if(existingToken){
if(Date.now()-existingToken.timeTouse > 350000){
  const token = await getTokenAPi()
  const timeTouse= Date.now()
  const existingToken = await Token.findOneAndReplace({token, timeTouse})
  
  console.log(existingToken)
  console.log('Estamos aqui 2')

  console.log("token nuevo", existingToken.token)
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