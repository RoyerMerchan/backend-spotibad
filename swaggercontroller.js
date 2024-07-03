const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const options ={
    definition: {
        openapi: "3.0.0",
        info: {title: "SpotyBAD Api", version : "1.0.0", description: "backend de spotify"}   
    },
    apis: ['./routes/songroute.js','./routes/authroute.js','./routes/autorroute.js','./routes/playlistroute.js']
}

const specs = swaggerJSDoc(options)

const swaggerDocs = (app, port) =>{
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.get('/api/docs.js', (req,res)=>{
res.setHeader('Content-Type', 'application.json')
res.send(specs)
})
console.log(`version are avalaible at http://localhost:${port}/api/docs`)
}

module.exports = {swaggerDocs}