const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) =>{
const token = req.header('Authorization')
if(!token){
return res.status(401).json({
    msg: 'access denied, token not autorized'
})
}
try{
    const decoded= jwt.verify(token, process.env.JWT_PRIVATEKEY)
    req.user = decoded.user

    next()
}catch(error){
    res.status(401).json({
        msg: ' token invalid'
    })
}
}