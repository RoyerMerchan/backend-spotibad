const mongoose =  require('mongoose')
// import { model, Schema } from 'mongoose'
const stringC = 'mongodb+srv://merser:Alejo.17@mersercluster.7ocoypf.mongodb.net/appContacts?retryWrites=true&w=majority&appName=MerSerCluster' 
// conexion

mongoose.connect(stringC)
.then (() =>{
    console.log("connected data")
}).catch(err =>{
console.error('error to connect database',err)

})

module.exports = mongoose

