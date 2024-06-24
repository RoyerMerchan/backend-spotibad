const express = require('express')
const authRoutes = require('./routes/authroute');
const MyToken = require('./controllers/tokencontroller')
const mongoose = require('./db')



const app = express();
MyToken()
app.use(express.json())

app.use('/ap/auth', authRoutes);


app.listen(3000, ()=>{
    console.log('servidor iniciado')
    
    })
    
    module.exports = app;