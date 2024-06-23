const Token = require('../models/tokenmodel')
const getTokenAPi = require('./replist/spotifycontroller')

// Función para guardar o actualizar el token en la base de datos
const saveOrUpdateToken = async () => {
    try {

      // Busca si ya existe un token en la base de datos
      const existingToken = await Token.findOne();
console.log('ya bsuque el token', existingToken)
        if(existingToken){
            return existingToken
        }
      if(!existingToken){
          const token = await getTokenAPi()
          const timeTouse= Date.now()
          const ntoken = new Token({token, timeTouse})
          const existingToken = await ntoken.save()

        console.log(existingToken)
        console.log('Estamos aqui 1')
        console.log(timeTouse)
    } 
      
      if(Date.now()-existingToken.timeTouse > 350000){
        const token = await getTokenAPi()
        const timeTouse= Date.now()
        const existingToken = await Token.findOneAndReplace({token, timeTouse})
        
        console.log(existingToken)
        console.log('Estamos aqui 2')
     
      }
      console.log("erroerroreroroeore", existingToken.timeTouse)
      console.log('necesito esto', existingToken.token)
    return existingToken.token
    } catch (error) {
        console.error("Error al guardar o actualizar el token:", error.message);
    }
  };
  

module.exports = saveOrUpdateToken