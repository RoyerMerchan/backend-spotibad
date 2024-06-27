const express = require('express')
const authRoutes = require('./routes/authroute');
const MyToken = require('./controllers/tokencontroller')
const mongoose = require('./db')
const autorrouter = require('./routes/autorroute')
const plrouter = require('./routes/playlistroute')
const songrouter = require('./routes/songroute')

const app = express();
// MyToken()
app.use(express.json())

app.use('/ap/auth', authRoutes);
app.use('/ap/autor', autorrouter);
app.use('/ap/pl', plrouter);
app.use('/ap/song', songrouter);


app.listen(3000, ()=>{
    console.log('servidor iniciado')
    
    })
    
    module.exports = app;