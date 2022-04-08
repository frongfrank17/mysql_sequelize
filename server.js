

const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const server = require('http').createServer(app)
const logger = require('morgan')
const { authorise } = require('./untils')
const cors = require('cors')
const config = require('./config') 

const corsMiddleware = ({
    origins: ['*'],
    allowHeaders: ['Content-Type','Content-Length','Authorization'],
})
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded( { extended:true }))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded( {extended:true} ))


app.use(cors(corsMiddleware))

server.listen(config.serverSettings.port, () => {

    console.log(`---${config.name} Service ---`)
    console.log(`Connecting to ${config.name} repository...`)

    const db = require('./models/sequelize.configs')

    db.sequelize.sync({}).then((connect)=>{
        console.log('Connected. Starting Server')
        app.use(require('./routes'))
        console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
    }  ).catch(err => {
        console.log("---Error---")
        console.log(err)
    } )

})

process.on('SIGINT', () => {
    process.exit(0)
})

// Graceful shutdown
process.on('SIGTERM', () => {

    console.log(`Closing ${config.name} Service.`)
    server.close((err) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log('Server closed.')

        mongoose.connection.close(false, () => {
            console.log('MongoDb connection closed.')
            process.exit(0)
        })
    })
})